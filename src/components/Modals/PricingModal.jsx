import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import PlatformIcon from '../PlatformIcon';
import { SERVICES, PLATFORMS, formatVND } from '../../data/servicesData';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingModal({ onClose, onSelectService }) {
  const [activeTab, setActiveTab] = useState('facebook');

  const currentPlatformObj = PLATFORMS.find(p => p.id === activeTab) || PLATFORMS[0];

  return (
    <ModalWrapper
      title="Bảng Giá Niêm Yết"
      subtitle="Bảng giá công khai minh bạch, tiết kiệm tối ưu so với giá thị trường."
      onClose={onClose}
    >
      <div className="space-y-4">
        {/* Platform Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-1">
          {PLATFORMS.map((plat) => {
            const isActive = activeTab === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => setActiveTab(plat.id)}
                className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95 border ${
                  isActive
                    ? 'bg-white/15 border-white/40 text-white shadow-[0_0_16px_rgba(255,255,255,0.1)]'
                    : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <PlatformIcon 
                  platform={plat.id} 
                  className="w-3.5 h-3.5" 
                  colored={isActive}
                />
                <span className="capitalize">{plat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Pricing Items Grid */}
        <div className="space-y-2.5">
          {SERVICES[activeTab]?.map((item) => {
            const marketAvg = (item.minPrice + item.maxPrice) / 2;
            const discountPercent = Math.round(((marketAvg - item.sellingPrice) / (marketAvg || 1)) * 100);

            return (
              <div 
                key={item.id} 
                className="group relative rounded-2xl p-4 sm:p-4.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/25 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:scale-105 transition-transform flex-shrink-0 mt-0.5 sm:mt-0">
                    <PlatformIcon platform={activeTab} className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white tracking-wide">{item.name}</span>
                      {discountPercent > 0 && (
                        <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded-md">
                          Tiết kiệm ~{discountPercent}%
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-white/45 mt-0.5 font-normal flex items-center gap-2">
                      <span>Giá thị trường: <span className="font-mono">{item.minPrice}–{item.maxPrice}đ</span>/{item.unit}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span className="text-white/40">Bảo hành đầy đủ</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-white/5 sm:border-t-0">
                  <div className="text-left sm:text-right">
                    <div className="text-sm sm:text-base font-black font-mono text-emerald-400">
                      {formatVND(item.sellingPrice)}
                      <span className="text-[10px] text-white/45 font-normal ml-0.5 font-sans">/{item.unit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(activeTab, item)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 hover:border-blue-400 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-md group/btn"
                  >
                    <span>Tính giá & Đặt</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Note */}
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-2 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Cam kết giữ giá niêm yết ổn định, không phát sinh chi phí ẩn.</span>
          </div>
          <div className="font-mono text-[10px] text-white/30 hidden sm:block">Boostly Guarantee</div>
        </div>
      </div>
    </ModalWrapper>
  );
}
