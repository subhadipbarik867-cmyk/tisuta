import React from 'react';

export const TisutaMonogram = ({ className = "h-12", variant = "gold", showSubtitle = true }) => {
    const isDark = variant === "white";

    return (
        <div className={`flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}>
            <svg
                viewBox="0 0 300 200"
                className="w-full h-full max-h-16 transition-transform duration-300 group-hover:scale-105"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Gold metallic gradient matching TISUTA brand image */}
                    <linearGradient id="tisutaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C5A059" />
                        <stop offset="35%" stopColor="#E5C158" />
                        <stop offset="70%" stopColor="#D5B263" />
                        <stop offset="100%" stopColor="#9B7B34" />
                    </linearGradient>
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D5B263" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* Monogram T & C Interlocked */}
                <g filter={!isDark ? "url(#goldGlow)" : undefined}>
                    {/* Stem & Top Bar of 'T' */}
                    <path
                        d="M 125 40 H 175 V 48 H 154 V 115 C 154 117 155 118 158 118 H 165 V 124 H 135 V 118 H 142 C 145 118 146 117 146 115 V 48 H 125 V 40 Z"
                        fill={isDark ? "#FFFFFF" : "url(#tisutaGoldGrad)"}
                    />

                    {/* Elegant Arc of 'C' looping behind & around T */}
                    <path
                        d="M 172 52 C 140 40 120 62 120 85 C 120 110 142 124 175 118 C 177 117 178 115 178 113 C 178 110 174 105 170 106 C 148 111 130 102 130 85 C 130 70 144 52 170 60 C 173 61 175 59 175 56 C 175 53 173 52 172 52 Z"
                        fill={isDark ? "#FFFFFF" : "url(#tisutaGoldGrad)"}
                    />

                    {/* Gold Leaves springing from C curve */}
                    <path
                        d="M 152 75 C 158 70 168 70 172 77 C 167 84 158 83 152 75 Z"
                        fill={isDark ? "#FFFFFF" : "url(#tisutaGoldGrad)"}
                    />
                    <path
                        d="M 160 84 C 168 81 175 84 176 92 C 168 95 162 90 160 84 Z"
                        fill={isDark ? "#FFFFFF" : "url(#tisutaGoldGrad)"}
                    />
                </g>

                {/* TISUTA Brand Typography */}
                <text
                    x="150"
                    y="158"
                    textAnchor="middle"
                    fill={isDark ? "#FFFFFF" : "url(#tisutaGoldGrad)"}
                    fontFamily="'Playfair Display', serif"
                    fontSize="24"
                    fontWeight="600"
                    letterSpacing="9"
                >
                    TISUTA
                </text>

                {/* CREATION Subtitle */}
                {showSubtitle && (
                    <text
                        x="150"
                        y="180"
                        textAnchor="middle"
                        fill={isDark ? "#E5E5E5" : "url(#tisutaGoldGrad)"}
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                        fontSize="10"
                        fontWeight="500"
                        letterSpacing="6"
                        opacity="0.95"
                    >
                        CREATION
                    </text>
                )}
            </svg>
        </div>
    );
};

export default TisutaMonogram;
