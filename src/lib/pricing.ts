import database from '../data/database.json';

export interface PricingInputs {
  cableLength: number;
  indoorCameras: number;
  outdoorCameras: number;
  brand: 'hilook' | 'dahua';
  hddSize: '500gb' | '1tb' | '2tb' | '4tb';
  voucherCode?: string;
}

export interface PricingResult {
  breakdown: {
    cameras: number;
    accessories: number;
    hdd: number;
    cable: number;
    duradus: number;
    powerSupply: number;
    installation: number;
    dvr: number;
  };
  subtotal: number;
  eventDiscount: number;
  afterEventDiscount: number;
  voucherDiscount: number;
  total: number;
  dvrPorts: number;
  voucherValid: boolean;
}

export function calculatePrice(inputs: PricingInputs): PricingResult {
  const { component_prices, voucher_codes, event_discount } = database;
  
  const totalCameras = inputs.indoorCameras + inputs.outdoorCameras;
  
  // Calculate DVR ports needed (multiples of 4)
  const dvrPorts = Math.ceil(totalCameras / 4) * 4;
  const dvrType = dvrPorts <= 4 ? '4_port' : 
                  dvrPorts <= 8 ? '8_port' : 
                  dvrPorts <= 16 ? '16_port' : '32_port';
  
  // Calculate component costs
  const indoorCameraPrice = component_prices.cameras.indoor[inputs.brand] * inputs.indoorCameras;
  const outdoorCameraPrice = component_prices.cameras.outdoor[inputs.brand] * inputs.outdoorCameras;
  const totalCameraPrice = indoorCameraPrice + outdoorCameraPrice;
  
  const accessoriesPrice = component_prices.accessories * totalCameras * 3; // 3 accessories per camera
  const hddPrice = component_prices.hdd[inputs.hddSize];
  const cablePrice = component_prices.cable_per_meter * inputs.cableLength;
  const duradusPrice = component_prices.duradus * totalCameras;
  const powerSupplyPrice = component_prices.power_supply_per_4_cameras * Math.ceil(totalCameras / 4);
  const installationPrice = component_prices.installation_fee_per_camera * totalCameras;
  const dvrPrice = component_prices.dvr[dvrType as keyof typeof component_prices.dvr];
  
  const breakdown = {
    cameras: totalCameraPrice,
    accessories: accessoriesPrice,
    hdd: hddPrice,
    cable: cablePrice,
    duradus: duradusPrice,
    powerSupply: powerSupplyPrice,
    installation: installationPrice,
    dvr: dvrPrice
  };
  
  const subtotal = Object.values(breakdown).reduce((sum, price) => sum + price, 0);
  
  // Apply event discount
  const eventDiscountAmount = event_discount.active ? 
    (subtotal * event_discount.discount_percent / 100) : 0;
  const afterEventDiscount = subtotal - eventDiscountAmount;
  
  // Apply voucher discount
  let voucherDiscountAmount = 0;
  let voucherValid = false;
  
  if (inputs.voucherCode && voucher_codes[inputs.voucherCode as keyof typeof voucher_codes]) {
    const voucher = voucher_codes[inputs.voucherCode as keyof typeof voucher_codes];
    if (voucher.valid) {
      voucherValid = true;
      voucherDiscountAmount = afterEventDiscount * voucher.discount_percent / 100;
    }
  }
  
  const total = afterEventDiscount - voucherDiscountAmount;
  
  return {
    breakdown,
    subtotal,
    eventDiscount: eventDiscountAmount,
    afterEventDiscount,
    voucherDiscount: voucherDiscountAmount,
    total,
    dvrPorts,
    voucherValid
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}