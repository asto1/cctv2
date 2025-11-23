import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/hero-cctv-installation.jpg" 
          alt="CCTV Installation" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-blue-900/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">Lihat</span>
          <span className="text-blue-300">Tech</span>
          <span className="text-white"> Support</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Professional CCTV Installation & Security Solutions
        </p>
        
        <p className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto">
          Protecting your home, office, and business with reliable surveillance systems. 
          Quality installation, expert consultation, and 24/7 technical support.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-3 text-lg"
            onClick={() => scrollToSection('price-simulator')}
          >
            Get Price Quote
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 text-lg"
            onClick={() => scrollToSection('services')}
          >
            Our Services
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 text-lg"
            onClick={() => scrollToSection('packages')}
          >
            View Packages
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}