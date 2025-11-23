import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Check } from 'lucide-react';
import { calculatePrice, formatCurrency, PricingInputs, PricingResult } from '@/lib/pricing';
import { SimulationData } from '@/types';
import database from '@/data/database.json';

interface PriceSimulatorProps {
  onOrderNow: (simulationData: SimulationData, voucherCode?: string) => void;
}

export default function PriceSimulator({ onOrderNow }: PriceSimulatorProps) {
  const [inputs, setInputs] = useState<PricingInputs>({
    cableLength: 20,
    indoorCameras: 2,
    outdoorCameras: 2,
    brand: 'hilook',
    hddSize: '1tb',
    voucherCode: ''
  });
  
  const [result, setResult] = useState<PricingResult | null>(null);
  const [voucherValid, setVoucherValid] = useState(false);

  useEffect(() => {
    const calculatedResult = calculatePrice(inputs);
    setResult(calculatedResult);
    setVoucherValid(calculatedResult.voucherValid);
  }, [inputs]);

  const handleInputChange = (field: keyof PricingInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const breakdownItems = result ? [
    { label: 'Cameras', value: result.breakdown.cameras },
    { label: 'Accessories (3 per camera)', value: result.breakdown.accessories },
    { label: 'HDD Storage', value: result.breakdown.hdd },
    { label: 'Cable Installation', value: result.breakdown.cable },
    { label: 'Duradus', value: result.breakdown.duradus },
    { label: 'Power Supply', value: result.breakdown.powerSupply },
    { label: 'Installation Fee', value: result.breakdown.installation },
    { label: `DVR (${result.dvrPorts}-port)`, value: result.breakdown.dvr }
  ] : [];

  return (
    <section id="price-simulator" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Price Simulation</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate the exact cost for your custom CCTV installation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="indoor-cameras">Indoor Cameras</Label>
                  <Input
                    id="indoor-cameras"
                    type="number"
                    min="0"
                    max="20"
                    value={inputs.indoorCameras}
                    onChange={(e) => handleInputChange('indoorCameras', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="outdoor-cameras">Outdoor Cameras</Label>
                  <Input
                    id="outdoor-cameras"
                    type="number"
                    min="0"
                    max="20"
                    value={inputs.outdoorCameras}
                    onChange={(e) => handleInputChange('outdoorCameras', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cable-length">Cable Length (meters)</Label>
                <Input
                  id="cable-length"
                  type="number"
                  min="1"
                  max="500"
                  value={inputs.cableLength}
                  onChange={(e) => handleInputChange('cableLength', parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <Label htmlFor="brand">CCTV Brand</Label>
                <Select value={inputs.brand} onValueChange={(value) => handleInputChange('brand', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {database.cctv_brands.map((brand) => (
                      <SelectItem key={brand.name.toLowerCase()} value={brand.name.toLowerCase()}>
                        {brand.name} - {brand.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="hdd-size">HDD Size</Label>
                <Select value={inputs.hddSize} onValueChange={(value) => handleInputChange('hddSize', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500gb">500GB - {formatCurrency(database.component_prices.hdd['500gb'])}</SelectItem>
                    <SelectItem value="1tb">1TB - {formatCurrency(database.component_prices.hdd['1tb'])}</SelectItem>
                    <SelectItem value="2tb">2TB - {formatCurrency(database.component_prices.hdd['2tb'])}</SelectItem>
                    <SelectItem value="4tb">4TB - {formatCurrency(database.component_prices.hdd['4tb'])}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="voucher-code">Voucher Code (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="voucher-code"
                    placeholder="Enter voucher code"
                    value={inputs.voucherCode || ''}
                    onChange={(e) => handleInputChange('voucherCode', e.target.value)}
                    className={voucherValid ? 'border-green-500' : ''}
                  />
                  {voucherValid && (
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                {voucherValid && (
                  <p className="text-sm text-green-600 mt-1">
                    Valid voucher code applied!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Price Breakdown</CardTitle>
              {result && (
                <div className="text-sm text-gray-600">
                  Total Cameras: {inputs.indoorCameras + inputs.outdoorCameras} | 
                  DVR Required: {result.dvrPorts}-port
                </div>
              )}
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {breakdownItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="font-medium">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>Subtotal</span>
                      <span>{formatCurrency(result.subtotal)}</span>
                    </div>
                    
                    {result.eventDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Event Discount ({database.event_discount.discount_percent}%)</span>
                        <span>-{formatCurrency(result.eventDiscount)}</span>
                      </div>
                    )}
                    
                    {result.voucherDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Voucher Discount</span>
                        <span>-{formatCurrency(result.voucherDiscount)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-blue-600">
                      <span>Total Price</span>
                      <span>{formatCurrency(result.total)}</span>
                    </div>
                  </div>
                  
                  {database.event_discount.active && (
                    <Badge variant="secondary" className="w-full justify-center bg-green-100 text-green-800">
                      🎉 {database.event_discount.description} Applied!
                    </Badge>
                  )}
                  
                  <Button 
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                    onClick={() => onOrderNow({
                      ...inputs,
                      totalPrice: formatCurrency(result.total),
                      breakdown: result.breakdown,
                      dvrPorts: result.dvrPorts
                    }, inputs.voucherCode)}
                  >
                    Order Now - {formatCurrency(result.total)}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Configure your system to see pricing
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}