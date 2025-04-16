"use client";
import React, { useEffect, useRef, useCallback } from "react";

interface BugProps {
    size?: number;
    legs?: number;
    tail?: number;
    color?: string;
    className?: string;
}

class InputHandler {
    keys: boolean[];
    mouse = {
        left: false,
        right: false,
        middle: false,
        x: 0,
        y: 0,
    };

    constructor() {
        this.keys = Array(230).fill(false);
        this.setupListeners();
    }

    private setupListeners() {
        document.addEventListener(
            "keydown",
            (e) => (this.keys[e.keyCode] = true)
        );
        document.addEventListener(
            "keyup",
            (e) => (this.keys[e.keyCode] = false)
        );
        document.addEventListener("mousedown", this.handleMouseDown);
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("mousemove", this.handleMouseMove);
    }

    private handleMouseDown = (e: MouseEvent) => {
        if (e.button === 0) this.mouse.left = true;
        if (e.button === 1) this.mouse.middle = true;
        if (e.button === 2) this.mouse.right = true;
    };

    private handleMouseUp = (e: MouseEvent) => {
        if (e.button === 0) this.mouse.left = false;
        if (e.button === 1) this.mouse.middle = false;
        if (e.button === 2) this.mouse.right = false;
    };

    private handleMouseMove = (e: MouseEvent) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    };
}

class Segment {
    isSegment = true;
    children: Segment[] = [];
    x: number;
    y: number;
    absAngle: number;
    defAngle: number;

    constructor(
        public parent: Segment | Creature,
        public size: number,
        public relAngle: number,
        public range: number,
        public stiffness: number
    ) {
        this.defAngle = relAngle; // Store default angle
        this.absAngle = parent.absAngle + relAngle;
        this.x = parent.x + Math.cos(this.absAngle) * size;
        this.y = parent.y + Math.sin(this.absAngle) * size;
        if ("children" in parent) parent.children.push(this);
    }

    updateRelative(iter: boolean, flex: boolean) {
        // Normalize relative angle to stay within [-π, π]
        this.relAngle -=
            2 *
            Math.PI *
            Math.floor((this.relAngle - this.defAngle) / (2 * Math.PI) + 0.5);

        if (flex) {
            // Apply stiffness constraint to limit movement from default angle
            this.relAngle = Math.min(
                this.defAngle + this.range / 2,
                Math.max(
                    this.defAngle - this.range / 2,
                    (this.relAngle - this.defAngle) / this.stiffness +
                        this.defAngle
                )
            );
        }

        this.absAngle = this.parent.absAngle + this.relAngle;
        this.x = this.parent.x + Math.cos(this.absAngle) * this.size;
        this.y = this.parent.y + Math.sin(this.absAngle) * this.size;

        if (iter)
            this.children.forEach((child) => child.updateRelative(iter, flex));
    }

    draw(ctx: CanvasRenderingContext2D, iter: boolean) {
        ctx.beginPath();
        ctx.moveTo(this.parent.x, this.parent.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        if (iter) this.children.forEach((child) => child.draw(ctx, true));
    }

    follow(iter: boolean) {
        const dx = this.x - this.parent.x;
        const dy = this.y - this.parent.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        this.x = this.parent.x + (dx / dist) * this.size;
        this.y = this.parent.y + (dy / dist) * this.size;
        this.absAngle = Math.atan2(dy, dx);
        this.relAngle = this.absAngle - this.parent.absAngle;

        this.updateRelative(false, true);
        if (iter) this.children.forEach((child) => child.follow(true));
    }
}

class LimbSystem {
    nodes: Segment[] = [];
    hip: Segment | Creature;

    constructor(
        public end: Segment,
        public length: number,
        public speed: number,
        public creature: Creature
    ) {
        let node: Segment | Creature = end;
        for (let i = 0; i < length; i++) {
            if ("isSegment" in node) {
                this.nodes.unshift(node as Segment);
                node = node.parent;
                if (!("isSegment" in node)) {
                    this.length = i + 1;
                    break;
                }
            } else {
                break;
            }
        }
        this.hip = this.nodes[0]?.parent || creature;
        creature.systems.push(this);
    }

