import React from 'react';

export const TisutaMonogram = ({ className = "", variant = "gold", showSubtitle = true }) => {
    const isDarkBackground = variant === "white";
    
    // Gradients & Colors for Royale Gold Theme
    const goldPrimary = "url(#royaleGoldGrad)";
    const goldShine = "url(#royaleShineGrad)";
    const textColor = isDarkBackground ? "url(#royaleWhiteGoldGrad)" : "url(#royaleGoldGrad)";
    const subColor = isDarkBackground ? "#F3E5AB" : "#B88B22";

    return (
        <div className={`flex items-center justify-center select-none cursor-pointer ${className}`}>
            <svg
                viewBox="0 0 500 96"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                style={{ width: '100%', height: '100%', display: 'block' }}
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
            >
                <defs>
                    {/* Primary Royale 24K Gold Gradient */}
                    <linearGradient id="royaleGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF2BF" />
                        <stop offset="25%" stopColor="#E2BE57" />
                        <stop offset="50%" stopColor="#D4AF37" />
                        <stop offset="75%" stopColor="#F9E298" />
                        <stop offset="100%" stopColor="#9A761E" />
                    </linearGradient>

                    {/* White & Gold Gradient for Dark Backdrops */}
                    <linearGradient id="royaleWhiteGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="40%" stopColor="#FFF8E0" />
                        <stop offset="70%" stopColor="#EAD17D" />
                        <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>

                    {/* Brilliant Metallic Highlight */}
                    <linearGradient id="royaleShineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9A761E" />
                        <stop offset="35%" stopColor="#D4AF37" />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="65%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#9A761E" />
                    </linearGradient>

                    {/* Subtle Glow Filter */}
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.35" />
                    </filter>
                </defs>

                {/* ✦ ROYAL IMPERIAL CREST EMBLEM ✦ */}
                <g transform="translate(14, 10)" filter="url(#goldGlow)">
                    {/* Imperial Crown Arch */}
                    <path
                        d="M38 12 L43 23 L51 14 L49 32 L27 32 L25 14 L33 23 Z"
                        fill={goldPrimary}
                    />
                    {/* Crown Jewels (5 Pearls) */}
                    <circle cx="25" cy="13" r="2" fill="#FFFFFF" />
                    <circle cx="33" cy="22" r="1.5" fill="#FFFFFF" />
                    <circle cx="38" cy="11" r="2.5" fill="#FFFFFF" />
                    <circle cx="43" cy="22" r="1.5" fill="#FFFFFF" />
                    <circle cx="51" cy="13" r="2" fill="#FFFFFF" />

                    {/* Royal Octagonal Shield Filigree */}
                    <path
                        d="M20 34 L56 34 L66 48 L56 70 L38 78 L20 70 L10 48 Z"
                        stroke={goldPrimary}
                        strokeWidth="1.75"
                        fill={isDarkBackground ? "rgba(20, 18, 16, 0.6)" : "rgba(255, 255, 255, 0.85)"}
                    />
                    
                    {/* Inner Golden Border */}
                    <path
                        d="M23 37 L53 37 L61 48 L53 67 L38 74 L23 67 L15 48 Z"
                        stroke={goldShine}
                        strokeWidth="0.75"
                        strokeDasharray="2 1.5"
                    />

                    {/* Intertwined Royal Monogram 'TC' */}
                    {/* Letter T */}
                    <path
                        d="M28 44 L48 44 M38 44 L38 64"
                        stroke={goldPrimary}
                        strokeWidth="3.2"
                        strokeLinecap="round"
                    />
                    {/* Letter C sweeping around T */}
                    <path
                        d="M48 49 C44 45, 30 45, 30 54 C30 63, 45 64, 47 59"
                        stroke={goldShine}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                    />

                    {/* Small Royal Diamond Below */}
                    <polygon points="38,68 41,71 38,74 35,71" fill={goldPrimary} />
                </g>

                {/* ✦ BRAND NAME: TISUTA CREATION ✦ */}
                <g transform="translate(94, 0)">
                    {/* Primary Haute Wordmark */}
                    <text
                        x="0"
                        y="48"
                        fill={textColor}
                        fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
                        fontSize="35"
                        fontWeight="800"
                        letterSpacing="7"
                        dominantBaseline="middle"
                        filter="url(#goldGlow)"
                    >
                        TISUTA
                    </text>

                    {/* CREATION Wordmark */}
                    <text
                        x="180"
                        y="48"
                        fill={goldPrimary}
                        fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
                        fontSize="32"
                        fontWeight="600"
                        letterSpacing="6"
                        dominantBaseline="middle"
                    >
                        CREATION
                    </text>

                    {/* Regal Golden Hairline Rule with Diamond Centerpiece */}
                    <line x1="0" y1="68" x2="385" y2="68" stroke={goldPrimary} strokeWidth="1" opacity="0.6" />
                    <polygon points="192,65 195,68 192,71 189,68" fill={goldPrimary} />

                    {/* Subtitle Accolade */}
                    {showSubtitle && (
                        <text
                            x="192"
                            y="82"
                            textAnchor="middle"
                            fill={subColor}
                            fontFamily="'Cinzel', sans-serif"
                            fontSize="9"
                            fontWeight="700"
                            letterSpacing="5.5"
                        >
                            ✦ HAUTE COUTURE ROYALE • ATELIER ✦
                        </text>
                    )}
                </g>
            </svg>
        </div>
    );
};

export default TisutaMonogram;
