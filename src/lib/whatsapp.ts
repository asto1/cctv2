import database from '../data/database.json';
import { PackageData, SimulationData } from '@/types';

export interface BookingData {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  packageDetails?: PackageData | null;
  simulationDetails?: SimulationData | null;
  voucherCode?: string;
}

export function getWhatsAppNumber(voucherCode?: string): string {
  if (voucherCode && database.voucher_codes[voucherCode as keyof typeof database.voucher_codes]) {
    const voucher = database.voucher_codes[voucherCode as keyof typeof database.voucher_codes];
    if (voucher.valid) {
      return voucher.whatsapp_number;
    }
  }
  return database.default_whatsapp_number;
}

export function generateWhatsAppMessage(bookingData: BookingData): string {
  const { fullName, address, phone, email, packageDetails, simulationDetails, voucherCode } = bookingData;
  
  let message = `*BOOKING CCTV INSTALLATION*\n\n`;
  message += `*Customer Information:*\n`;
  message += `Name: ${fullName}\n`;
  message += `Address: ${address}\n`;
  message += `Phone: ${phone}\n`;
  message += `Email: ${email}\n\n`;
  
  if (packageDetails) {
    message += `*Package Selected:*\n`;
    message += `Package: ${packageDetails.name}\n`;
    message += `Price: ${packageDetails.finalPrice ? 
      new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(packageDetails.finalPrice) : 
      'Contact for pricing'}\n\n`;
  }
  
  if (simulationDetails) {
    message += `*Custom Configuration:*\n`;
    message += `Indoor Cameras: ${simulationDetails.indoorCameras}\n`;
    message += `Outdoor Cameras: ${simulationDetails.outdoorCameras}\n`;
    message += `Cable Length: ${simulationDetails.cableLength}m\n`;
    message += `Brand: ${simulationDetails.brand}\n`;
    message += `HDD Size: ${simulationDetails.hddSize}\n`;
    message += `Total Price: ${simulationDetails.totalPrice}\n\n`;
  }
  
  if (voucherCode) {
    message += `*Voucher Code:* ${voucherCode}\n\n`;
  }
  
  message += `Please confirm this booking and provide installation schedule.`;
  
  return encodeURIComponent(message);
}

export function sendToWhatsApp(bookingData: BookingData): void {
  const whatsappNumber = getWhatsAppNumber(bookingData.voucherCode);
  const message = generateWhatsAppMessage(bookingData);
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;
  
  window.open(whatsappUrl, '_blank');
}