    moveTo(x: number, y: number) {
        this.nodes[0].updateRelative(true, true);

        let currentX = x;
        let currentY = y;
        let len = Math.max(
            0,
            Math.hypot(x - this.end.x, y - this.end.y) - this.speed
        );

        // Inverse kinematics - working backwards from the target
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const node = this.nodes[i];
            const angle = Math.atan2(node.y - currentY, node.x - currentX);
            node.x = currentX + len * Math.cos(angle);
            node.y = currentY + len * Math.sin(angle);
            currentX = node.x;
            currentY = node.y;
            len = node.size;
        }

        // Update all angles based on new positions
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            node.absAngle = Math.atan2(
                node.y - node.parent.y,
                node.x - node.parent.x
            );
            node.relAngle = node.absAngle - node.parent.absAngle;

            // Update children not part of this limb system
            node.children.forEach((child) => {
                if (!this.nodes.includes(child)) {
                    child.updateRelative(true, false);
                }
            });
        }
    }

    update(x?: number, y?: number) {
        if (x !== undefined && y !== undefined) {
            this.moveTo(x, y);
        }
    }
}

class LegSystem extends LimbSystem {
    goalX: number;
    goalY: number;
    step = 0;
    forwardness = 0;
    reach: number;
    swing: number;
    swingOffset: number;

    constructor(
        end: Segment,
        length: number,
        speed: number,
        creature: Creature
    ) {
        super(end, length, speed, creature);
        this.goalX = end.x;
        this.goalY = end.y;

        // Calculate the leg's reach and swing parameters
        this.reach =
            0.9 * Math.hypot(this.end.x - this.hip.x, this.end.y - this.hip.y);

        let relAngle =
            creature.absAngle -
            Math.atan2(this.end.y - this.hip.y, this.end.x - this.hip.x);

        // Normalize angle
        relAngle -= 2 * Math.PI * Math.floor(relAngle / (2 * Math.PI) + 0.5);

        // Calculate swing parameters
        this.swing = -relAngle + ((relAngle < 0 ? 2 : 1) * Math.PI) / 2;
        this.swingOffset = creature.absAngle - this.hip.absAngle;
    }

    update() {
        this.moveTo(this.goalX, this.goalY);

        if (this.step === 0) {
            // Standing still, check if we need to move
            const dist = Math.hypot(
                this.end.x - this.goalX,
                this.end.y - this.goalY
            );

            if (dist > 1) {
                this.step = 1;
                // Calculate new target position
                this.goalX =
                    this.hip.x +
                    this.reach *
                        Math.cos(
                            this.swing + this.hip.absAngle + this.swingOffset
                        ) +
                    ((2 * Math.random() - 1) * this.reach) / 2;

                this.goalY =
                    this.hip.y +
                    this.reach *
                        Math.sin(
                            this.swing + this.hip.absAngle + this.swingOffset
                        ) +
                    ((2 * Math.random() - 1) * this.reach) / 2;
            }
        } else if (this.step === 1) {
            // Moving to target, check if we've completed the step
            const theta =
                Math.atan2(this.end.y - this.hip.y, this.end.x - this.hip.x) -
                this.hip.absAngle;

            const dist = Math.hypot(
                this.end.x - this.hip.x,
                this.end.y - this.hip.y
            );

            const forwardness2 = dist * Math.cos(theta);
            const dF = this.forwardness - forwardness2;
            this.forwardness = forwardness2;

            if (dF * dF < 1) {
                // Step completed, reset to standing
                this.step = 0;
                this.goalX = this.hip.x + (this.end.x - this.hip.x);
                this.goalY = this.hip.y + (this.end.y - this.hip.y);
            }
        }
    }
}

class Creature {
    children: Segment[] = [];
    systems: LimbSystem[] = [];
    speed = 0;

