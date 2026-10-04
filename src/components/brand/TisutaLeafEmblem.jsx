import React from 'react';

export const TisutaLeafEmblem = ({ className = "h-12", variant = "gold", showText = true }) => {
    const isWhite = variant === "white";

    return (
        <div className={`flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}>
            <svg
                viewBox="0 0 200 160"
                className="w-full h-full max-h-16 transition-transform duration-300 group-hover:scale-105"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="tisutaLeafGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D5B263" />
                        <stop offset="50%" stopColor="#F4E8C1" />
                        <stop offset="100%" stopColor="#C5A059" />
                    </linearGradient>
                </defs>

                {/* 3-Leaf Floral Vector Emblem matching TISUTA logo */}
                <g stroke={isWhite ? "#FFFFFF" : "url(#tisutaLeafGold)"} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    {/* Middle Vertical Leaf */}
                    <path d="M 100 80 C 85 45 90 20 100 15 C 110 20 115 45 100 80 Z" />
                    <path d="M 100 80 V 30" strokeWidth="2.5" />

                    {/* Left Arching Leaf */}
                    <path d="M 100 80 C 65 70 45 50 40 40 C 50 35 75 42 100 80 Z" />
                    <path d="M 100 80 C 75 62 60 52 50 42" strokeWidth="2.5" />

                    {/* Right Arching Leaf */}
                    <path d="M 100 80 C 135 70 155 50 160 40 C 150 35 125 42 100 80 Z" />
                    <path d="M 100 80 C 125 62 140 52 150 42" strokeWidth="2.5" />

                    {/* Stem curve */}
                    <path d="M 100 80 C 95 90 88 95 82 100" strokeWidth="3" />
                </g>

                {showText && (
                    <>
                        <text
                            x="100"
                            y="130"
                            textAnchor="middle"
                            fill={isWhite ? "#FFFFFF" : "url(#tisutaLeafGold)"}
                            fontFamily="'Playfair Display', serif"
                            fontSize="20"
                            fontWeight="600"
                            letterSpacing="8"
                        >
                            TISUTA
                        </text>
                        <text
                            x="100"
                            y="150"
                            textAnchor="middle"
                            fill={isWhite ? "#E5E5E5" : "url(#tisutaLeafGold)"}
                            fontFamily="'Plus Jakarta Sans', sans-serif"
                            fontSize="9"
                            fontWeight="500"
                            letterSpacing="5"
                        >
                            CREATION
                        </text>
                    </>
                )}
            </svg>
        </div>
    );
};

export default TisutaLeafEmblem;
