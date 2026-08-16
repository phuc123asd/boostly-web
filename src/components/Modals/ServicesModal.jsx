import React from 'react';
import ModalWrapper from './ModalWrapper';
import { SERVICES, formatVND } from '../../data/servicesData';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesModal({ onClose, onSelectService }) {
  return (
    <ModalWrapper
      title="Dịch vụ Marketing"
      subtitle="Các giải pháp tăng trưởng tương tác mạng xã hội đa nền tảng chất lượng cao."
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {Object.entries(SERVICES).map(([platformKey, list]) => (
            <div key={platformKey} className="liquid-glass p-4 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  {platformKey}
                </span>
                <span className="text-[10px] text-white/40 font-mono">{list.length} dịch vụ</span>
              </div>
              <div className="space-y-1.5">
                {list.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelectService(platformKey, item)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 active:bg-white/15 cursor-pointer text-xs text-white/85 hover:text-white transition-all group border border-transparent hover:border-white/10"
                  >
                    <span className="font-medium text-xs sm:text-sm">{item.name}</span>
                    <span className="text-emerald-400 font-mono text-[11px] sm:text-xs group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      {formatVND(item.sellingPrice)}/{item.unit}
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400/80" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
}
