import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Sparkles, Sliders, RefreshCw, Zap, Camera, ShieldCheck } from 'lucide-react';

export const ThreeDBodyAvatar = ({
    height = '168 cm',
    bust = '34B',
    waist = '27 in',
    hips = '36 in',
    bodyShape = 'Hourglass',
    garmentColor = { name: 'Champagne Gold', hex: '#C5A059' },
    garmentImage = null,
    fitScore = 98,
    showControls = true
}) => {
    const [rotationY, setRotationY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isScanning, setIsScanning] = useState(true);
    const [viewPose, setViewPose] = useState('front'); // 'front', 'side', 'runway'
    const canvasRef = useRef(null);

    // Camera preset pose handler
    const handleSetPose = (pose) => {
        setViewPose(pose);
        if (pose === 'front') setRotationY(0);
        if (pose === 'side') setRotationY(90);
        if (pose === 'runway') setRotationY(45);
    };

    // Handle 360 Drag rotation
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        setRotationY((prev) => (prev + deltaX * 0.8) % 360);
        setStartX(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Canvas 3D Mesh Renderer Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let scanLineY = 40;
        let scanDirection = 1.2;

        const render3DMesh = () => {
            const width = canvas.width;
            const heightPx = canvas.height;

            ctx.clearRect(0, 0, width, heightPx);

            // Deep Studio Ambient Background Gradient
            const bgGrad = ctx.createRadialGradient(width / 2, heightPx / 2, 20, width / 2, heightPx / 2, width);
            bgGrad.addColorStop(0, '#161514');
            bgGrad.addColorStop(1, '#0A0908');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, heightPx);

            // High-Fashion 3D Floor Grid Lines
            ctx.strokeStyle = 'rgba(197, 160, 89, 0.15)';
            ctx.lineWidth = 1;
            const centerY = heightPx * 0.84;

            for (let i = -12; i <= 12; i++) {
                const xStart = width / 2 + i * 14;
                ctx.beginPath();
                ctx.moveTo(xStart, centerY);
                ctx.lineTo(width / 2 + i * 48, heightPx);
                ctx.stroke();
            }

            for (let j = 0; j < 7; j++) {
                const y = centerY + j * 16;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Convert rotation angle to radians
            const rad = (rotationY * Math.PI) / 180;
            const cosR = Math.cos(rad);
            const sinR = Math.sin(rad);

            const originX = width / 2;
            const originY = heightPx / 2 - 10;

            const hexColor = garmentColor?.hex || '#C5A059';

            // Key Body Landmark Coordinates
            const headY = originY - 170;
            const shoulderY = originY - 115;
            const bustY = originY - 65;
            const waistY = originY - 15;
            const hipY = originY + 45;
            const kneeY = originY + 125;
            const ankleY = originY + 195;

            // Compute 3D Projected Rotated Points
            const lsX = originX + (-52 * cosR);
            const rsX = originX + (52 * cosR);
            const lwX = originX + (-34 * cosR);
            const rwX = originX + (34 * cosR);
            const lhX = originX + (-48 * cosR);
            const rhX = originX + (48 * cosR);
            const lkX = originX + (-28 * cosR + 15 * sinR);
            const rkX = originX + (28 * cosR - 15 * sinR);

            // 1. Draw Volumetric 3D Mannequin Silhouette Body
            ctx.beginPath();
            ctx.moveTo(lsX, shoulderY);
            ctx.bezierCurveTo(lsX - 12, bustY, lwX - 12, waistY - 10, lwX, waistY);
            ctx.bezierCurveTo(lhX - 14, hipY - 10, lhX, hipY, lhX, hipY);
            ctx.lineTo(lkX, kneeY);
            ctx.lineTo(originX - 22 * cosR, ankleY);
            ctx.lineTo(originX + 22 * cosR, ankleY);
            ctx.lineTo(rkX, kneeY);
            ctx.lineTo(rhX, hipY);
            ctx.bezierCurveTo(rhX + 14, hipY - 10, rwX + 12, waistY - 10, rwX, waistY);
            ctx.bezierCurveTo(rwX + 12, bustY, rsX + 12, shoulderY, rsX, shoulderY);
            ctx.closePath();

            // Dynamic Metallic Shimmer Body Gradient
            const bodyGrad = ctx.createLinearGradient(0, headY, 0, ankleY);
            bodyGrad.addColorStop(0, hexColor + '33');
            bodyGrad.addColorStop(0.3, hexColor + '77');
            bodyGrad.addColorStop(0.7, hexColor + 'AA');
            bodyGrad.addColorStop(1, hexColor + '22');

            ctx.fillStyle = bodyGrad;
            ctx.fill();
            ctx.strokeStyle = hexColor;
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // 2. Render Mannequin Head & Neck
            ctx.beginPath();
            ctx.ellipse(originX, headY, 20, 26, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fill();

            // 3. Render 3D Wireframe Rings around Bust, Waist & Hips
            const rings = [
                { y: bustY, rx: 46 * Math.abs(cosR) + 20, label: `Bust: ${bust}` },
                { y: waistY, rx: 34 * Math.abs(cosR) + 16, label: `Waist: ${waist}` },
                { y: hipY, rx: 48 * Math.abs(cosR) + 22, label: `Hips: ${hips}` }
            ];

            rings.forEach(ring => {
                ctx.beginPath();
                ctx.ellipse(originX, ring.y, ring.rx, 10, 0, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(197, 160, 89, 0.7)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            });

            // 4. Hologram Laser Scanner Line Sweep
            if (isScanning) {
                scanLineY += scanDirection;
                if (scanLineY > heightPx * 0.86 || scanLineY < 40) {
                    scanDirection *= -1;
                }

                const laserGrad = ctx.createLinearGradient(0, scanLineY - 12, 0, scanLineY + 12);
                laserGrad.addColorStop(0, 'rgba(197, 160, 89, 0)');
                laserGrad.addColorStop(0.5, 'rgba(197, 160, 89, 0.9)');
                laserGrad.addColorStop(1, 'rgba(197, 160, 89, 0)');

                ctx.fillStyle = laserGrad;
                ctx.fillRect(0, scanLineY - 10, width, 20);

                ctx.beginPath();
                ctx.moveTo(0, scanLineY);
                ctx.lineTo(width, scanLineY);
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(render3DMesh);
        };

        render3DMesh();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [rotationY, garmentColor, isScanning, bust, waist, hips]);

    return (
        <div className="relative w-full aspect-[3/4] max-h-[560px] bg-[#0A0908] rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl flex flex-col justify-between p-4 select-none">

            {/* Top HUD Badges */}
            <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 bg-[#0F0F0F]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A059]/40">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase">
                        3D VOLUMETRIC MANNEQUIN • {fitScore}% FIT MATCH
                    </span>
                </div>

                <button
                    onClick={() => setIsScanning(!isScanning)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all border cursor-pointer ${isScanning
                            ? 'bg-[#C5A059] text-[#0F0F0F] border-[#C5A059]'
                            : 'bg-black/60 text-white/70 border-white/20'
                        }`}
                >
                    {isScanning ? 'LASER SCAN ACTIVE' : 'PAUSE SCAN'}
                </button>
            </div>

            {/* Main Interactive 3D Canvas */}
            <div
                className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <canvas ref={canvasRef} width={420} height={520} className="w-full h-full object-contain" />
            </div>

            {/* Garment Image Overlay Preview */}
            {garmentImage && (
                <div className="absolute right-4 top-16 w-24 h-32 rounded-xl overflow-hidden border-2 border-[#C5A059] bg-black/90 backdrop-blur-md shadow-2xl p-1 z-10 group">
                    <img src={garmentImage} alt="" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute bottom-1 left-1 right-1 bg-black/95 text-center text-[9px] font-bold text-[#C5A059] rounded py-0.5">
                        {garmentColor.name}
                    </div>
                </div>
            )}

            {/* Pose Preset Switcher & 360 Degree Drag Control Ribbon */}
            <div className="relative z-10 bg-[#0F0F0F]/95 backdrop-blur-md p-3 rounded-xl border border-[#C5A059]/30 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-white">
                    <span className="flex items-center gap-1.5 text-[#C5A059] font-bold">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Drag to Rotate 360°</span>
                    </span>

                    {/* Camera Angle Presets */}
                    <div className="flex items-center gap-1">
                        {[
                            { key: 'front', label: 'FRONT' },
                            { key: 'runway', label: '3/4 RUNWAY' },
                            { key: 'side', label: 'SIDE' }
                        ].map(p => (
                            <button
                                key={p.key}
                                onClick={() => handleSetPose(p.key)}
                                className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider transition-all cursor-pointer ${viewPose === p.key
                                        ? 'bg-[#C5A059] text-[#0F0F0F]'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {showControls && (
                    <div className="flex items-center gap-2 pt-1">
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={rotationY}
                            onChange={(e) => setRotationY(Number(e.target.value))}
                            className="flex-1 accent-[#C5A059] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                        <button
                            onClick={() => { setRotationY(0); setViewPose('front'); }}
                            className="p-1.5 bg-white/10 rounded-lg text-gray-300 hover:text-[#C5A059] cursor-pointer"
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
