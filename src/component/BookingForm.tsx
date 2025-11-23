import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, MessageCircle } from 'lucide-react';
import { sendToWhatsApp, BookingData } from '@/lib/whatsapp';
import { PackageData, SimulationData } from '@/types';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  packageData?: PackageData | null;
  simulationData?: SimulationData | null;
  voucherCode?: string;
}

export default function BookingForm({ 
  isOpen, 
  onClose, 
  packageData, 
  simulationData, 
  voucherCode 
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData: BookingData = {
        ...formData,
        packageDetails: packageData,
        simulationDetails: simulationData,
        voucherCode
      };

      sendToWhatsApp(bookingData);
      
      // Reset form and close
      setFormData({
        fullName: '',
        address: '',
        phone: '',
        email: ''
      });
      onClose();
    } catch (error) {
      console.error('Error sending booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.address && formData.phone && formData.email;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            Booking Form
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          {/* Order Summary */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Order Summary</h3>
            {packageData && (
              <div className="text-sm text-blue-800">
                <p><strong>Package:</strong> {packageData.name}</p>
                <p><strong>Price:</strong> {packageData.finalPrice ? 
                  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(packageData.finalPrice) : 
                  'Contact for pricing'}</p>
              </div>
            )}
            {simulationData && (
              <div className="text-sm text-blue-800">
                <p><strong>Custom Configuration:</strong></p>
                <p>Indoor Cameras: {simulationData.indoorCameras}, Outdoor: {simulationData.outdoorCameras}</p>
                <p>Brand: {simulationData.brand}, HDD: {simulationData.hddSize}</p>
                <p><strong>Total Price:</strong> {simulationData.totalPrice}</p>
              </div>
            )}
            {voucherCode && (
              <p className="text-sm text-green-700 mt-2">
                <strong>Voucher Applied:</strong> {voucherCode}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="address">Complete Address *</Label>
              <Textarea
                id="address"
                required
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete installation address"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="e.g., +62 812 3456 7890"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-4">
                By clicking "Send to WhatsApp", your booking details will be sent directly to our sales team 
                via WhatsApp for immediate assistance and scheduling.
              </p>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Sending...' : 'Send to WhatsApp'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}