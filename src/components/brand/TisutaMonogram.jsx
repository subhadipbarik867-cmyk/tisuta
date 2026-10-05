import React from 'react';

export const TisutaMonogram = ({ className = "", variant = "gold", showSubtitle = true }) => {
    const gold = "url(#tisutaGold)";
    const textColor = variant === "white" ? "#FFFFFF" : "#C5A059";
    const subColor = variant === "white" ? "#E0E0E0" : "#D5B263";

    return (
        <div className={`flex items-center justify-center select-none cursor-pointer ${className}`}>
            <svg
                viewBox="0 0 320 72"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                style={{ width: '100%', height: '100%', display: 'block' }}
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
            >
                <defs>
                    <linearGradient id="tisutaGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C5A059" />
                        <stop offset="40%" stopColor="#E8C97A" />
                        <stop offset="70%" stopColor="#D5B263" />
                        <stop offset="100%" stopColor="#9B7B34" />
                    </linearGradient>
                </defs>

                {/* Emblem — clean geometric "T" monogram mark */}
                <g transform="translate(10, 8)">
                    {/* Top horizontal bar of T */}
                    <rect x="0" y="0" width="44" height="5" fill={gold} rx="1" />
                    {/* Vertical stem of T */}
                    <rect x="19.5" y="5" width="5" height="32" fill={gold} rx="1" />
                    {/* Small decorative gold leaf/diamond accent */}
                    <polygon points="22,43 26,50 22,57 18,50" fill={gold} opacity="0.6" />
                </g>

                {/* Brand Name wordmark */}
                <text
                    x="72"
                    y="36"
                    fill={textColor}
                    fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
                    fontSize="32"
                    fontWeight="700"
                    letterSpacing="6"
                    dominantBaseline="middle"
                >
                    TISUTA
                </text>

                {/* Thin horizontal rule below name */}
                <line x1="72" y1="52" x2="316" y2="52" stroke={subColor} strokeWidth="0.5" opacity="0.5" />

                {/* Subtitle */}
                {showSubtitle && (
                    <text
                        x="72"
                        y="64"
                        fill={subColor}
                        fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
                        fontSize="9"
                        fontWeight="500"
                        letterSpacing="5"
                        opacity="0.85"
                    >
                        CREATION
                    </text>
                )}
            </svg>
        </div>
    );
};

export default TisutaMonogram;