    constructor(
        public x: number,
        public y: number,
        public absAngle: number,
        public fAccel: number,
        public fFric: number,
        public fRes: number,
        public fThresh: number,
        public rAccel: number,
        public rFric: number,
        public rRes: number,
        public rThresh: number
    ) {
        this.fSpeed = 0;
        this.rSpeed = 0;
    }

    fSpeed = 0;
    rSpeed = 0;

    follow(targetX: number, targetY: number) {
        const dist = Math.hypot(this.x - targetX, this.y - targetY);
        const angle = Math.atan2(targetY - this.y, targetX - this.x);

        // Update forward motion
        let accel = this.fAccel;
        if (this.systems.length > 0) {
            // Adjust acceleration based on how many legs are on the ground
            const groundedLegs = this.systems.reduce(
                (sum, system) =>
                    sum +
                    (system instanceof LegSystem && system.step === 0 ? 1 : 0),
                0
            );
            accel *= groundedLegs / this.systems.length;
        }

        this.fSpeed += accel * (dist > this.fThresh ? 1 : 0);
        this.fSpeed *= 1 - this.fRes;
        this.speed = Math.max(0, this.fSpeed - this.fFric);

        // Update rotation
        let dif = this.absAngle - angle;
        dif -= 2 * Math.PI * Math.floor(dif / (2 * Math.PI) + 0.5);

        if (Math.abs(dif) > this.rThresh && dist > this.fThresh) {
            this.rSpeed -= this.rAccel * (dif > 0 ? 1 : -1);
        }

        this.rSpeed *= 1 - this.rRes;

        if (Math.abs(this.rSpeed) > this.rFric) {
            this.rSpeed -= this.rFric * (this.rSpeed > 0 ? 1 : -1);
        } else {
            this.rSpeed = 0;
        }

        // Update position and orientation
        this.absAngle += this.rSpeed;
        this.absAngle -=
            2 * Math.PI * Math.floor(this.absAngle / (2 * Math.PI) + 0.5);

        this.x += this.speed * Math.cos(this.absAngle);
        this.y += this.speed * Math.sin(this.absAngle);

        // For drawing, update angle temporarily
        this.absAngle += Math.PI;

        // Update all child segments
        this.children.forEach((child) => child.follow(true));

        // Update leg systems
        this.systems.forEach((system) => system.update());

        // Restore original angle
        this.absAngle -= Math.PI;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const r = 4;
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            r,
            Math.PI / 4 + this.absAngle,
            (7 * Math.PI) / 4 + this.absAngle
        );
        ctx.moveTo(
            this.x + r * Math.cos((7 * Math.PI) / 4 + this.absAngle),
            this.y + r * Math.sin((7 * Math.PI) / 4 + this.absAngle)
        );
        ctx.lineTo(
            this.x + r * Math.cos(this.absAngle) * Math.SQRT2,
            this.y + r * Math.sin(this.absAngle) * Math.SQRT2
        );
        ctx.lineTo(
            this.x + r * Math.cos(Math.PI / 4 + this.absAngle),
            this.y + r * Math.sin(Math.PI / 4 + this.absAngle)
        );
        ctx.stroke();

        // Draw all child segments
        this.children.forEach((child) => child.draw(ctx, true));
    }
}

