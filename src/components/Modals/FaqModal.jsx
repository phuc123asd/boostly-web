import React from 'react';
import ModalWrapper from './ModalWrapper';
import { HelpCircle, Clock, ShieldCheck, Calculator } from 'lucide-react';

export default function FaqModal({ onClose }) {
  const faqs = [
    {
      icon: Calculator,
      q: "Giá dịch vụ được tính như thế nào?",
      a: "Tổng chi phí = Số lượng đặt × Đơn giá của dịch vụ. Hệ thống tự động tính toán chính xác ngay khi bạn nhập số lượng trong mục Đặt dịch vụ."
    },
    {
      icon: Clock,
      q: "Thời gian bắt đầu và hoàn thành đơn hàng mất bao lâu?",
      a: "Hầu hết các dịch vụ sẽ bắt đầu chạy sau 5–30 phút kể từ khi xác nhận đơn qua Zalo. Thời gian hoàn tất phụ thuộc vào số lượng và nền tảng (thông thường từ vài giờ đến 24h để đảm bảo an toàn tài khoản)."
    },
    {
      icon: ShieldCheck,
      q: "Có cần cung cấp mật khẩu tài khoản không?",
      a: "Tuyệt đối KHÔNG. Chúng tôi không bao giờ yêu cầu mật khẩu. Bạn chỉ cần cung cấp link công khai của bài viết, trang cá nhân hoặc video cần tăng trưởng."
    },
    {
      icon: HelpCircle,
      q: "Làm thế nào để hoàn tất đơn hàng nhanh nhất?",
      a: "Chọn nền tảng, loại dịch vụ, dán link và số lượng, sau đó nhấn 'Mua qua Zalo'. Tư vấn viên tiếp nhận và hỗ trợ hoàn tất chỉ trong 1-3 phút."
    }
  ];

  return (
    <ModalWrapper
      title="Câu hỏi thường gặp"
      subtitle="Giải đáp mọi thắc mắc về quy trình thực hiện, thanh toán và bảo mật tài khoản."
      onClose={onClose}
    >
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const Icon = faq.icon;
          return (
            <div 
              key={index}
              className="liquid-glass p-3.5 sm:p-4 rounded-2xl border border-white/10 space-y-1.5 hover:border-white/20 transition-colors"
            >
              <div className="font-semibold text-xs sm:text-sm text-white flex items-center gap-2">
                <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{faq.q}</span>
              </div>
              <p className="text-white/65 text-xs pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          );
        })}
      </div>
    </ModalWrapper>
  );
}
