"use client";

import React from "react";
import { motion } from "framer-motion";

interface SpriteProps {
    className?: string;
    scale?: number;
}

const Sprite: React.FC<SpriteProps> = ({
    className,
    scale = 5, // Font size in px (base size unit)
}) => {
    // Colors
    const colors = {
        purple: "#75699d",
        purpleLight: "#9b8bbe",
        pink: "#ec008c",
        pinkLight: "#712b62",
        pinkDark: "#392031",
        grey: "#414042",
        greyDark: "#231f20",
        greyLightest: "#6d6e71",
        greyLighter: "#58595b",
        tan: "#786258",
        tanLight: "#a29775",
        tanDark: "#554737",
        white: "#d1d3d4",
        whiteLight: "#e6e7e8",
        shadow: "rgba(0, 0, 0, 0.1)",
    };

    return (
        <motion.div
            className={`relative ${className}`}
            style={{
                fontSize: `${scale}px`,
                width: `${scale * 32}px`,
                height: `${scale * 32}px`,
            }}
        >
            <div className="absolute top-1/2 left-1/2">
                <div className="sprite"></div>
                <div className="shadow"></div>
            </div>

            <style jsx>{`
                .sprite {
                    animation: float 1s steps(4) alternate infinite;
                    background: ${colors.pink};
                    position: relative;
                    width: 1em;
                    height: 1em;
                    /* Add all body box-shadows */
                    box-shadow:
            /* line 1 */ -5em 0
                            ${colors.greyDark},
                        -6em 0 ${colors.greyDark}, -7em 0 ${colors.greyDark},
                        -8em 0 ${colors.greyDark}, -11em 0 ${colors.purple},
                        -3em 0 ${colors.greyDark}, -2em 0 ${colors.greyLighter},
                        -1em 0 ${colors.pinkLight}, 1em 0 ${colors.pinkLight},
                        2em 0 ${colors.grey}, 3em 0 ${colors.greyDark},
                        5em 0 ${colors.grey}, 6em 0 ${colors.greyDark},
                        7em 0 ${colors.greyDark}, 8em 0 ${colors.greyDark},
                        /* line 2 */ 0 1em ${colors.pinkLight},
                        1em 1em ${colors.grey}, 2em 1em ${colors.greyDark},
                        6em 1em ${colors.greyDark}, 7em 1em ${colors.greyDark},
                        8em 1em ${colors.greyDark}, 11em 1em ${colors.purple},
                        -1em 1em ${colors.greyLighter},
                        -2em 1em ${colors.greyDark}, -6em 1em ${colors.greyDark},
                        -7em 1em ${colors.greyDark}, -8em 1em ${colors.greyDark},
                        -10em 1em ${colors.grey},
                        /* line 3 */ -10em 2em ${colors.grey},
                        -8em 2em ${colors.grey}, -7em 2em ${colors.greyDark},
                        -6em 2em ${colors.greyDark}, -1em 2em ${colors.greyDark},
                        0 2em ${colors.greyLighter}, 1em 2em ${colors.greyDark},
                        6em 2em ${colors.grey}, 7em 2em ${colors.greyDark},
                        10em 2em ${colors.greyDark},
                        /* line 4 */ -10em 3em ${colors.grey},
                        -9em 3em ${colors.grey}, -8em 3em ${colors.greyDark},
                        -7em 3em ${colors.greyDark}, -6em 3em ${colors.greyDark},
                        -3em 3em ${colors.greyDark}, -2em 3em ${colors.greyDark},
                        -1em 3em ${colors.greyDark}, 0 3em ${colors.grey},
                        1em 3em ${colors.greyDark}, 2em 3em ${colors.greyDark},
                        3em 3em ${colors.greyDark}, 6em 3em ${colors.grey},
                        7em 3em ${colors.greyDark}, 8em 3em ${colors.greyDark},
                        10em 3em ${colors.greyDark},
                        /* line 5 */ -10em 4em ${colors.greyDark},
                        -9em 4em ${colors.grey}, -8em 4em ${colors.greyDark},
                        -7em 4em ${colors.greyDark}, -6em 4em ${colors.greyDark},
                        -5em 4em ${colors.greyDark}, -2em 4em ${colors.grey},
                        -1em 4em ${colors.greyDark}, 0 4em ${colors.grey},
                        1em 4em ${colors.greyDark}, 2em 4em ${colors.grey},
                        6em 4em ${colors.grey}, 7em 4em ${colors.greyDark},
                        8em 4em ${colors.greyDark}, 9em 4em ${colors.greyDark},
                        10em 4em ${colors.greyDark},
                        /* line 6 */ -9em 5em ${colors.grey},
                        -8em 5em ${colors.greyDark}, -7em 5em ${colors.greyDark},
                        -6em 5em ${colors.greyDark}, -5em 5em ${colors.greyDark},
                        -3em 5em ${colors.grey}, -2em 5em ${colors.greyDark},
                        -1em 5em ${colors.greyDark}, 0 5em ${colors.grey},
                        1em 5em ${colors.greyDark}, 2em 5em ${colors.greyDark},
                        3em 5em ${colors.grey}, 5em 5em ${colors.grey},
                        6em 5em ${colors.greyDark}, 7em 5em ${colors.greyDark},
                        8em 5em ${colors.greyDark}, 9em 5em ${colors.greyDark},
                        10em 5em ${colors.greyDark},
                        /* line 7 */ -9em 6em ${colors.grey},
                        -8em 6em ${colors.greyDark}, -7em 6em ${colors.greyDark},
                        -6em 6em ${colors.greyDark}, -5em 6em ${colors.greyDark},
                        -3em 6em ${colors.greyDark}, -2em 6em ${colors.greyDark},
                        -1em 6em ${colors.greyDark}, 0 6em ${colors.grey},
                        1em 6em ${colors.greyDark}, 2em 6em ${colors.greyDark},
                        3em 6em ${colors.greyDark}, 5em 6em ${colors.greyDark},
                        6em 6em ${colors.greyDark}, 7em 6em ${colors.greyDark},
                        8em 6em ${colors.greyDark}, 9em 6em ${colors.greyDark},
                        /* line 8 */ -9em 7em ${colors.greyDark},
                        -8em 7em ${colors.greyDark}, -7em 7em ${colors.greyDark},
                        -6em 7em ${colors.greyDark}, -5em 7em ${colors.greyDark},
                        -3em 7em ${colors.greyDark}, -2em 7em ${colors.greyDark},
                        -1em 7em ${colors.greyLighter}, 0 7em ${colors.grey},
                        1em 7em ${colors.grey}, 2em 7em ${colors.greyDark},
                        3em 7em ${colors.greyDark}, 5em 7em ${colors.greyDark},
                        6em 7em ${colors.greyDark}, 7em 7em ${colors.greyDark},
                        8em 7em ${colors.greyDark}, 9em 7em ${colors.greyDark},
                        /* line 9 */ -9em 8em ${colors.purple},
                        -8em 8em ${colors.greyDark}, -7em 8em ${colors.greyDark},
                        -6em 8em ${colors.greyDark},
                        -4em 8em ${colors.purpleLight},
                        -2em 8em ${colors.greyDark},
                        -1em 8em ${colors.greyLighter}, 1em 8em ${colors.grey},
                        2em 8em ${colors.greyDark}, 5em 8em ${colors.greyDark},
                        6em 8em ${colors.greyDark}, 7em 8em ${colors.greyDark},
                        8em 8em ${colors.greyDark}, 9em 8em ${colors.greyDark},
                        /* line 10 */ -8em 9em ${colors.purpleLight},
                        -7em 9em ${colors.greyDark}, -6em 9em ${colors.purple},
                        -2em 9em ${colors.greyDark}, -1em 9em ${colors.greyDark},
                        1em 9em ${colors.greyDark},
                        4em 9em ${colors.purpleLight},
                        6em 9em ${colors.greyDark}, 7em 9em ${colors.greyDark},
                        8em 9em ${colors.greyDark}, 9em 9em ${colors.purple},
                        /* line 11 */ -7em 10em ${colors.purpleLight},
                        -5em 10em ${colors.purpleLight},
                        -1em 10em ${colors.greyDark},
                        1em 10em ${colors.greyDark}, 6em 10em ${colors.purple},
                        7em 10em ${colors.greyDark},
                        8em 10em ${colors.purpleLight},
                        /* line 12 */ 7em 11em ${colors.purpleLight},
                        5em 11em ${colors.purpleLight},
                        /* line 13 */ -5em -1em ${colors.greyDark},
                        -6em -1em ${colors.greyDark},
                        -7em -1em ${colors.greyDark},
                        -8em -1em ${colors.greyLighter},
                        -9em -1em ${colors.greyDark},
                        -4em -1em ${colors.greyDark},
                        -3em -1em ${colors.greyLighter},
                        -2em -1em ${colors.greyLighter},
                        -1em -1em ${colors.greyLighter},
                        0 -1em ${colors.pinkLight}, 1em -1em ${colors.grey},
                        2em -1em ${colors.grey}, 3em -1em ${colors.grey},
                        4em -1em ${colors.greyDark}, 5em -1em ${colors.greyDark},
                        6em -1em ${colors.greyDark}, 7em -1em ${colors.greyDark},
                        8em -1em ${colors.greyDark}, 9em -1em ${colors.greyDark},
                        /* line 14 */ -5em -2em ${colors.greyDark},
                        -6em -2em ${colors.greyDark},
                        -7em -2em ${colors.greyDark},
                        -8em -2em ${colors.greyLighter},
                        -9em -2em ${colors.greyDark},
                        -4em -2em ${colors.greyDark},
                        -3em -2em ${colors.greyLighter},
                        -2em -2em ${colors.greyLighter},
                        -1em -2em ${colors.grey}, 0 -2em ${colors.grey},
                        1em -2em ${colors.grey}, 2em -2em ${colors.grey},
                        3em -2em ${colors.grey}, 4em -2em ${colors.greyDark},
                        5em -2em ${colors.greyDark}, 6em -2em ${colors.greyDark},
                        7em -2em ${colors.greyDark}, 8em -2em ${colors.greyDark},
                        9em -2em ${colors.greyDark},
                        /* line 15 */ -5em -3em ${colors.greyDark},
                        -6em -3em ${colors.greyDark},
                        -7em -3em ${colors.greyDark},
                        -8em -3em ${colors.greyLighter},
                        -9em -3em ${colors.greyDark},
                        -4em -3em ${colors.greyLightest},
                        -3em -3em ${colors.greyLighter},
                        -2em -3em ${colors.greyLighter},
                        -1em -3em ${colors.greyDark}, 0 -3em ${colors.greyDark},
                        1em -3em ${colors.greyDark}, 2em -3em ${colors.grey},
                        3em -3em ${colors.grey}, 4em -3em ${colors.grey},
                        5em -3em ${colors.greyDark}, 6em -3em ${colors.greyDark},
                        7em -3em ${colors.greyDark}, 8em -3em ${colors.greyDark},
                        9em -3em ${colors.greyDark},
                        /* line 16 */ -5em -4em ${colors.greyDark},
                        -6em -4em ${colors.greyDark},
                        -7em -4em ${colors.greyDark},
                        -8em -4em ${colors.greyLighter},
                        -9em -4em ${colors.greyDark},
                        -4em -4em ${colors.greyDark},
                        -3em -4em ${colors.greyLightest},
                        -2em -4em ${colors.pinkDark}, -1em -4em ${colors.pink},
                        0 -4em ${colors.greyDark}, 1em -4em ${colors.pink},
                        2em -4em ${colors.pinkDark}, 3em -4em ${colors.grey},
                        4em -4em ${colors.greyDark}, 5em -4em ${colors.greyDark},
                        6em -4em ${colors.greyDark}, 7em -4em ${colors.greyDark},
                        8em -4em ${colors.greyDark}, 9em -4em ${colors.greyDark},
                        /* line 17 */ -5em -5em ${colors.greyDark},
                        -6em -5em ${colors.greyDark},
                        -7em -5em ${colors.greyLighter},
                        -8em -5em ${colors.greyDark},
                        -4em -5em ${colors.tanDark},
                        -3em -5em ${colors.greyDark},
                        -2em -5em ${colors.pinkLight},
                        -1em -5em ${colors.greyDark}, 0 -5em ${colors.greyDark},
                        1em -5em ${colors.greyDark},
                        2em -5em ${colors.pinkLight},
                        3em -5em ${colors.greyDark}, 4em -5em ${colors.tanDark},
                        5em -5em ${colors.greyDark}, 6em -5em ${colors.greyDark},
                        7em -5em ${colors.greyDark}, 8em -5em ${colors.greyDark},
                        /* line 18 */ -8em -6em ${colors.grey},
                        -7em -6em ${colors.greyDark},
                        -6em -6em ${colors.greyDark}, -4em -6em ${colors.tan},
                        -3em -6em ${colors.greyDark}, -2em -6em ${colors.grey},
                        -1em -6em ${colors.greyDark}, 0 -6em ${colors.greyDark},
                        1em -6em ${colors.greyDark}, 2em -6em ${colors.greyDark},
                        3em -6em ${colors.greyDark}, 4em -6em ${colors.tan},
                        6em -6em ${colors.grey}, 7em -6em ${colors.greyDark},
                        8em -6em ${colors.greyDark},
                        /* line 19 */ -7em -7em ${colors.grey},
                        -4em -7em ${colors.tan}, -3em -7em ${colors.tanLight},
                        -1em -7em ${colors.grey}, 0 -7em ${colors.greyDark},
                        1em -7em ${colors.greyDark}, 3em -7em ${colors.tanLight},
                        4em -7em ${colors.tan}, 7em -7em ${colors.grey},
                        /* line 20 */ -5em -8em ${colors.tan},
                        -4em -8em ${colors.tanLight},
                        4em -8em ${colors.tanLight}, 5em -8em ${colors.tan},
                        /* line 21 */ -6em -9em ${colors.tanLight},
                        -4em -9em ${colors.tan}, -3em -9em ${colors.tanLight},
                        3em -9em ${colors.tanLight}, 4em -9em ${colors.tan},
                        6em -9em ${colors.tanLight},
                        /* line 22 */ -2em -10em ${colors.tanLight},
                        2em -10em ${colors.tanLight};
                }

                .sprite::after {
                    animation: smoke 0.5s steps(1) infinite alternate;
                    position: absolute;
                    content: "";
                    top: 0;
                    left: 0;
                    width: 1em;
                    height: 1em;
                }

                .shadow {
                    animation: shadow 1s steps(1) alternate infinite;
                    position: absolute;
                    top: 3em;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 1em;
                    height: 1em;
                }

                @keyframes float {
                    from {
                        top: 0em;
                    }
                    to {
                        top: 4em;
                    }
                }

                @keyframes shadow {
                    0% {
                        box-shadow:
              /* line 29 */ -3em 15em
                                ${colors.shadow},
                            -2em 15em ${colors.shadow},
                            -1em 15em ${colors.shadow}, 0 15em ${colors.shadow},
                            1em 15em ${colors.shadow}, 2em 15em ${colors.shadow},
                            3em 15em ${colors.shadow};
                    }
                    25% {
                        box-shadow:
              /* line 28 */ -1em 14em
                                ${colors.shadow},
                            0 14em ${colors.shadow}, 1em 14em ${colors.shadow},
                            -3em 15em ${colors.shadow},
                            -2em 15em ${colors.shadow},
                            -1em 15em ${colors.shadow}, 0 15em ${colors.shadow},
                            1em 15em ${colors.shadow}, 2em 15em ${colors.shadow},
                            3em 15em ${colors.shadow},
                            -1em 16em ${colors.shadow}, 0 16em ${colors.shadow},
                            1em 16em ${colors.shadow};
                    }
                    50% {
                        box-shadow:
              /* line 28 */ -3em 14em
                                ${colors.shadow},
                            -2em 14em ${colors.shadow},
                            -1em 14em ${colors.shadow}, 0 14em ${colors.shadow},
                            1em 14em ${colors.shadow}, 2em 14em ${colors.shadow},
                            3em 14em ${colors.shadow},
                            /* line 29 */ -6em 15em ${colors.shadow},
                            -5em 15em ${colors.shadow},
                            -4em 15em ${colors.shadow},
                            -3em 15em ${colors.shadow},
                            -2em 15em ${colors.shadow},
                            -1em 15em ${colors.shadow}, 0 15em ${colors.shadow},
                            1em 15em ${colors.shadow}, 2em 15em ${colors.shadow},
                            3em 15em ${colors.shadow}, 4em 15em ${colors.shadow},
                            5em 15em ${colors.shadow}, 6em 15em ${colors.shadow},
                            /* line 30 */ -3em 16em ${colors.shadow},
                            -2em 16em ${colors.shadow},
                            -1em 16em ${colors.shadow}, 0 16em ${colors.shadow},
                            1em 16em ${colors.shadow}, 2em 16em ${colors.shadow},
                            3em 16em ${colors.shadow};
                    }
                    75% {
                        box-shadow:
              /* line 27 */ -1em 13em
                                ${colors.shadow},
                            0 13em ${colors.shadow}, 1em 13em ${colors.shadow},
                            /* line 28 */ -4em 14em ${colors.shadow},
                            -3em 14em ${colors.shadow},
                            -2em 14em ${colors.shadow},
                            -1em 14em ${colors.shadow}, 0 14em ${colors.shadow},
                            1em 14em ${colors.shadow}, 2em 14em ${colors.shadow},
                            3em 14em ${colors.shadow}, 4em 14em ${colors.shadow},
                            /* line 29 */ -7em 15em ${colors.shadow},
                            -6em 15em ${colors.shadow},
                            -5em 15em ${colors.shadow},
                            -4em 15em ${colors.shadow},
                            -3em 15em ${colors.shadow},
                            -2em 15em ${colors.shadow},
                            -1em 15em ${colors.shadow}, 0 15em ${colors.shadow},
                            1em 15em ${colors.shadow}, 2em 15em ${colors.shadow},
                            3em 15em ${colors.shadow}, 4em 15em ${colors.shadow},
                            5em 15em ${colors.shadow}, 6em 15em ${colors.shadow},
                            7em 15em ${colors.shadow},
                            /* line 30 */ -4em 16em ${colors.shadow},
                            -3em 16em ${colors.shadow},
                            -2em 16em ${colors.shadow},
                            -1em 16em ${colors.shadow}, 0 16em ${colors.shadow},
                            1em 16em ${colors.shadow}, 2em 16em ${colors.shadow},
                            3em 16em ${colors.shadow}, 4em 16em ${colors.shadow},
                            /* line 31 */ -1em 17em ${colors.shadow},
                            0 17em ${colors.shadow}, 1em 17em ${colors.shadow};
                    }
                    100% {
                        box-shadow:
              /* line 29 */ -3em 15em
                                ${colors.shadow},
                            -2em 15em ${colors.shadow},
                            -1em 15em ${colors.shadow}, 0 15em ${colors.shadow},
                            1em 15em ${colors.shadow}, 2em 15em ${colors.shadow},
                            3em 15em ${colors.shadow};
                    }
                }

                @keyframes smoke {
                    0% {
                        box-shadow:
              /* line 19 */ -2em -7em ${colors.white},
                            2em -7em ${colors.white},
                            /* line 20 */ -2em -8em ${colors.whiteLight},
                            -1em -8em ${colors.whiteLight},
                            0 -8em ${colors.white}, 1em -8em ${colors.white},
                            3em -8em ${colors.whiteLight},
                            /* line 21 */ -1em -9em ${colors.whiteLight},
                            0 -9em ${colors.white},
                            1em -9em ${colors.whiteLight},
                            2em -9em ${colors.whiteLight},
                            /* line 22 */ -1em -10em ${colors.whiteLight},
                            0 -10em ${colors.whiteLight},
                            1em -10em ${colors.whiteLight},
                            4em -10em ${colors.whiteLight},
                            /* line 23 */ 0 -11em ${colors.whiteLight},
                            1em -11em ${colors.whiteLight},
                            2em -11em ${colors.whiteLight},
                            /* line 24 */ 1em -12em ${colors.whiteLight},
                            /* line 25 */ 0 -13em ${colors.whiteLight},
                            4em -13em ${colors.whiteLight},
                            /* line 26 */ -2em -14em ${colors.whiteLight};
                    }
                    25% {
                        box-shadow:
              /* line 19 */ -2em -7em ${colors.white},
                            2em -7em ${colors.white},
                            /* line 20 */ -2em -8em ${colors.whiteLight},
                            -1em -8em ${colors.whiteLight},
                            0 -8em ${colors.white}, 1em -8em ${colors.white},
                            3em -8em ${colors.whiteLight},
                            /* line 21 */ -1em -9em ${colors.whiteLight},
                            0 -9em ${colors.whiteLight},
                            1em -9em ${colors.whiteLight},
                            2em -9em ${colors.whiteLight},
                            /* line 22 */ 1em -13em ${colors.whiteLight},
                            0 -10em ${colors.whiteLight},
                            1em -10em ${colors.whiteLight},
                            4em -10em ${colors.whiteLight},
                            /* line 23 */ 2em -12em ${colors.whiteLight},
                            1em -11em ${colors.whiteLight},
                            2em -11em ${colors.white},
                            /* line 24 */ 1em -12em ${colors.whiteLight},
                            /* line 25 */ 0 -13em ${colors.whiteLight},
                            0 -15em ${colors.whiteLight},
                            2em -17em ${colors.whiteLight},
                            /* line 26 */ -1em -14em ${colors.whiteLight};
                    }
                    50% {
                        box-shadow:
              /* line 19 */ -2em -7em ${colors.white},
                            2em -7em ${colors.white},
                            /* line 20 */ -3em -8em ${colors.whiteLight},
                            -2em -8em ${colors.whiteLight},
                            -1em -8em ${colors.whiteLight},
                            0 -8em ${colors.white}, 1em -8em ${colors.white},
                            /* line 21 */ -2em -9em ${colors.whiteLight},
                            -1em -9em ${colors.whiteLight},
                            0 -9em ${colors.whiteLight},
                            1em -9em ${colors.whiteLight},
                            2em -9em ${colors.white},
                            /* line 22 */ 0 -10em ${colors.whiteLight},
                            1em -10em ${colors.whiteLight},
                            -1em -10em ${colors.whiteLight},
                            /* line 23 */ 0 -11em ${colors.white},
                            1em -11em ${colors.whiteLight},
                            1em -11em ${colors.whiteLight},
                            /* line 24 */ -1em -12em ${colors.whiteLight},
                            0 -12em ${colors.whiteLight},
                            /* line 25 */ -1em -13em ${colors.whiteLight},
                            /* line 26 */ -2em -14em ${colors.whiteLight},
                            -3em -15em ${colors.whiteLight};
                    }
                    100% {
                        box-shadow:
              /* line 19 */ -2em -7em ${colors.white},
                            2em -7em ${colors.white},
                            /* line 20 */ -2em -8em ${colors.whiteLight},
                            -1em -8em ${colors.whiteLight},
                            0 -8em ${colors.white}, 1em -8em ${colors.white},
                            3em -8em ${colors.whiteLight},
                            /* line 21 */ -1em -9em ${colors.whiteLight},
                            0 -9em ${colors.white},
                            1em -9em ${colors.whiteLight},
                            2em -9em ${colors.whiteLight},
                            /* line 22 */ -1em -10em ${colors.whiteLight},
                            0 -10em ${colors.whiteLight},
                            1em -10em ${colors.whiteLight},
                            4em -10em ${colors.whiteLight},
                            /* line 23 */ 0 -11em ${colors.whiteLight},
                            1em -11em ${colors.whiteLight},
                            2em -11em ${colors.whiteLight},
                            /* line 24 */ 1em -12em ${colors.whiteLight},
                            /* line 25 */ 0 -13em ${colors.whiteLight},
                            4em -13em ${colors.whiteLight},
                            /* line 26 */ -2em -14em ${colors.whiteLight};
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default Sprite;
