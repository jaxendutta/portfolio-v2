"use client";

import { useEffect, useRef } from "react";

interface ParticleAnimationProps {
    className?: string;
}

interface Particle {
    x: number;
    y: number;
    vel: {
        x: number;
        y: number;
        min: number;
        max: number;
    };
    color: string;
    render: () => void;
    update: () => void;
    testBorder: () => void;
    setPosition: (pos: number, coor: "x" | "y") => void;
}

export default function ParticleAnimation({
    className = "",
}: ParticleAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(null);
    const particlesRef = useRef<Particle[]>([]);

    // Settings
    const numberParticlesStart = 1000;
    const particleSpeed = 0.3;
    const velocity = 0.9;
    const circleWidth = 50;
    const particleColor = "rgba(255, 255, 255, 0.05)";

    const getRandomFloat = (min: number, max: number) =>
        Math.random() * (max - min) + min;

    // Particle constructor
    function createParticle(
        x: number,
        y: number,
        context: CanvasRenderingContext2D,
        windowWidth: number,
        windowHeight: number
    ): Particle {
        const particle = {
            x,
            y,
            vel: {
                x: getRandomFloat(-20, 20) / 100,
                y: getRandomFloat(-20, 20) / 100,
                min: getRandomFloat(2, 10),
                max: getRandomFloat(10, 100) / 10,
            },
            color: particleColor,

            render() {
                context.beginPath();
                context.fillStyle = this.color;
                context.arc(this.x, this.y, 1, 0, Math.PI * 2);
                context.fill();
            },

            update() {
                const forceDirection = {
                    x: getRandomFloat(-1, 1),
                    y: getRandomFloat(-1, 1),
                };

                if (Math.abs(this.vel.x + forceDirection.x) < this.vel.max) {
                    this.vel.x += forceDirection.x;
                }

                if (Math.abs(this.vel.y + forceDirection.y) < this.vel.max) {
                    this.vel.y += forceDirection.y;
                }

                this.x += this.vel.x * particleSpeed;
                this.y += this.vel.y * particleSpeed;

                if (Math.abs(this.vel.x) > this.vel.min) {
                    this.vel.x *= velocity;
                }

                if (Math.abs(this.vel.y) > this.vel.min) {
                    this.vel.y *= velocity;
                }

                this.testBorder();
            },

            testBorder() {
                if (this.x > windowWidth) {
                    this.setPosition(this.x, "x");
                } else if (this.x < 0) {
                    this.setPosition(windowWidth, "x");
                }

                if (this.y > windowHeight) {
                    this.setPosition(this.y, "y");
                } else if (this.y < 0) {
                    this.setPosition(windowHeight, "y");
                }
            },

            setPosition(pos: number, coor: "x" | "y") {
                if (coor === "x") {
                    this.x = pos;
                } else if (coor === "y") {
                    this.y = pos;
                }
            },
        };

        return particle;
    }

    // Initialize particles
    const initParticles = (
        context: CanvasRenderingContext2D,
        windowWidth: number,
        windowHeight: number
    ) => {
        const particles: Particle[] = [];

        for (let i = 0; i < numberParticlesStart; i++) {
            const angle = Math.random() * 360;
            particles.push(
                createParticle(
                    windowWidth * 0.5 + Math.cos(angle) * circleWidth,
                    windowHeight * 0.5 - Math.sin(angle) * circleWidth,
                    context,
                    windowWidth,
                    windowHeight
                )
            );
        }

        return particles;
    };

    // Animation loop
    const loop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const particles = particlesRef.current;
        const length = particles.length;

        for (let i = 0; i < length; i++) {
            particles[i].update();
            particles[i].render();
        }

        animationRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Set canvas dimensions
        const updateCanvasSize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            canvas.width = windowWidth;
            canvas.height = windowHeight;

            // Reinitialize particles when window resizes
            particlesRef.current = initParticles(
                context,
                windowWidth,
                windowHeight
            );
        };

        // Initialize
        updateCanvasSize();

        // Handle window resize
        window.addEventListener("resize", updateCanvasSize);

        // Handle click to regenerate particles
        const handleClick = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            context.clearRect(0, 0, windowWidth, windowHeight);
            particlesRef.current = initParticles(
                context,
                windowWidth,
                windowHeight
            );
        };

        window.addEventListener("click", handleClick);

        // Start animation loop
        animationRef.current = requestAnimationFrame(loop);

        // Cleanup
        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            window.removeEventListener("click", handleClick);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="canvas"
            className={`fixed top-0 left-0 w-full h-full z-0 ${className}`}
        />
    );
}
