import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Sparkles, Sliders, RefreshCw, Zap, Camera, ShieldCheck, Eye, Sun, Play, Pause, ZoomIn, ZoomOut, Check } from 'lucide-react';

export const ThreeDBodyAvatar = ({
    height = '168 cm',
    bust = '34B',
    waist = '27 in',
    hips = '36 in',
    bodyShape = 'Hourglass',
    garmentColor = { name: 'Champagne Gold', hex: '#D4AF37' },
    garmentImage = null,
    garmentSilhouette = 'minimal-midi',
    garmentName = 'Haute Couture Silhouette',
    fitScore = 98,
    showControls = true
}) => {
    const [rotationY, setRotationY] = useState(25);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isScanning, setIsScanning] = useState(true);
    const [isAutoSpin, setIsAutoSpin] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [renderMode, setRenderMode] = useState('couture'); // 'couture', 'heatmap', 'wireframe'
    const [lightingMode, setLightingMode] = useState('gold'); // 'gold', 'runway', 'cyber'
    const [viewPose, setViewPose] = useState('runway'); // 'front', 'runway', 'side', 'back'

    const canvasRef = useRef(null);

    // Parse numeric measurements safely
    const parseNumber = (val, defaultVal) => {
        if (typeof val === 'number') return val;
        const match = String(val).match(/\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : defaultVal;
    };

    const numHeight = parseNumber(height, 168);
    const numBust = parseNumber(bust, 34);
    const numWaist = parseNumber(waist, 27);
    const numHips = parseNumber(hips, 36);

    // Camera preset pose handler
    const handleSetPose = (pose) => {
        setViewPose(pose);
        setIsAutoSpin(false);
        if (pose === 'front') setRotationY(0);
        if (pose === 'runway') setRotationY(35);
        if (pose === 'side') setRotationY(90);
        if (pose === 'back') setRotationY(180);
    };

    // Handle 360 Drag rotation
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setIsAutoSpin(false);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        setRotationY((prev) => (prev + deltaX * 0.9 + 360) % 360);
        setStartX(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Auto-spin animation loop
    useEffect(() => {
        if (!isAutoSpin) return;
        const interval = setInterval(() => {
            setRotationY((prev) => (prev + 0.6) % 360);
        }, 16);
        return () => clearInterval(interval);
    }, [isAutoSpin]);

    // Canvas 3D Mesh & Garment Renderer
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let scanLineY = 40;
        let scanDirection = 1.4;

        const render3DScene = () => {
            const width = canvas.width;
            const heightPx = canvas.height;

            ctx.clearRect(0, 0, width, heightPx);

            // 1. Studio Lighting Atmosphere
            let bgGrad = ctx.createRadialGradient(width / 2, heightPx / 2, 30, width / 2, heightPx / 2, width * 0.8);
            if (lightingMode === 'gold') {
                bgGrad.addColorStop(0, '#1A1612');
                bgGrad.addColorStop(0.6, '#120F0D');
                bgGrad.addColorStop(1, '#080706');
            } else if (lightingMode === 'runway') {
                bgGrad.addColorStop(0, '#1E2024');
                bgGrad.addColorStop(0.6, '#111317');
                bgGrad.addColorStop(1, '#07080A');
            } else {
                bgGrad.addColorStop(0, '#0F1A24');
                bgGrad.addColorStop(0.6, '#080E14');
                bgGrad.addColorStop(1, '#04070A');
            }
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, heightPx);

            // Floor Spotlight Oval
            ctx.beginPath();
            ctx.ellipse(width / 2, heightPx * 0.87, 120 * zoomLevel, 32 * zoomLevel, 0, 0, Math.PI * 2);
            const floorSpot = ctx.createRadialGradient(width / 2, heightPx * 0.87, 5, width / 2, heightPx * 0.87, 120 * zoomLevel);
            floorSpot.addColorStop(0, lightingMode === 'gold' ? 'rgba(212, 175, 55, 0.35)' : lightingMode === 'cyber' ? 'rgba(56, 189, 248, 0.35)' : 'rgba(255, 255, 255, 0.3)');
            floorSpot.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = floorSpot;
            ctx.fill();

            // Perspective Grid Floor Lines
            ctx.strokeStyle = lightingMode === 'gold' ? 'rgba(212, 175, 55, 0.12)' : lightingMode === 'cyber' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            const centerY = heightPx * 0.86;

            for (let i = -14; i <= 14; i++) {
                const xStart = width / 2 + i * 16 * zoomLevel;
                ctx.beginPath();
                ctx.moveTo(xStart, centerY);
                ctx.lineTo(width / 2 + i * 55 * zoomLevel, heightPx);
                ctx.stroke();
            }

            for (let j = 0; j < 6; j++) {
                const y = centerY + j * 16 * zoomLevel;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // 2. Geometry Scale Factors from Measurements
            const heightScale = Math.min(Math.max((numHeight / 168), 0.88), 1.14) * zoomLevel;
            const bustWidth = ((numBust - 34) * 1.4 + 48) * zoomLevel;
            const waistWidth = ((numWaist - 27) * 1.5 + 32) * zoomLevel;
            const hipWidth = ((numHips - 36) * 1.6 + 48) * zoomLevel;
            const shoulderWidth = (52 + (bodyShape === 'Athletic' ? 6 : bodyShape === 'Petite' ? -4 : 0)) * zoomLevel;

            // Convert rotation angle to radians
            const rad = (rotationY * Math.PI) / 180;
            const cosR = Math.cos(rad);
            const sinR = Math.sin(rad);

            const originX = width / 2;
            const originY = heightPx / 2 - 10;

            // Key Vertical Anatomical Landmarks
            const headY = originY - 175 * heightScale;
            const shoulderY = originY - 120 * heightScale;
            const bustY = originY - 70 * heightScale;
            const waistY = originY - 15 * heightScale;
            const hipY = originY + 45 * heightScale;
            const kneeY = originY + 130 * heightScale;
            const ankleY = originY + 205 * heightScale;

            // 3D Rotated Projection Coordinates
            const lsX = originX + (-shoulderWidth * cosR);
            const rsX = originX + (shoulderWidth * cosR);
            const lbX = originX + (-bustWidth * cosR);
            const rbX = originX + (bustWidth * cosR);
            const lwX = originX + (-waistWidth * cosR);
            const rwX = originX + (waistWidth * cosR);
            const lhX = originX + (-hipWidth * cosR);
            const rhX = originX + (hipWidth * cosR);
            const lkX = originX + (-26 * zoomLevel * cosR + 14 * sinR);
            const rkX = originX + (26 * zoomLevel * cosR - 14 * sinR);
            const laX = originX + (-20 * zoomLevel * cosR);
            const raX = originX + (20 * zoomLevel * cosR);

            // Shading and Colors
            const hexColor = garmentColor?.hex || '#D4AF37';

            // 3. Render 3D Anatomical Mannequin Body
            ctx.beginPath();
            ctx.moveTo(lsX, shoulderY);
            ctx.bezierCurveTo(lbX - 10 * cosR, bustY, lwX - 10 * cosR, waistY - 15, lwX, waistY);
            ctx.bezierCurveTo(lhX - 12 * cosR, hipY - 15, lhX, hipY, lhX, hipY);
            ctx.lineTo(lkX, kneeY);
            ctx.lineTo(laX, ankleY);
            ctx.lineTo(raX, ankleY);
            ctx.lineTo(rkX, kneeY);
            ctx.lineTo(rhX, hipY);
            ctx.bezierCurveTo(rhX + 12 * cosR, hipY - 15, rwX + 10 * cosR, waistY - 15, rwX, waistY);
            ctx.bezierCurveTo(rbX + 10 * cosR, bustY, rsX, shoulderY, rsX, shoulderY);
            ctx.closePath();

            // Inner Body Gradient
            const bodyGrad = ctx.createLinearGradient(originX - 60 * cosR, shoulderY, originX + 60 * cosR, ankleY);
            bodyGrad.addColorStop(0, '#3A3226');
            bodyGrad.addColorStop(0.5, '#201C16');
            bodyGrad.addColorStop(1, '#14120E');
            ctx.fillStyle = bodyGrad;
            ctx.fill();

            // Mannequin Head & Neck
            ctx.beginPath();
            ctx.ellipse(originX, headY + 30 * heightScale, 8 * zoomLevel, 14 * zoomLevel, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#201C16';
            ctx.fill();

            ctx.beginPath();
            ctx.ellipse(originX, headY, 18 * zoomLevel, 24 * zoomLevel, 0, 0, Math.PI * 2);
            ctx.strokeStyle = lightingMode === 'gold' ? '#D4AF37' : '#FFFFFF';
            ctx.lineWidth = 1.6;
            ctx.stroke();
            ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
            ctx.fill();

            // 4. SILHOUETTE-SPECIFIC GARMENT DRAPING
            const sil = garmentSilhouette || 'minimal-midi';
            ctx.save();

            let drapeGrad = ctx.createLinearGradient(originX - 80 * cosR, shoulderY, originX + 80 * cosR, kneeY);

            if (renderMode === 'heatmap') {
                // Stress & Tension Heatmap
                drapeGrad = ctx.createLinearGradient(0, shoulderY, 0, kneeY);
                drapeGrad.addColorStop(0, '#22C55E'); // Green = optimal shoulder fit
                drapeGrad.addColorStop(0.3, '#EAB308'); // Yellow = gentle comfort ease
                drapeGrad.addColorStop(0.6, '#22C55E'); // Green = contoured waist
                drapeGrad.addColorStop(0.85, '#F43F5E'); // Rose = tension point on flared hem
                drapeGrad.addColorStop(1, '#22C55E');
            } else if (renderMode === 'wireframe') {
                drapeGrad = ctx.createLinearGradient(0, shoulderY, 0, ankleY);
                drapeGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
                drapeGrad.addColorStop(1, 'rgba(56, 189, 248, 0.15)');
            } else {
                // Couture Luxury Shading
                drapeGrad.addColorStop(0, hexColor + 'CC');
                drapeGrad.addColorStop(0.4, hexColor);
                drapeGrad.addColorStop(0.7, hexColor + 'DD');
                drapeGrad.addColorStop(1, hexColor + '88');
            }

            // Drape Shapes according to 12 Silhouettes
            if (sil === 'minimal-midi' || sil === 'casual-midi') {
                // Sleek Midi Dress Draping (mid-calf length)
                const hemY = originY + 165 * heightScale;
                const hemWidth = (hipWidth + 6) * cosR;

                ctx.beginPath();
                ctx.moveTo(lsX, shoulderY + 4);
                ctx.bezierCurveTo(lbX - 8 * cosR, bustY, lwX - 6 * cosR, waistY, lwX, waistY);
                ctx.bezierCurveTo(lhX - 8 * cosR, hipY, originX - hemWidth, hemY - 10, originX - hemWidth, hemY);
                ctx.quadraticCurveTo(originX, hemY + 12 * Math.abs(cosR), originX + hemWidth, hemY);
                ctx.bezierCurveTo(originX + hemWidth, hemY - 10, rhX + 8 * cosR, hipY, rwX, waistY);
                ctx.bezierCurveTo(rwX + 6 * cosR, waistY, rbX + 8 * cosR, bustY, rsX, shoulderY + 4);
                ctx.quadraticCurveTo(originX, shoulderY + 16 * heightScale, lsX, shoulderY + 4);
                ctx.closePath();

                ctx.fillStyle = drapeGrad;
                ctx.fill();
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1.4;
                ctx.stroke();

                // Drape Cowl folds
                ctx.beginPath();
                ctx.moveTo(lsX + 12 * cosR, shoulderY + 10);
                ctx.quadraticCurveTo(originX, bustY - 5, rsX - 12 * cosR, shoulderY + 10);
                ctx.strokeStyle = 'rgba(255,255,255,0.45)';
                ctx.lineWidth = 1.2;
                ctx.stroke();

            } else if (sil === 'slip-style') {
                // Liquid Satin Cowl-Neck Slip Dress (bias-cut hug)
                const hemY = originY + 160 * heightScale;
                const hemWidth = (hipWidth + 4) * cosR;

                // Spaghetti Straps
                ctx.beginPath();
                ctx.moveTo(originX - 16 * cosR, shoulderY - 8);
                ctx.lineTo(originX - 22 * cosR, bustY - 14);
                ctx.moveTo(originX + 16 * cosR, shoulderY - 8);
                ctx.lineTo(originX + 22 * cosR, bustY - 14);
                ctx.strokeStyle = '#D4AF37';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(originX - 24 * cosR, bustY - 10);
                ctx.quadraticCurveTo(originX, bustY + 6, originX + 24 * cosR, bustY - 10);
                ctx.bezierCurveTo(rwX + 4 * cosR, waistY, rhX + 6 * cosR, hipY, originX + hemWidth, hemY);
                ctx.quadraticCurveTo(originX, hemY + 10 * Math.abs(cosR), originX - hemWidth, hemY);
                ctx.bezierCurveTo(lhX - 6 * cosR, hipY, lwX - 4 * cosR, waistY, originX - 24 * cosR, bustY - 10);
                ctx.closePath();

                ctx.fillStyle = drapeGrad;
                ctx.fill();
                ctx.strokeStyle = '#FFF2BF';
                ctx.lineWidth = 1.5;
                ctx.stroke();

            } else if (sil === 'aline-dress' || sil === 'short-flared') {
                // A-Line & Flared One Piece (pleated flare above knee)
                const hemY = (sil === 'short-flared' ? originY + 95 : originY + 125) * heightScale;
                const flareWidth = (hipWidth + 35) * Math.abs(cosR);

                ctx.beginPath();
                ctx.moveTo(lsX, shoulderY);
                ctx.bezierCurveTo(lbX, bustY, lwX, waistY, lwX, waistY);
                ctx.lineTo(originX - flareWidth, hemY);
                ctx.quadraticCurveTo(originX, hemY + 16 * Math.abs(cosR), originX + flareWidth, hemY);
                ctx.lineTo(rwX, waistY);
                ctx.bezierCurveTo(rwX, waistY, rbX, bustY, rsX, shoulderY);
                ctx.quadraticCurveTo(originX, shoulderY + 14 * heightScale, lsX, shoulderY);
                ctx.closePath();

                ctx.fillStyle = drapeGrad;
                ctx.fill();
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Pleat Lines
                for (let k = -2; k <= 2; k++) {
                    ctx.beginPath();
                    ctx.moveTo(originX + k * 8 * cosR, waistY);
                    ctx.lineTo(originX + k * 18 * cosR, hemY);
                    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

            } else if (sil === 'fitted-basic') {
                // Second-Skin Fitted Basic Top (ends at waistline)
                ctx.beginPath();
                ctx.moveTo(lsX, shoulderY);
                ctx.bezierCurveTo(lbX - 4 * cosR, bustY, lwX - 4 * cosR, waistY, lwX, waistY + 6);
                ctx.lineTo(rwX, waistY + 6);
                ctx.bezierCurveTo(rwX + 4 * cosR, waistY, rbX + 4 * cosR, bustY, rsX, shoulderY);
                ctx.quadraticCurveTo(originX, shoulderY + 18 * heightScale, lsX, shoulderY);
                ctx.closePath();

                ctx.fillStyle = drapeGrad;
                ctx.fill();
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1.6;
                ctx.stroke();

            } else if (sil === 'off-shoulder') {
                // Bardot Off-Shoulder Ruched Top
                const bardotY = shoulderY + 18 * heightScale;
                ctx.beginPath();
                ctx.moveTo(lsX - 16 * cosR, bardotY);
                ctx.quadraticCurveTo(originX, bardotY + 8, rsX + 16 * cosR, bardotY);
                ctx.lineTo(rwX, waistY + 4);
                ctx.lineTo(lwX, waistY + 4);
                ctx.closePath();

                ctx.fillStyle = drapeGrad;
                ctx.fill();
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1.6;
                ctx.stroke();

            } else if (sil === 'crop-top') {
                // Architectural Square-Neck Crop Top
                const cropY = waistY - 14 * heightScale;
                ctx.beginPath();
                ctx.moveTo(lsX, shoulderY);
                ctx.bezierCurveTo(lbX, bustY - 6, lwX, cropY - 4, lwX, cropY);
                ctx.lineTo(rwX, cropY);
                ctx.bezierCurveTo(rwX, cropY - 4, rbX, bustY - 6, rsX, shoulderY);
                ctx.lineTo(originX + 18 * cosR, shoulderY);
                ctx.lineTo(originX + 18 * cosR, bustY - 16);
                ctx.lineTo(originX - 18 * cosR, bustY - 16);
                ctx.lineTo(originX - 18 * cosR, shoulderY);
                ctx.closePath();

                ctx.fillStyle = drapeGrad;
                ctx.fill();
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1.6;
                ctx.stroke();

            } else if (sil === 'net-top') {
                // Sheer French Illusion Net Er Top (semi-transparent mesh)
                ctx.beginPath();
                ctx.moveTo(lsX, shoulderY);
                ctx.lineTo(lwX, waistY + 4);
                ctx.lineTo(rwX, waistY + 4);
                ctx.lineTo(rsX, shoulderY);
                ctx.closePath();

                ctx.fillStyle = hexColor + '55';
                ctx.fill();
                ctx.strokeStyle = hexColor;
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Honeycomb Sheer Mesh Netting grid
                ctx.setLineDash([3, 3]);
                ctx.strokeStyle = 'rgba(255,255,255,0.45)';
                for (let yGrid = shoulderY; yGrid < waistY + 4; yGrid += 10) {
                    ctx.beginPath();
                    ctx.moveTo(lwX, yGrid);
                    ctx.lineTo(rwX, yGrid);
                    ctx.stroke();
                }
                ctx.setLineDash([]);

                // Solid Bandeau Bralette underneath
                ctx.beginPath();
                ctx.rect(lwX + 4 * cosR, bustY - 16, (waistWidth * 2 - 8) * Math.abs(cosR), 28);
                ctx.fillStyle = hexColor + 'DD';
                ctx.fill();

            } else if (sil === 'ethnic-sets' || sil === 'modern-long-kurti' || sil === 'short-kurti') {
                // Royal Anarkali & Kurti Silhouettes with 24K Zari Borders
                const hemY = (sil === 'short-kurti' ? originY + 80 : originY + 175) * heightScale;
                const flareWidth = (sil === 'ethnic-sets' ? hipWidth + 45 : hipWidth + 15) * Math.abs(cosR);

                ctx.beginPath();
                ctx.moveTo(lsX, shoulderY);
                ctx.bezierCurveTo(lbX, bustY, lwX, waistY, lwX, waistY);
                ctx.lineTo(originX - flareWidth, hemY);
                ctx.quadraticCurveTo(originX, hemY + 15 * Math.abs(cosR), originX + flareWidth, hemY);
                ctx.lineTo(rwX, waistY);
                ctx.bezierCurveTo(rwX, waistY, rbX, bustY, rsX, shoulderY);
                ctx.quadraticCurveTo(originX, shoulderY + 12 * heightScale, lsX, shoulderY);
                ctx.closePath();

                ctx.fillStyle = drapeGrad;
                ctx.fill();

                // 24K Gold Bullion Gota Patti Hem Border
                ctx.beginPath();
                ctx.moveTo(originX - flareWidth, hemY - 8);
                ctx.quadraticCurveTo(originX, hemY - 8 + 15 * Math.abs(cosR), originX + flareWidth, hemY - 8);
                ctx.strokeStyle = '#F5D77F';
                ctx.lineWidth = 4;
                ctx.stroke();

                // Draped Dupatta Scarf for Ethnic Sets
                if (sil === 'ethnic-sets') {
                    ctx.beginPath();
                    ctx.moveTo(rsX + 4, shoulderY - 4);
                    ctx.quadraticCurveTo(originX + 15 * cosR, waistY + 20, originX + 35 * cosR, hemY + 10);
                    ctx.lineWidth = 14;
                    ctx.strokeStyle = 'rgba(245, 215, 127, 0.45)';
                    ctx.stroke();
                }
            }

            ctx.restore();

            // 5. 3D Wireframe Calibration Rings (Bust, Waist, Hips)
            const rings = [
                { y: bustY, rx: bustWidth * Math.abs(cosR) + 6, label: `Bust: ${numBust}"` },
                { y: waistY, rx: waistWidth * Math.abs(cosR) + 4, label: `Waist: ${numWaist}"` },
                { y: hipY, rx: hipWidth * Math.abs(cosR) + 6, label: `Hips: ${numHips}"` }
            ];

            rings.forEach(ring => {
                ctx.beginPath();
                ctx.ellipse(originX, ring.y, ring.rx, 8 * zoomLevel, 0, 0, Math.PI * 2);
                ctx.strokeStyle = renderMode === 'heatmap' ? 'rgba(34, 197, 94, 0.7)' : 'rgba(212, 175, 55, 0.75)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            });

            // 6. Hologram Laser Scanner Line Sweep
            if (isScanning) {
                scanLineY += scanDirection;
                if (scanLineY > heightPx * 0.86 || scanLineY < 40) {
                    scanDirection *= -1;
                }

                const laserColor = lightingMode === 'cyber' ? 'rgba(56, 189, 248,' : 'rgba(212, 175, 55,';
                const laserGrad = ctx.createLinearGradient(0, scanLineY - 14, 0, scanLineY + 14);
                laserGrad.addColorStop(0, laserColor + ' 0)');
                laserGrad.addColorStop(0.5, laserColor + ' 0.85)');
                laserGrad.addColorStop(1, laserColor + ' 0)');

                ctx.fillStyle = laserGrad;
                ctx.fillRect(0, scanLineY - 12, width, 24);

                ctx.beginPath();
                ctx.moveTo(0, scanLineY);
                ctx.lineTo(width, scanLineY);
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1.8;
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(render3DScene);
        };

        render3DScene();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [rotationY, garmentColor, garmentSilhouette, isScanning, renderMode, lightingMode, zoomLevel, numHeight, numBust, numWaist, numHips, bodyShape]);

    return (
        <div className="relative w-full aspect-[3/4] max-h-[580px] bg-[#0A0908] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(212,175,55,0.25)] flex flex-col justify-between p-4 sm:p-5 select-none">

            {/* Top HUD Badges */}
            <div className="flex items-center justify-between z-20 flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-[#141210]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/60 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5D77F] animate-pulse" />
                    <span className="text-[10px] font-cinzel font-black text-[#F5D77F] tracking-[0.2em] uppercase">
                        3D VOLUMETRIC AVATAR • {fitScore}% FIT MATCH
                    </span>
                </div>

                {/* Render Mode & Laser Toggles */}
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setRenderMode(renderMode === 'couture' ? 'heatmap' : renderMode === 'heatmap' ? 'wireframe' : 'couture')}
                        className={`px-3 py-1 rounded-full text-[9.5px] font-cinzel font-black tracking-wider transition-all border cursor-pointer ${
                            renderMode === 'heatmap'
                                ? 'bg-emerald-500 text-black border-emerald-400 shadow-md'
                                : renderMode === 'wireframe'
                                    ? 'bg-sky-500 text-black border-sky-400 shadow-md'
                                    : 'bg-white/10 text-[#F5D77F] border-[#D4AF37]/60 hover:bg-white/20'
                        }`}
                        title="Toggle Couture / Fabric Stress Heatmap / Wireframe"
                    >
                        {renderMode === 'heatmap' ? '🔥 TENSION HEATMAP' : renderMode === 'wireframe' ? '⚡ 3D WIREFRAME' : '✦ COUTURE RENDER'}
                    </button>

                    <button
                        onClick={() => setIsScanning(!isScanning)}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-cinzel font-bold transition-all border cursor-pointer ${
                            isScanning
                                ? 'bg-[#D4AF37] text-[#141210] border-[#F5D77F]'
                                : 'bg-black/60 text-white/60 border-white/20'
                        }`}
                    >
                        {isScanning ? 'LASER ON' : 'PAUSED'}
                    </button>
                </div>
            </div>

            {/* Heatmap Legend (shown only when in heatmap mode) */}
            {renderMode === 'heatmap' && (
                <div className="absolute top-16 left-5 z-20 bg-black/90 backdrop-blur-md p-2.5 rounded-xl border border-emerald-500/50 text-[9px] font-cinzel space-y-1 shadow-xl">
                    <div className="font-bold text-white uppercase tracking-wider">Fabric Stress Matrix</div>
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Optimal Fit (98% Ease)</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-300 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-amber-300" />
                        <span>Contoured Drape</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-400 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>Movement Flare Ease</span>
                    </div>
                </div>
            )}

            {/* Main Interactive 3D Canvas */}
            <div
                className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                title="Drag horizontally to rotate avatar 360°"
            >
                <canvas ref={canvasRef} width={440} height={540} className="w-full h-full object-contain" />
            </div>

            {/* Garment Image Mini Card Preview */}
            {garmentImage && (
                <div className="absolute right-5 top-16 w-24 sm:w-28 h-32 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-black/90 backdrop-blur-md shadow-2xl p-1 z-20 group">
                    <img src={garmentImage} alt="" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute bottom-1 left-1 right-1 bg-black/95 text-center text-[8.5px] font-cinzel font-black text-[#F5D77F] rounded py-0.5 shadow">
                        {garmentColor.name}
                    </div>
                </div>
            )}

            {/* Bottom 360° Drag & Turntable Control Panel */}
            <div className="relative z-20 bg-[#141210]/95 backdrop-blur-xl p-3.5 rounded-2xl border border-[#D4AF37]/40 space-y-2.5 shadow-2xl">
                <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-[#F5D77F] font-cinzel font-bold text-[10.5px]">
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>360° Turntable</span>
                        </span>

                        <button
                            onClick={() => setIsAutoSpin(!isAutoSpin)}
                            className={`px-2 py-0.5 rounded-full text-[9px] font-cinzel font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                isAutoSpin ? 'bg-[#D4AF37] text-[#141210]' : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            {isAutoSpin ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                            <span>{isAutoSpin ? 'PAUSE' : 'AUTO-SPIN'}</span>
                        </button>
                    </div>

                    {/* Camera Angle Presets */}
                    <div className="flex items-center gap-1">
                        {[
                            { key: 'front', label: 'FRONT' },
                            { key: 'runway', label: '3/4 RUNWAY' },
                            { key: 'side', label: 'SIDE' },
                            { key: 'back', label: 'BACK' }
                        ].map(p => (
                            <button
                                key={p.key}
                                onClick={() => handleSetPose(p.key)}
                                className={`px-2 py-0.5 rounded text-[8.5px] font-cinzel font-black tracking-wider transition-all cursor-pointer ${
                                    viewPose === p.key
                                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#141210] shadow'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {showControls && (
                    <div className="flex items-center gap-3 pt-1">
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={rotationY}
                            onChange={(e) => {
                                setIsAutoSpin(false);
                                setRotationY(Number(e.target.value));
                            }}
                            className="flex-1 accent-[#D4AF37] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                        <button
                            onClick={() => { setRotationY(0); setViewPose('front'); setIsAutoSpin(false); }}
                            className="p-1.5 bg-white/10 rounded-lg text-gray-300 hover:text-[#D4AF37] cursor-pointer"
                            title="Reset View"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ThreeDBodyAvatar;
