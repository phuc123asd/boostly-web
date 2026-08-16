import React from 'react';
import ModalWrapper from './ModalWrapper';
import { ZALO_PHONE, ZALO_LINK, SUPPORT_EMAIL } from '../../data/servicesData';
import { MessageSquare, Mail, PhoneCall, ExternalLink } from 'lucide-react';

export default function ContactModal({ onClose }) {
  return (
    <ModalWrapper
      title="Liên hệ & Hỗ trợ"
      subtitle="Đội ngũ hỗ trợ và chuyên viên tư vấn chiến dịch sẵn sàng đồng hành 24/7."
      onClose={onClose}
    >
      <div className="space-y-3.5">
        {/* Zalo Card */}
        <a 
          href={ZALO_LINK} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="liquid-glass p-4 sm:p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4 hover:border-blue-400/40 transition-all group active:scale-98"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Zalo Hotline 24/7</div>
              <div className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors font-mono">
                {ZALO_PHONE}
              </div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-blue-400 transition-colors" />
        </a>

        {/* Email Card */}
        <a 
          href={`mailto:${SUPPORT_EMAIL}`} 
          className="liquid-glass p-4 sm:p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4 hover:border-purple-400/40 transition-all group active:scale-98"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Email hỗ trợ</div>
              <div className="text-sm sm:text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
                {SUPPORT_EMAIL}
              </div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-purple-400 transition-colors" />
        </a>
      </div>
    </ModalWrapper>
  );
}
