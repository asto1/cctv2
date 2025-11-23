import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Wrench, Clock } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Premium security equipment with professional installation standards"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Certified technicians with years of experience in security systems"
    },
    {
      icon: Wrench,
      title: "Complete Service",
      description: "From consultation to maintenance, we provide end-to-end solutions"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical support for all your security needs"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About LihatTech Support</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="/assets/about-us-team.jpg" 
              alt="LihatTech Support Team" 
              className="rounded-lg shadow-lg w-full h-96 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Professional CCTV Installation Service Provider
            </h3>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              LihatTech Support is a professional CCTV installation service provider offering 
              reliable security solutions for homes, offices, and institutions. We are committed 
              to delivering quality, efficiency, and comprehensive technical support to ensure 
              your property is protected 24/7.
            </p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              With years of experience in the security industry, our team of certified technicians 
              specializes in designing and implementing customized surveillance systems that meet 
              your specific security requirements and budget.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We partner with leading security equipment manufacturers to provide you with the 
              latest technology in surveillance systems, ensuring optimal performance and reliability 
              for your peace of mind.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}