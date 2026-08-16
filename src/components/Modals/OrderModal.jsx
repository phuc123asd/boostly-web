import React, { useState, useMemo } from 'react';
import ModalWrapper from './ModalWrapper';
import PlatformIcon from '../PlatformIcon';
import { SERVICES, formatVND, ZALO_LINK, ZALO_PHONE, PLATFORMS } from '../../data/servicesData';
import { 
  MessageSquare, 
  Copy, 
  Check, 
  ArrowLeft, 
  AlertCircle, 
  Link2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Clock, 
  Zap
} from 'lucide-react';

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

  const selectedPlatformObj = useMemo(() => {
    return PLATFORMS.find(p => p.id === orderPlatform) || PLATFORMS[0];
  }, [orderPlatform]);

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

  const estimatedSavings = useMemo(() => {
    if (!currentSelectedService) return 0;
    const marketAvg = (currentSelectedService.minPrice + currentSelectedService.maxPrice) / 2;
    const diff = (marketAvg - currentSelectedService.sellingPrice) * (orderQuantity || 0);
    return diff > 0 ? diff : 0;
  }, [currentSelectedService, orderQuantity]);

  const zaloMessageText = useMemo(() => {
    return `Xin chào Boostly, tôi muốn đặt dịch vụ:\n\n• Nền tảng: ${orderPlatform.toUpperCase()}\n• Gói dịch vụ: ${currentSelectedService?.name || ''}\n• Link mục tiêu: ${targetUrl}\n• Số lượng: ${(orderQuantity || 0).toLocaleString('vi-VN')} ${currentSelectedService?.unit || ''}\n• Đơn giá: ${formatVND(currentSelectedService?.sellingPrice || 0)}/${currentSelectedService?.unit || ''}\n• Tổng chi phí: ${formatVND(calculatedTotal)}\n\nNhờ tư vấn viên kiểm tra và kích hoạt giúp tôi nhé!`;
  }, [orderPlatform, currentSelectedService, targetUrl, orderQuantity, calculatedTotal]);

  const handleProceedToZalo = (e) => {
    e.preventDefault();
    if (!targetUrl.trim()) {
      setFormError('Vui lòng nhập link bài viết hoặc tài khoản cần tăng trưởng.');
      return;
    }
    if (!orderQuantity || orderQuantity < 100) {
      setFormError('Số lượng tối thiểu là 100.');
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

  const handleAdjustQuantity = (delta) => {
    const nextVal = Math.max(100, (orderQuantity || 0) + delta);
    setOrderQuantity(nextVal);
  };

  const quantityPresets = [500, 1000, 2500, 5000, 10000, 20000];

  return (
    <ModalWrapper
      title={zaloOrderReady ? 'Xác Nhận Đơn Hàng' : 'Bảng Tính Giá & Đặt Dịch Vụ'}
      subtitle={
        zaloOrderReady 
          ? 'Sao chép thông tin hoặc mở Zalo để chuyên viên xử lý đơn tức thì.' 
          : 'Tự động tính chi phí thời gian thực theo số lượng và gói dịch vụ lựa chọn.'
      }
      onClose={onClose}
    >
      {zaloOrderReady ? (
        <div className="space-y-4">
          {/* Order Bill Card */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-black/60 to-black/80 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <PlatformIcon platform={orderPlatform} className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">{currentSelectedService?.name}</div>
                  <div className="text-[10px] text-emerald-400 font-mono font-medium">Trạng thái: Sẵn sàng gửi đơn</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase text-white/40 tracking-wider font-mono">Tổng thanh toán</div>
                <div className="text-base sm:text-lg font-black font-mono text-emerald-400 drop-shadow">
                  {formatVND(calculatedTotal)}
                </div>
              </div>
            </div>

            {/* Formatted Order Details */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase text-white/50 tracking-wider font-semibold">Nội dung chuyển tiếp Zalo:</div>
              <pre className="whitespace-pre-wrap font-mono text-xs text-white/90 leading-relaxed bg-[#0b0c10]/90 p-3.5 rounded-xl border border-white/10 select-all custom-scrollbar max-h-48 overflow-y-auto">
                {zaloMessageText}
              </pre>
            </div>

            {/* Quick Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[9px] uppercase tracking-wider text-white/40 font-medium">Số lượng</div>
                <div className="text-xs font-bold font-mono text-white mt-0.5">{(orderQuantity || 0).toLocaleString('vi-VN')}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[9px] uppercase tracking-wider text-white/40 font-medium">Đơn giá</div>
                <div className="text-xs font-bold font-mono text-white mt-0.5">{formatVND(currentSelectedService?.sellingPrice || 0)}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[9px] uppercase tracking-wider text-white/40 font-medium">Tiết kiệm</div>
                <div className="text-xs font-bold font-mono text-emerald-400 mt-0.5">
                  {estimatedSavings > 0 ? `~${formatVND(estimatedSavings)}` : 'Tối ưu'}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={handleCopyMessage}
              className="w-full sm:w-1/2 py-3.5 rounded-xl liquid-glass text-xs font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 transition-all border border-white/15 shadow-lg group"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Đã sao chép nội dung!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white/70 group-hover:text-white" />
                  <span>Sao chép thông tin đơn</span>
                </>
              )}
            </button>

            <a
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 border border-blue-400/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Gửi qua Zalo ({ZALO_PHONE})</span>
            </a>
          </div>

          <button
            onClick={() => setZaloOrderReady(false)}
            className="w-full text-center text-xs text-white/50 hover:text-white pt-1 transition-colors font-medium flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại chỉnh sửa số lượng / thông tin</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleProceedToZalo} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{formError}</span>
            </div>
          )}

          {/* 1. Platform Switcher Tabs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                1. Chọn nền tảng
              </label>
              <span className="text-[10px] text-white/40 font-mono">4 Mạng xã hội</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PLATFORMS.map((plat) => {
                const isActive = orderPlatform === plat.id;
                return (
                  <button
                    type="button"
                    key={plat.id}
                    onClick={() => {
                      setOrderPlatform(plat.id);
                      const firstService = SERVICES[plat.id]?.[0];
                      if (firstService) setOrderServiceId(firstService.id);
                    }}
                    className={`relative p-2.5 rounded-2xl flex items-center gap-2.5 transition-all active:scale-95 border ${
                      isActive
                        ? `bg-white/10 border-white/40 shadow-[0_0_16px_rgba(255,255,255,0.12)] text-white font-bold`
                        : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <div 
                      className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${
                        isActive ? 'scale-110' : ''
                      }`}
                      style={{
                        backgroundColor: isActive ? plat.color : 'rgba(255,255,255,0.06)'
                      }}
                    >
                      <PlatformIcon 
                        platform={plat.id} 
                        className="w-3.5 h-3.5 text-white" 
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold leading-tight">{plat.name}</div>
                      <div className="text-[9px] text-white/40 font-mono font-normal">
                        {SERVICES[plat.id]?.length || 0} gói
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Visual Service Selector Cards */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                2. Chọn gói dịch vụ
              </label>
              <span className="text-[10px] text-emerald-400/80 font-mono">Bảo hành an toàn</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableServices.map((service) => {
                const isSelected = service.id === (currentSelectedService?.id || orderServiceId);
                return (
                  <div
                    key={service.id}
                    onClick={() => setOrderServiceId(service.id)}
                    className={`p-3 rounded-2xl cursor-pointer border transition-all active:scale-98 flex items-center justify-between gap-2.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600/25 to-purple-600/25 border-blue-400/50 shadow-[0_0_16px_rgba(59,130,246,0.25)]'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? 'border-blue-400 bg-blue-500' : 'border-white/30'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{service.name}</div>
                        <div className="text-[10px] text-white/40 font-mono">
                          Thị trường: {service.minPrice}–{service.maxPrice}đ
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-extrabold font-mono text-emerald-400">
                        {formatVND(service.sellingPrice)}
                      </div>
                      <div className="text-[9px] text-white/40 font-mono uppercase">
                        /{service.unit}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Target Link Input */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1.5">
              3. Link bài viết / Kênh mục tiêu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <Link2 className="w-4 h-4" />
              </div>
              <input
                type="url"
                required
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder={selectedPlatformObj.placeholder}
                className="w-full bg-[#111116] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/40 transition-all font-mono"
              />
            </div>
          </div>

          {/* 4. Interactive Quantity Calculator (Slider + Stepper + Presets) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                4. Số lượng ({currentSelectedService?.unit || 'lượt'})
              </label>
              <div className="text-xs font-bold font-mono text-blue-400">
                {(orderQuantity || 0).toLocaleString('vi-VN')} <span className="text-white/40 text-[10px] font-normal">{currentSelectedService?.unit}</span>
              </div>
            </div>

            {/* Stepper + Input */}
            <div className="flex items-center gap-2 mb-2.5">
              <button
                type="button"
                onClick={() => handleAdjustQuantity(-500)}
                className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-white/70 hover:text-white active:scale-90 transition-all flex-shrink-0 border border-white/10"
                title="Giảm 500"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min="100"
                step="100"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1 bg-[#111116] border border-white/15 rounded-xl px-3.5 py-2 text-center text-sm font-extrabold font-mono text-white focus:outline-none focus:border-blue-400/60 transition-all"
              />

              <button
                type="button"
                onClick={() => handleAdjustQuantity(500)}
                className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-white/70 hover:text-white active:scale-90 transition-all flex-shrink-0 border border-white/10"
                title="Tăng 500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Range Slider for rapid drag-calculation */}
            <div className="px-1 mb-2">
              <input
                type="range"
                min="100"
                max="20000"
                step="100"
                value={Math.min(20000, orderQuantity || 100)}
                onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                className="custom-slider"
              />
              <div className="flex justify-between text-[9px] text-white/35 font-mono mt-1">
                <span>100</span>
                <span>5.000</span>
                <span>10.000</span>
                <span>20.000+</span>
              </div>
            </div>

            {/* Quick Preset Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
              {quantityPresets.map((qty) => (
                <button
                  type="button"
                  key={qty}
                  onClick={() => setOrderQuantity(qty)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-mono font-medium transition-all flex-shrink-0 ${
                    orderQuantity === qty
                      ? 'bg-blue-600 text-white font-bold shadow-[0_0_12px_rgba(37,99,235,0.4)] border border-blue-400'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  +{qty.toLocaleString('vi-VN')}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Live Calculation & Total Quote Card */}
          <div className="relative rounded-2xl p-4 sm:p-5 border border-white/15 bg-gradient-to-br from-white/[0.07] via-black/40 to-black/60 backdrop-blur-xl shadow-xl space-y-2.5">
            <div className="flex items-center justify-between text-xs text-white/65 pb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Công thức tính:</span>
              </div>
              <div className="font-mono text-white/80">
                {(orderQuantity || 0).toLocaleString('vi-VN')} × {formatVND(currentSelectedService?.sellingPrice || 0)}
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-semibold block">
                  Tổng chi phí tạm tính
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    Không lộ pass
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-blue-300 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-full font-medium">
                    <Clock className="w-3 h-3" />
                    5-15 phút
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400 tracking-tight drop-shadow-[0_0_16px_rgba(52,211,153,0.3)]">
                  {formatVND(calculatedTotal)}
                </div>
                {estimatedSavings > 0 && (
                  <div className="text-[10px] text-white/40 font-mono">
                    Tiết kiệm ~{formatVND(estimatedSavings)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit CTA Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(37,99,235,0.45)] flex items-center justify-center gap-2.5 active:scale-98 border border-blue-400/30 relative overflow-hidden group"
          >
            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer pointer-events-none" />
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span>Xác Nhận & Đặt Qua Zalo ({ZALO_PHONE})</span>
          </button>
        </form>
      )}
    </ModalWrapper>
  );
}
