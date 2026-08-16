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
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="liquid-glass-modal w-full max-w-2xl max-h-[88dvh] sm:rounded-3xl rounded-t-[28px] p-5 sm:p-7 relative overflow-hidden flex flex-col shadow-2xl animate-modal-scale pb-safe"
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="w-12 h-1 rounded-full bg-white/20 mx-auto mb-3 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-3.5 sm:pb-4 border-b border-white/10 flex-shrink-0">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-xs text-white/55 mt-0.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-2 sm:p-2.5 rounded-full liquid-glass transition-all hover:scale-105 active:scale-95 flex-shrink-0"
            aria-label="Đóng"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="pt-3.5 sm:pt-4 overflow-y-auto custom-scrollbar flex-1 min-h-0 pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}
