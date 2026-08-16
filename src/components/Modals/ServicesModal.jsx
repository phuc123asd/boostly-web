import React from 'react';
import ModalWrapper from './ModalWrapper';
import PlatformIcon from '../PlatformIcon';
import { SERVICES, PLATFORMS, formatVND } from '../../data/servicesData';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function ServicesModal({ onClose, onSelectService }) {
  return (
    <ModalWrapper
      title="Dịch Vụ Tăng Trưởng"
      subtitle="Giải pháp tiếp thị và kích hoạt tương tác đa kênh tự động, chuẩn xác và an toàn."
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {Object.entries(SERVICES).map(([platformKey, list]) => {
            const platMeta = PLATFORMS.find(p => p.id === platformKey) || { name: platformKey, color: '#fff' };
            return (
              <div key={platformKey} className="rounded-2xl p-4 border border-white/10 bg-white/[0.03] space-y-3 shadow-lg hover:border-white/20 transition-all">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                  <span className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                    <div 
                      className="w-5 h-5 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: platMeta.color }}
                    >
                      <PlatformIcon platform={platformKey} className="w-3 h-3 text-white" />
                    </div>
                    {platMeta.name}
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">{list.length} gói</span>
                </div>
                <div className="space-y-1.5">
                  {list.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => onSelectService(platformKey, item)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] active:scale-98 cursor-pointer text-xs text-white/90 hover:text-white transition-all group border border-white/5 hover:border-white/15"
                    >
                      <span className="font-semibold text-xs sm:text-sm">{item.name}</span>
                      <span className="text-emerald-400 font-mono text-[11px] sm:text-xs group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        {formatVND(item.sellingPrice)}/{item.unit}
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-400/70" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ModalWrapper>
  );
}
