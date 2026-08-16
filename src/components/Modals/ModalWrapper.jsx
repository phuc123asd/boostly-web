import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function ModalWrapper({ title, subtitle, onClose, children }) {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="liquid-glass-modal w-full max-w-2xl max-h-[90dvh] sm:rounded-3xl rounded-t-[28px] p-5 sm:p-7 relative overflow-hidden flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/15 animate-modal-scale pb-safe"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-blue-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Mobile Drag Indicator Bar */}
        <div className="w-12 h-1 rounded-full bg-white/25 mx-auto mb-3 sm:hidden relative z-10" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-3.5 sm:pb-4 border-b border-white/10 flex-shrink-0 relative z-10">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-xs text-white/60 mt-0.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-2 sm:p-2.5 rounded-full liquid-glass transition-all hover:scale-105 active:scale-95 flex-shrink-0 border border-white/10 hover:border-white/30"
            aria-label="Đóng"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="pt-3.5 sm:pt-4 overflow-y-auto custom-scrollbar flex-1 min-h-0 pr-1 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
