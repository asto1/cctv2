import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { formatCurrency } from '@/lib/pricing';
import { PackageData } from '@/types';
import database from '@/data/database.json';

interface PackagesProps {
  onOrderNow: (packageData: PackageData, voucherCode?: string) => void;
}

export default function Packages({ onOrderNow }: PackagesProps) {
  const [voucherCodes, setVoucherCodes] = useState<{ [key: string]: string }>({});
  const [voucherValidation, setVoucherValidation] = useState<{ [key: string]: boolean }>({});

  const handleVoucherChange = (packageIndex: number, code: string) => {
    setVoucherCodes(prev => ({ ...prev, [packageIndex]: code }));
    
    // Validate voucher
    const isValid = code && database.voucher_codes[code as keyof typeof database.voucher_codes]?.valid;
    setVoucherValidation(prev => ({ ...prev, [packageIndex]: isValid || false }));
  };

  const calculatePackagePrice = (pkg: PackageData, voucherCode?: string) => {
    let price = pkg.base_price;
    
    // Apply event discount
    if (database.event_discount.active) {
      price = price * (1 - database.event_discount.discount_percent / 100);
    }
    
    // Apply voucher discount
    if (voucherCode && database.voucher_codes[voucherCode as keyof typeof database.voucher_codes]?.valid) {
      const voucher = database.voucher_codes[voucherCode as keyof typeof database.voucher_codes];
      price = price * (1 - voucher.discount_percent / 100);
    }
    
    return price;
  };

  const getPackageFeatures = (pkg: PackageData) => {
    const features = [
      `${pkg.cameras} ${pkg.type === 'mixed' ? 'Mixed' : pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)} Cameras`,
      `${pkg.brand.charAt(0).toUpperCase() + pkg.brand.slice(1)} Brand`,
      `${pkg.hdd.toUpperCase()} Storage`,
      `${pkg.cable}m Cable Installation`,
      'Professional Installation',
      '1 Year Warranty',
      'Free Consultation',
      '24/7 Technical Support'
    ];
    return features;
  };

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Package Options</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully designed packages or create a custom solution with our price simulator
          </p>
          {database.event_discount.active && (
            <Badge variant="secondary" className="mt-4 bg-green-100 text-green-800 px-4 py-2">
              🎉 {database.event_discount.description} - {database.event_discount.discount_percent}% OFF!
            </Badge>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {database.packages.map((pkg, index) => (
            <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${
              index === 1 ? 'border-blue-500 border-2 transform scale-105' : ''
            }`}>
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                <p className="text-gray-600 mt-2">{pkg.description}</p>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatCurrency(calculatePackagePrice(pkg as PackageData, voucherCodes[index]))}
                  </div>
                  {(database.event_discount.active || voucherValidation[index]) && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatCurrency(pkg.base_price)}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {getPackageFeatures(pkg as PackageData).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voucher Code (Optional)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter voucher code"
                      value={voucherCodes[index] || ''}
                      onChange={(e) => handleVoucherChange(index, e.target.value)}
                      className={voucherValidation[index] ? 'border-green-500' : ''}
                    />
                    {voucherValidation[index] && (
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {voucherValidation[index] && (
                    <p className="text-sm text-green-600 mt-1">
                      Voucher applied! Additional discount included in price.
                    </p>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                  onClick={() => onOrderNow({
                    ...pkg,
                    finalPrice: calculatePackagePrice(pkg as PackageData, voucherCodes[index])
                  } as PackageData, voucherCodes[index])}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom solution?</p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              const element = document.getElementById('price-simulator');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Use Price Simulator
          </Button>
        </div>
      </div>
    </section>
  );
}