import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Settings, Wrench, Network } from 'lucide-react';

export default function Services() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const services = [
    {
      icon: Camera,
      title: "Indoor/Outdoor CCTV Installation",
      description: "Professional installation of security cameras for both indoor and outdoor environments with optimal positioning and coverage.",
      features: ["HD/4K Camera Options", "Night Vision Capability", "Weather Resistant", "Remote Monitoring"]
    },
    {
      icon: Settings,
      title: "Security System Consultation",
      description: "Expert consultation to design the perfect security system tailored to your specific needs and property layout.",
      features: ["Site Assessment", "Custom Design", "Budget Planning", "Equipment Selection"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Troubleshooting",
      description: "Comprehensive maintenance services and quick troubleshooting to ensure your security system operates at peak performance.",
      features: ["Regular Maintenance", "24/7 Support", "Quick Repairs", "System Updates"]
    },
    {
      icon: Network,
      title: "Local Network Integration",
      description: "Seamless integration of your CCTV system with existing network infrastructure for remote access and monitoring.",
      features: ["Network Setup", "Remote Access", "Mobile App Integration", "Cloud Storage"]
    }
  ];

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Chart data
    const data = [
      { label: 'Installation', value: 40, color: '#3B82F6' },
      { label: 'Consultation', value: 25, color: '#10B981' },
      { label: 'Maintenance', value: 20, color: '#F59E0B' },
      { label: 'Integration', value: 15, color: '#EF4444' }
    ];

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;

    let currentAngle = -Math.PI / 2;

    // Draw pie chart
    data.forEach((segment) => {
      const sliceAngle = (segment.value / 100) * 2 * Math.PI;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
      const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
      
      ctx.fillStyle = '#374151';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${segment.label}`, labelX, labelY);
      ctx.fillText(`${segment.value}%`, labelX, labelY + 16);
      
      currentAngle += sliceAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Center text
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Services', centerX, centerY - 5);
    ctx.font = '12px sans-serif';
    ctx.fillText('Distribution', centerX, centerY + 10);
  }, []);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive CCTV and security solutions tailored to protect your property
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Service Distribution</h3>
            <p className="text-gray-700 mb-6">
              Our service portfolio is designed to provide comprehensive security solutions, 
              with a focus on professional installation while maintaining strong support 
              in consultation, maintenance, and system integration.
            </p>
            <canvas 
              ref={chartRef} 
              className="mx-auto border rounded-lg shadow-sm bg-gray-50"
            ></canvas>
          </div>
          
          <div>
            <img 
              src="/assets/services-equipment.jpg" 
              alt="CCTV Equipment and Services" 
              className="rounded-lg shadow-lg w-full h-96 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}