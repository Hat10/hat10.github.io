import React from 'react';
import { ExternalLink, Mail, MapPin } from 'lucide-react';
import { mockData } from '../data/mock';

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-width-container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Contact' : 'Kontakt'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a 
                  href={`mailto:${mockData.personal.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {mockData.personal.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  {language === 'en' ? 'Trondheim, Norway' : 'Trondheim, Norge'}
                </span>
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Professional' : 'Profesjonelt'}
            </h3>
            <div className="space-y-3">
              <a
                href={mockData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={mockData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-blue-400" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Andreas Attila Stenberg</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {language === 'en' 
                ? 'Audit accountant at KPMG with expertise in financial economics, data analysis, and process improvement.'
                : 'Revisjonsrevisor i KPMG med ekspertise innen finansiell økonomi, dataanalyse og prosessforbedring.'
              }
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Andreas Attila Stenberg. {language === 'en' ? 'All rights reserved.' : 'Alle rettigheter reservert.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;