const BugAnimation: React.FC<BugProps> = ({
    size = 1,
    legs = 6,
    tail = 16,
    color = "white",
    className = "",
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const input = useRef<InputHandler | null>(null);
    const animationId = useRef<number | null>(null);
    const creatureRef = useRef<Creature | null>(null);

    const setupLizard = useCallback(() => {
        if (!canvasRef.current) return;

        const s = size; // Scale factor

        // Create the main creature
        const critter = new Creature(
            canvasRef.current.width / 2,
            canvasRef.current.height / 2,
            0, // Initial angle
            s * 10, // fAccel
            s * 2, // fFric
            0.5, // fRes
            16, // fThresh
            0.5, // rAccel
            0.085, // rFric
            0.5, // rRes
            0.3 // rThresh
        );

        // Create the spine (central body)
        let spinal: Segment | Creature = critter;

        // Neck segments
        for (let i = 0; i < 6; i++) {
            spinal = new Segment(spinal, s * 4, 0, (Math.PI * 2) / 3, 1.1);

            // Add "ribs" on each side of spine
            for (let side = -1; side <= 1; side += 2) {
                let rib = new Segment(spinal, s * 3, side, 0.1, 2);

                // Extend ribs with smaller segments
                for (let j = 0; j < 3; j++) {
                    rib = new Segment(rib, s * 0.1, -side * 0.1, 0.1, 2);
                }
            }
        }

        // Create legs along the torso
        for (let i = 0; i < legs; i++) {
            if (i > 0) {
                // Add vertebrae between leg pairs
                for (let j = 0; j < 6; j++) {
                    spinal = new Segment(spinal, s * 4, 0, Math.PI / 2, 1.5);

                    // Add ribs to each vertebra
                    for (let side = -1; side <= 1; side += 2) {
                        let rib = new Segment(
                            spinal,
                            s * 3,
                            (side * Math.PI) / 2,
                            0.1,
                            1.5
                        );

                        // Extend ribs
                        for (let k = 0; k < 3; k++) {
                            rib = new Segment(rib, s * 3, -side * 0.3, 0.1, 2);
                        }
                    }
                }
            }

            // Create legs on both sides
            for (let side = -1; side <= 1; side += 2) {
                // Hip joint
                const hip = new Segment(spinal, s * 12, side * 0.785, 0, 8);

                // Upper leg
                const upperLeg = new Segment(
                    hip,
                    s * 16,
                    -side * 0.785,
                    Math.PI * 2,
                    1
                );

                // Lower leg (with joint)
                const lowerLeg = new Segment(
                    upperLeg,
                    s * 16,
                    side * 1.571,
                    Math.PI,
                    2
                );

                // Add "fingers" to the leg
                for (let finger = 0; finger < 4; finger++) {
                    new Segment(
                        lowerLeg,
                        s * 4,
                        (finger / 3 - 0.5) * 1.571,
                        0.1,
                        4
                    );
                }

                // Create a leg system to control the movement
                new LegSystem(lowerLeg, 3, s * 12, critter);
            }
        }

        // Create tail segments
        for (let i = 0; i < tail; i++) {
            spinal = new Segment(spinal, s * 4, 0, (Math.PI * 2) / 3, 1.1);

            // Add "ribs" to tail segments
            for (let side = -1; side <= 1; side += 2) {
                let rib = new Segment(spinal, s * 3, side, 0.1, 2);

                // Scale tail ribs to get thinner towards end
                for (let j = 0; j < 3; j++) {
                    rib = new Segment(
                        rib,
                        (s * 3 * (tail - i)) / tail,
                        -side * 0.1,
                        0.1,
                        2
                    );
                }
            }
        }

        return critter;
    }, [size, legs, tail]);

    const animate = useCallback(() => {
        if (!canvasRef.current || !creatureRef.current || !input.current)
            return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;

        // Follow the mouse cursor
        creatureRef.current.follow(
            input.current.mouse.x,
            input.current.mouse.y
        );

        // Draw the creature
        creatureRef.current.draw(ctx);

        animationId.current = requestAnimationFrame(animate);
    }, [color]);

    useEffect(() => {
        // Initialize input handler
        if (!input.current) {
            input.current = new InputHandler();
        }

        const resize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;

            // Create new creature when size changes
            creatureRef.current = setupLizard() || null;
        };

        resize();
        window.addEventListener("resize", resize);

        // Start animation
        animationId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            if (animationId.current) {
                cancelAnimationFrame(animationId.current);
            }
        };
    }, [setupLizard, animate]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 z-0 pointer-events-none ${className}`}
        />
    );
};

export default BugAnimation;
