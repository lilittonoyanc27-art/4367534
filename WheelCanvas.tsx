import React, { useEffect, useRef, useState, useCallback } from 'react';
import { WheelSector, WHEEL_SECTORS } from './data.ts';
import { playWheelTick } from './sound.ts';

interface WheelCanvasProps {
  onSectorSelected: (sector: WheelSector) => void;
  disabled?: boolean;
}

export const WheelCanvas: React.FC<WheelCanvasProps> = ({ onSectorSelected, disabled = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSector, setCurrentSector] = useState<WheelSector | null>(null);

  // Wheel state refs for animation
  const angleRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTickIndexRef = useRef<number>(-1);

  const numSectors = WHEEL_SECTORS.length;
  const arcSize = (2 * Math.PI) / numSectors;

  // Draw wheel on canvas
  const drawWheel = useCallback((rotationAngle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 22;

    ctx.clearRect(0, 0, width, height);

    // Save context for rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationAngle);

    // 1. Draw outer shadow/glow
    ctx.beginPath();
    ctx.arc(0, 0, radius + 12, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    // 2. Outer rim border (gold / metallic trim)
    ctx.beginPath();
    ctx.arc(0, 0, radius + 8, 0, 2 * Math.PI);
    ctx.strokeStyle = '#d97706'; // Amber-600
    ctx.lineWidth = 14;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius + 2, 0, 2 * Math.PI);
    ctx.strokeStyle = '#fbbf24'; // Amber-400
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3. Draw Sectors
    for (let i = 0; i < numSectors; i++) {
      const sector = WHEEL_SECTORS[i];
      const startAngle = i * arcSize;
      const endAngle = startAngle + arcSize;

      // Slice
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = sector.color;
      ctx.fill();

      // Hairline sector divider
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sector Text & Label
      ctx.save();
      const textAngle = startAngle + arcSize / 2;
      ctx.rotate(textAngle);

      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = sector.textColor;

      // Primary label (e.g. "500", "ԲԱՆԿՐՈՏ", "+", "ՄՐՑԱՆԱԿ")
      const isBankruptOrPrize = sector.type === 'bankrupt' || sector.type === 'prize' || sector.type === 'chance';
      ctx.font = isBankruptOrPrize
        ? 'bold 15px "Outfit", sans-serif'
        : 'bold 22px "Outfit", sans-serif';

      ctx.fillText(sector.label, radius - 24, 0);

      // Sublabel if any
      if (sector.sublabel) {
        ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = sector.type === 'bankrupt' ? '#fca5a5' : 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(sector.sublabel, radius - 24, 16);
      }

      ctx.restore();
    }

    // 4. Pins around the rim
    for (let i = 0; i < numSectors; i++) {
      const pinAngle = i * arcSize;
      const pinX = (radius + 8) * Math.cos(pinAngle);
      const pinY = (radius + 8) * Math.sin(pinAngle);

      ctx.beginPath();
      ctx.arc(pinX, pinY, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 5. Center Hub (Classic Soccer & Pole Chudes style)
    ctx.restore(); // restore origin to center

    ctx.save();
    ctx.translate(centerX, centerY);

    // Hub outer shadow
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fill();

    // Hub gradient body
    const hubGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 42);
    hubGrad.addColorStop(0, '#fef08a');
    hubGrad.addColorStop(0.7, '#f59e0b');
    hubGrad.addColorStop(1, '#b45309');
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, 2 * Math.PI);
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Soccer ball icon / emblem inside hub
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚽', 0, 1);

    ctx.restore();

    // 6. Pointer at top (12 o'clock pointer pointing down)
    ctx.save();
    ctx.translate(centerX, 10);
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;

    ctx.beginPath();
    ctx.moveTo(-16, 0);
    ctx.lineTo(16, 0);
    ctx.lineTo(0, 32);
    ctx.closePath();
    ctx.fillStyle = '#ef4444'; // Red pointer
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Pointer pin dot
    ctx.beginPath();
    ctx.arc(0, 4, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.restore();
  }, [arcSize, numSectors]);

  // Determine which sector is at top pointer (12 o'clock, which is -Math.PI / 2 or 3*Math.PI/2)
  const getSectorAtAngle = useCallback((angle: number): WheelSector => {
    // Normalise angle to [0, 2*PI)
    const normalized = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    // Pointer is at 12 o'clock = 3*PI/2 (or 270 deg)
    const pointerAngle = (3 * Math.PI) / 2;
    const relativeAngle = (pointerAngle - normalized + 2 * Math.PI) % (2 * Math.PI);
    const sectorIndex = Math.floor(relativeAngle / arcSize) % numSectors;
    return WHEEL_SECTORS[sectorIndex];
  }, [arcSize, numSectors]);

  // Initial render
  useEffect(() => {
    drawWheel(angleRef.current);
  }, [drawWheel]);

  // Spin method with smooth decelerating physics
  const spin = () => {
    if (isSpinning || disabled) return;

    setIsSpinning(true);
    setCurrentSector(null);

    // Random total spins: between 4.5 and 7 full rotations plus random angle
    const extraRotations = 4 + Math.random() * 3;
    const totalRotationAngle = extraRotations * 2 * Math.PI + Math.random() * 2 * Math.PI;

    const startAngle = angleRef.current;
    const targetAngle = startAngle + totalRotationAngle;
    const duration = 4200; // ms
    const startTime = performance.now();
    lastTickIndexRef.current = -1;

    // Quartic ease-out function
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      const currentAngle = startAngle + (targetAngle - startAngle) * easedProgress;
      angleRef.current = currentAngle;
      drawWheel(currentAngle);

      // Check pin tick
      const normalized = (currentAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const pinIndex = Math.floor(normalized / arcSize);
      if (pinIndex !== lastTickIndexRef.current) {
        lastTickIndexRef.current = pinIndex;
        // Pitch variation
        playWheelTick(0.85 + Math.random() * 0.3);
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const landed = getSectorAtAngle(targetAngle);
        setCurrentSector(landed);
        onSectorSelected(landed);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] select-none">
        <canvas
          ref={canvasRef}
          width={380}
          height={380}
          className="w-full h-full cursor-pointer transition-transform duration-200 active:scale-[0.99]"
          onClick={spin}
          title="Սեղմեք թմբուկի վրա՝ այն պտտելու համար"
        />
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <button
          onClick={spin}
          disabled={isSpinning || disabled}
          className={`px-8 py-3 rounded-xl font-bold text-base uppercase tracking-wider transition-all duration-200 shadow-lg active:scale-95 ${
            isSpinning || disabled
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50 hover:shadow-emerald-600/30'
          }`}
        >
          {isSpinning ? 'Թմբուկը պտտվում է...' : 'Պտտել թմբուկը (Крутить барабан)'}
        </button>

        {currentSector && !isSpinning && (
          <div className="text-xs text-slate-400 font-medium">
            Սեկտոր՝ <span className="text-emerald-400 font-bold">{currentSector.label}</span> {currentSector.sublabel ? `(${currentSector.sublabel})` : ''}
          </div>
        )}
      </div>
    </div>
  );
};
