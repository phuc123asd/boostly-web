import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesModal from './components/Modals/ServicesModal';
import PricingModal from './components/Modals/PricingModal';
import FaqModal from './components/Modals/FaqModal';
import ContactModal from './components/Modals/ContactModal';
import OrderModal from './components/Modals/OrderModal';
import { SERVICES } from './data/servicesData';

export default function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [orderPlatform, setOrderPlatform] = useState('facebook');
  const [orderServiceId, setOrderServiceId] = useState('fb-like');
  const [targetUrl, setTargetUrl] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1000);
  const [zaloOrderReady, setZaloOrderReady] = useState(false);

  // Lock body scroll when a modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  const handleOpenOrder = () => {
    setZaloOrderReady(false);
    setActiveModal('order');
  };

  const handleSelectServiceForOrder = (platformKey, serviceObj) => {
    setOrderPlatform(platformKey);
    setOrderServiceId(serviceObj.id);
    setZaloOrderReady(false);
    setActiveModal('order');
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#070709] text-white overflow-hidden select-none">
      {/* Navigation */}
      <Navbar 
        activeModal={activeModal} 
        setActiveModal={setActiveModal} 
        onOpenOrder={handleOpenOrder} 
      />

      {/* Hero Visual Section */}
      <HeroSection onOpenOrder={handleOpenOrder} />

      {/* Modals */}
      {activeModal === 'services' && (
        <ServicesModal 
          onClose={() => setActiveModal(null)} 
          onSelectService={handleSelectServiceForOrder} 
        />
      )}

      {activeModal === 'pricing' && (
        <PricingModal 
          onClose={() => setActiveModal(null)} 
          onSelectService={handleSelectServiceForOrder} 
        />
      )}

      {activeModal === 'faq' && (
        <FaqModal 
          onClose={() => setActiveModal(null)} 
        />
      )}

      {activeModal === 'contact' && (
        <ContactModal 
          onClose={() => setActiveModal(null)} 
        />
      )}

      {activeModal === 'order' && (
        <OrderModal 
          onClose={() => setActiveModal(null)}
          orderPlatform={orderPlatform}
          setOrderPlatform={setOrderPlatform}
          orderServiceId={orderServiceId}
          setOrderServiceId={setOrderServiceId}
          targetUrl={targetUrl}
          setTargetUrl={setTargetUrl}
          orderQuantity={orderQuantity}
          setOrderQuantity={setOrderQuantity}
          zaloOrderReady={zaloOrderReady}
          setZaloOrderReady={setZaloOrderReady}
        />
      )}
    </div>
  );
}
