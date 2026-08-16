import React, { useState } from 'react';
import { ChevronRight, X, Menu } from 'lucide-react';

export default function Navbar({ activeModal, setActiveModal, onOpenOrder }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dịch vụ', key: 'services' },
    { label: 'Bảng giá', key: 'pricing' },
    { label: 'Đặt dịch vụ', key: 'order' },
    { label: 'Hỏi đáp', key: 'faq' },
    { label: 'Liên hệ', key: 'contact' },
  ];

  const handleNavClick = (key) => {
    if (key === 'order') {
      onOpenOrder();
    } else {
      setActiveModal(key);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-3.5 sm:py-5 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <div 
          onClick={() => setActiveModal(null)}
          className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 cursor-pointer group transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-xl liquid-glass flex items-center justify-center p-1.5 transition-all group-hover:scale-105 group-hover:border-white/30 shadow-md">
            <svg viewBox="0 0 256 256" className="w-full h-full fill-white">
              <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-[0.2em] text-white uppercase font-mono">BOOSTLY</span>
            <span className="text-[8px] sm:text-[9px] text-white/60 tracking-wider font-medium -mt-0.5">Social Media Growth</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex pointer-events-auto items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass shadow-2xl">
          {navItems.map((item) => (
            <button 
              key={item.key}
              onClick={() => handleNavClick(item.key)} 
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                activeModal === item.key 
                  ? 'text-white bg-white/20 shadow-inner' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block pointer-events-auto">
          <button
            onClick={onOpenOrder}
            className="liquid-glass px-5 py-2.5 rounded-full flex items-center gap-2.5 text-white text-xs font-semibold hover:bg-white/10 hover:border-white/25 transition-all active:scale-95 shadow-lg group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft"></span>
            <span>Tư vấn ngay</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden pointer-events-auto liquid-glass p-2.5 sm:p-3 rounded-2xl text-white active:scale-90 transition-transform flex items-center justify-center"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </nav>

      {/* Mobile Fullscreen Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#09090c]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-fade-in pb-safe pt-safe">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl liquid-glass flex items-center justify-center p-1.5">
                <svg viewBox="0 0 256 256" className="w-full h-full fill-white">
                  <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
                </svg>
              </div>
              <span className="font-extrabold text-base tracking-[0.2em] uppercase font-mono">BOOSTLY</span>
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="liquid-glass p-3 rounded-2xl text-white transition-transform duration-300 hover:rotate-90 active:scale-90"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <div className="flex flex-col items-center justify-center gap-5 my-auto py-6">
            {navItems.map((item, idx) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className="text-2xl sm:text-3xl text-white/90 font-semibold hover:text-white transition-all transform hover:scale-105 active:scale-95 py-2 px-6 rounded-2xl hover:bg-white/5"
                style={{
                  animation: `slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards ${60 + idx * 40}ms`
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Bottom Action */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="liquid-glass w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 text-white font-bold text-sm bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-white/20 active:scale-98 transition-all shadow-xl"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-soft"></span>
            <span>Đặt dịch vụ ngay</span>
          </button>
        </div>
      )}
    </>
  );
}
