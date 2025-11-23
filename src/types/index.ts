export interface PackageData {
  name: string;
  description: string;
  cameras: number;
  type: string;
  brand: string;
  hdd: string;
  cable: number;
  base_price: number;
  finalPrice?: number;
}

export interface SimulationData {
  cableLength: number;
  indoorCameras: number;
  outdoorCameras: number;
  brand: 'hilook' | 'dahua';
  hddSize: '500gb' | '1tb' | '2tb' | '4tb';
  voucherCode?: string;
  totalPrice?: string;
  breakdown?: {
    cameras: number;
    accessories: number;
    hdd: number;
    cable: number;
    duradus: number;
    powerSupply: number;
    installation: number;
    dvr: number;
  };
  dvrPorts?: number;
}