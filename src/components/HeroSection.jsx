import React, { useEffect, useRef } from 'react';
import { BG_IMAGE_1, FRONT_VIDEO, OVERLAY_IMAGE } from '../data/servicesData';
import { Sparkles, Activity } from 'lucide-react';

export default function HeroSection({ onOpenOrder }) {
  const gridSvgRef = useRef(null);
  const videoMaskRef = useRef(null);

  const mousePosRef = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400 
  });
  const lerpPosRef = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400 
  });
  const gridOffsetRef = useRef({ x: 0, y: 0 });
  const isInteractingRef = useRef(false);
  const idleAngleRef = useRef(0);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const radius = 280;
    canvas.width = radius * 2;
    canvas.height = radius * 2;
    const ctx = canvas.getContext('2d');
    let maskDataUrl = '';

    if (ctx) {
      const grad = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.45, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.7)');
      grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.3)');
      grad.addColorStop(0.92, 'rgba(255, 255, 255, 0.08)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(radius, radius, radius, 0, Math.PI * 2);
      ctx.fill();

      try {
        maskDataUrl = canvas.toDataURL();
      } catch (err) {
        console.warn('Canvas mask fallback:', err);
      }
    }

    const handleMouseMove = (e) => {
      isInteractingRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        isInteractingRef.current = true;
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        isInteractingRef.current = true;
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    let animationFrameId;

    const renderLoop = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Ambient movement if no user interaction on mobile/idle
      if (!isInteractingRef.current) {
        idleAngleRef.current += 0.015;
        const orbitRadiusX = Math.min(centerX * 0.4, 140);
        const orbitRadiusY = Math.min(centerY * 0.35, 100);
        mousePosRef.current = {
          x: centerX + Math.cos(idleAngleRef.current) * orbitRadiusX,
          y: centerY + Math.sin(idleAngleRef.current * 0.8) * orbitRadiusY
        };
      }

      lerpPosRef.current.x += (mousePosRef.current.x - lerpPosRef.current.x) * 0.08;
      lerpPosRef.current.y += (mousePosRef.current.y - lerpPosRef.current.y) * 0.08;

      const targetGridX = ((mousePosRef.current.x - centerX) / (centerX || 1)) * 14;
      const targetGridY = ((mousePosRef.current.y - centerY) / (centerY || 1)) * 14;

      gridOffsetRef.current.x += (targetGridX - gridOffsetRef.current.x) * 0.05;
      gridOffsetRef.current.y += (targetGridY - gridOffsetRef.current.y) * 0.05;

      if (gridSvgRef.current) {
        gridSvgRef.current.style.transform = `translate3d(${gridOffsetRef.current.x}px, ${gridOffsetRef.current.y}px, 0)`;
      }

      if (videoMaskRef.current && maskDataUrl) {
        const maskX = lerpPosRef.current.x - radius;
        const maskY = lerpPosRef.current.y - radius;

        videoMaskRef.current.style.webkitMaskImage = `url(${maskDataUrl})`;
        videoMaskRef.current.style.maskImage = `url(${maskDataUrl})`;
        videoMaskRef.current.style.webkitMaskPosition = `${maskX}px ${maskY}px`;
        videoMaskRef.current.style.maskPosition = `${maskX}px ${maskY}px`;
        videoMaskRef.current.style.webkitMaskRepeat = 'no-repeat';
        videoMaskRef.current.style.maskRepeat = 'no-repeat';
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#070709] flex flex-col items-center justify-center select-none">
      {/* Background Grid Pattern */}
      <div 
        ref={gridSvgRef}
        className="absolute inset-0 z-0 opacity-15 pointer-events-none transition-transform duration-75 ease-out scale-105"
      >
        <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGridPattern" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#64748b" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGridPattern)" />
        </svg>
      </div>

      {/* Background Graphic */}
      <div 
        className="absolute inset-0 z-10 bg-center bg-cover bg-no-repeat pointer-events-none opacity-85"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* Main Title Center */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none -mt-4 sm:-mt-6">
        <h1 className="font-instrument uppercase tracking-tight text-[3.8rem] xs:text-[4.8rem] sm:text-[7.5rem] md:text-[10.5rem] lg:text-[13.5rem] xl:text-[15.5rem] leading-[0.86] text-white select-none drop-shadow-2xl font-normal">
          BOOSTLY
        </h1>
        <div className="mt-3 sm:mt-5 flex flex-col items-center gap-1 sm:gap-1.5">
          <p className="text-[11px] xs:text-xs sm:text-sm md:text-base font-semibold text-white/90 tracking-[0.22em] sm:tracking-[0.25em] uppercase">
            Social Media Marketing
          </p>
          <p className="text-[9px] xs:text-[10px] sm:text-xs text-white/60 tracking-[0.18em] sm:tracking-[0.2em] uppercase font-medium">
            Facebook · TikTok · Instagram · YouTube
          </p>
        </div>
      </div>

      {/* Overlay Texture */}
      <img 
        src={OVERLAY_IMAGE} 
        alt="Depth Overlay" 
        className="absolute inset-0 z-25 w-full h-full object-cover pointer-events-none mix-blend-screen opacity-90"
      />

      {/* Front Video Mask */}
      <div 
        ref={videoMaskRef}
        className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
      >
        <video
          src={FRONT_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ clipPath: 'inset(35% 0 0 0)' }}
        />
      </div>

      {/* Mobile Floating CTA button */}
      <div className="absolute bottom-5 left-4 right-4 z-40 sm:hidden flex items-center justify-between gap-2.5 pb-safe">
        <button
          onClick={onOpenOrder}
          className="liquid-glass flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-xs bg-gradient-to-r from-blue-600/40 to-purple-600/40 border border-white/20 active:scale-95 shadow-2xl transition-all"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse-soft" />
          <span>Đặt Dịch Vụ Nhanh</span>
        </button>

        <div className="liquid-glass px-3.5 py-2.5 rounded-2xl flex items-center gap-2 flex-shrink-0">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-mono font-bold text-white">4+ Apps</span>
        </div>
      </div>
    </div>
  );
}
