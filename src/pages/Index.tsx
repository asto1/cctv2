import { useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Packages from '@/components/Packages';
import PriceSimulator from '@/components/PriceSimulator';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import { PackageData, SimulationData } from '@/types';

export default function Index() {
  const [bookingForm, setBookingForm] = useState({
    isOpen: false,
    packageData: null as PackageData | null,
    simulationData: null as SimulationData | null,
    voucherCode: ''
  });

  const handleOrderNow = (data: PackageData | SimulationData, voucherCode?: string, isSimulation = false) => {
    setBookingForm({
      isOpen: true,
      packageData: isSimulation ? null : data as PackageData,
      simulationData: isSimulation ? data as SimulationData : null,
      voucherCode: voucherCode || ''
    });
  };

  const closeBookingForm = () => {
    setBookingForm({
      isOpen: false,
      packageData: null,
      simulationData: null,
      voucherCode: ''
    });
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Packages onOrderNow={(data, voucher) => handleOrderNow(data, voucher, false)} />
      <PriceSimulator onOrderNow={(data, voucher) => handleOrderNow(data, voucher, true)} />
      <Footer />
      
      <BookingForm
        isOpen={bookingForm.isOpen}
        onClose={closeBookingForm}
        packageData={bookingForm.packageData}
        simulationData={bookingForm.simulationData}
        voucherCode={bookingForm.voucherCode}
      />
    </div>
  );
}