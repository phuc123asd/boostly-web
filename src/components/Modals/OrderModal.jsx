import React, { useState, useMemo } from 'react';
import ModalWrapper from './ModalWrapper';
import { SERVICES, formatVND, ZALO_LINK, ZALO_PHONE, PLATFORMS } from '../../data/servicesData';
import { MessageSquare, Copy, Check, ExternalLink, ArrowLeft, AlertCircle } from 'lucide-react';

export default function OrderModal({
  onClose,
  orderPlatform,
  setOrderPlatform,
  orderServiceId,
  setOrderServiceId,
  targetUrl,
  setTargetUrl,
  orderQuantity,
  setOrderQuantity,
  zaloOrderReady,
  setZaloOrderReady
}) {
  const [formError, setFormError] = useState('');
  const [copied, setCopied] = useState(false);

  const availableServices = useMemo(() => {
    return SERVICES[orderPlatform] || [];
  }, [orderPlatform]);

  const currentSelectedService = useMemo(() => {
    return availableServices.find(s => s.id === orderServiceId) || availableServices[0] || SERVICES.facebook[0];
  }, [availableServices, orderServiceId]);

  const calculatedTotal = useMemo(() => {
    if (!currentSelectedService) return 0;
    return (orderQuantity || 0) * currentSelectedService.sellingPrice;
  }, [orderQuantity, currentSelectedService]);

  const zaloMessageText = useMemo(() => {
    return `Xin chào, tôi muốn đặt dịch vụ:\n\n• Nền tảng: ${orderPlatform.toUpperCase()}\n• Dịch vụ: ${currentSelectedService?.name || ''}\n• Link mục tiêu: ${targetUrl}\n• Số lượng: ${(orderQuantity || 0).toLocaleString('vi-VN')}\n• Đơn giá: ${formatVND(currentSelectedService?.sellingPrice || 0)}\n• Tổng chi phí: ${formatVND(calculatedTotal)}`;
  }, [orderPlatform, currentSelectedService, targetUrl, orderQuantity, calculatedTotal]);

  const handleProceedToZalo = (e) => {
    e.preventDefault();
    if (!targetUrl.trim()) {
      setFormError('Vui lòng nhập link bài viết / kênh mục tiêu.');
      return;
    }
    if (!orderQuantity || orderQuantity <= 0) {
      setFormError('Số lượng phải lớn hơn 0.');
      return;
    }

    setFormError('');
    setZaloOrderReady(true);
    window.open(ZALO_LINK, "_blank");
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(zaloMessageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const quantityPresets = [500, 1000, 2000, 5000, 10000];

  return (
    <ModalWrapper
      title={zaloOrderReady ? 'Thông tin dịch vụ đã sẵn sàng' : 'Đặt dịch vụ'}
      subtitle={
        zaloOrderReady 
          ? 'Gửi thông tin này qua Zalo để được tư vấn viên kích hoạt tức thì.' 
          : 'Tính giá tự động và chuyển tiếp thông tin trực tiếp qua Zalo để xử lý ngay.'
      }
      onClose={onClose}
    >
      {zaloOrderReady ? (
        <div className="space-y-4">
          <div className="liquid-glass p-4 sm:p-5 rounded-2xl border border-white/10 space-y-2.5">
            <div className="text-[10px] uppercase text-white/50 tracking-wider font-semibold">Nội dung đơn hàng:</div>
            <pre className="whitespace-pre-wrap font-sans text-xs text-white/90 leading-relaxed bg-black/50 p-3.5 rounded-xl border border-white/10 select-all font-mono">
              {zaloMessageText}
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="liquid-glass p-3 rounded-xl border border-white/10">
              <span className="text-white/50 text-[10px] uppercase tracking-wider font-medium block">Đơn giá</span>
              <span className="text-white font-bold font-mono mt-0.5 block">{formatVND(currentSelectedService?.sellingPrice || 0)}</span>
            </div>
            <div className="liquid-glass p-3 rounded-xl border border-white/10">
              <span className="text-white/50 text-[10px] uppercase tracking-wider font-medium block">Tổng chi phí</span>
              <span className="text-emerald-400 font-bold font-mono mt-0.5 block">{formatVND(calculatedTotal)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={handleCopyMessage}
              className="w-full sm:w-1/2 py-3.5 rounded-xl liquid-glass text-xs font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 transition-all border border-white/15"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép thông tin'}</span>
            </button>

            <a
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Mở Zalo ({ZALO_PHONE})</span>
            </a>
          </div>

          <button
            onClick={() => setZaloOrderReady(false)}
            className="w-full text-center text-xs text-white/50 hover:text-white pt-1 pb-1 transition-colors font-medium flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Thay đổi thông tin đơn hàng</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleProceedToZalo} className="space-y-3.5">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-1">Nền tảng</label>
            <div className="grid grid-cols-4 gap-1.5">
              {PLATFORMS.map((plat) => (
                <button
                  type="button"
                  key={plat.id}
                  onClick={() => {
                    setOrderPlatform(plat.id);
                    const firstService = SERVICES[plat.id]?.[0];
                    if (firstService) setOrderServiceId(firstService.id);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize transition-all border text-center ${
                    orderPlatform === plat.id
                      ? 'bg-white text-black border-white shadow-md font-bold'
                      : 'liquid-glass text-white/70 border-white/10 hover:text-white'
                  }`}
                >
                  {plat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-1">Dịch vụ</label>
            <select
              value={orderServiceId}
              onChange={(e) => setOrderServiceId(e.target.value)}
              className="w-full bg-[#16161d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 cursor-pointer transition-colors"
            >
              {availableServices.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#16161d] text-white">
                  {s.name} ({formatVND(s.sellingPrice)}/{s.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-1">Link mục tiêu</label>
            <input
              type="url"
              required
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://facebook.com/... hoặc https://tiktok.com/@..."
              className="w-full bg-[#16161d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 placeholder:text-white/30 transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Số lượng ({currentSelectedService?.unit})
              </label>
              <span className="text-[10px] text-white/40 font-mono">Tối thiểu: 100</span>
            </div>
            
            <input
              type="number"
              min="100"
              step="100"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-[#16161d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/40 transition-colors"
            />

            {/* Quantity quick presets */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
              {quantityPresets.map((qty) => (
                <button
                  type="button"
                  key={qty}
                  onClick={() => setOrderQuantity(qty)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium transition-all ${
                    orderQuantity === qty
                      ? 'bg-blue-600/40 text-blue-300 border border-blue-400/40'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  +{qty.toLocaleString('vi-VN')}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Summary Card */}
          <div className="liquid-glass p-3.5 rounded-xl border border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between text-white/70">
              <span>Dịch vụ:</span>
              <span className="text-white font-semibold">{currentSelectedService?.name}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Đơn giá:</span>
              <span className="font-mono">{formatVND(currentSelectedService?.sellingPrice || 0)}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Số lượng:</span>
              <span className="font-mono">{(orderQuantity || 0).toLocaleString('vi-VN')}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold text-emerald-400">
              <span>Tổng chi phí:</span>
              <span className="font-mono">{formatVND(calculatedTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Mua qua Zalo ({ZALO_PHONE})</span>
          </button>
        </form>
      )}
    </ModalWrapper>
  );
}
