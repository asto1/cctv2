import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';
import database from '@/data/database.json';

export default function Footer() {
  const { company_info } = database;

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Lihat</span>
              <span className="text-blue-400">Tech</span>
              <span className="text-white"> Support</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Professional CCTV installation and security solutions for your peace of mind.
            </p>
            <div className="flex space-x-4">
              <a 
                href={`https://instagram.com/${company_info.social_media.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={`https://facebook.com/${company_info.social_media.facebook.replace(' ', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={`https://wa.me/${company_info.social_media.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{company_info.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a 
                  href={`tel:${company_info.phone}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {company_info.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a 
                  href={`mailto:${company_info.email}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {company_info.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Indoor CCTV Installation</li>
              <li>Outdoor CCTV Installation</li>
              <li>Security Consultation</li>
              <li>System Maintenance</li>
              <li>Network Integration</li>
              <li>24/7 Technical Support</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#packages" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="#price-simulator" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Price Calculator
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 LihatTech Support. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Professional CCTV Installation Services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}