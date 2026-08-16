import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { SERVICES, formatVND } from '../../data/servicesData';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export default function PricingModal({ onClose, onSelectService }) {
  const [activeTab, setActiveTab] = useState('facebook');

  return (
    <ModalWrapper
      title="Bảng giá Niêm Yết"
      subtitle="Đơn giá minh bạch, linh hoạt theo từng mục tiêu chiến dịch tăng trưởng."
      onClose={onClose}
    >
      <div className="space-y-4">
        {/* Platform Tabs */}
        <div className="flex items-center gap-2 pb-1 overflow-x-auto no-scrollbar">
          {Object.keys(SERVICES).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 active:scale-95 ${
                activeTab === key 
                  ? 'bg-white text-black font-bold shadow-md' 
                  : 'liquid-glass text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Pricing Items */}
        <div className="space-y-2.5">
          {SERVICES[activeTab]?.map((item) => (
            <div 
              key={item.id} 
              className="liquid-glass p-3.5 sm:p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
            >
              <div>
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{item.name}</span>
                </div>
                <div className="text-[11px] text-white/45 mt-0.5 font-normal">
                  Giá thị trường: <span className="font-mono">{item.minPrice}–{item.maxPrice}đ</span>/{item.unit}
                </div>
              </div>
              
              <div className="text-right flex flex-col items-end flex-shrink-0">
                <div className="text-xs sm:text-sm font-bold font-mono text-emerald-400">
                  {formatVND(item.sellingPrice)}
                  <span className="text-[10px] text-white/40 font-normal">/{item.unit}</span>
                </div>
                <button
                  onClick={() => onSelectService(activeTab, item)}
                  className="mt-1 text-[11px] sm:text-xs text-blue-400 hover:text-blue-300 font-semibold hover:underline flex items-center gap-0.5 active:scale-95"
                >
                  <span>Chọn mua</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
}
