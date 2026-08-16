import React from 'react';
import ModalWrapper from './ModalWrapper';
import { ZALO_PHONE, ZALO_LINK, SUPPORT_EMAIL } from '../../data/servicesData';
import { MessageSquare, Mail, ExternalLink } from 'lucide-react';

export default function ContactModal({ onClose }) {
  return (
    <ModalWrapper
      title="Liên Hệ & Hỗ Trợ 24/7"
      subtitle="Đội ngũ hỗ trợ và chuyên viên tư vấn chiến dịch sẵn sàng đồng hành cùng bạn."
      onClose={onClose}
    >
      <div className="space-y-3.5">
        {/* Zalo Card */}
        <a 
          href={ZALO_LINK} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] flex items-center justify-between gap-4 hover:border-blue-500/50 transition-all group active:scale-98 shadow-lg hover:shadow-[0_0_24px_rgba(59,130,246,0.15)]"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(59,130,246,0.3)]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Zalo Hotline Tư Vấn</div>
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
          className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] flex items-center justify-between gap-4 hover:border-purple-500/50 transition-all group active:scale-98 shadow-lg hover:shadow-[0_0_24px_rgba(168,85,247,0.15)]"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Email Hỗ Trợ Trực Tiếp</div>
              <div className="text-sm sm:text-base font-semibold text-white group-hover:text-purple-300 transition-colors font-mono">
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
