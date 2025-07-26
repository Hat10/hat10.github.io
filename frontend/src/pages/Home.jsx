import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { usePortfolio } from '../hooks/usePortfolio';
import { LoadingPage } from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home = ({ language }) => {
  const { portfolioData, loading, error } = usePortfolio(language);

  if (loading) return <LoadingPage message={language === 'en' ? 'Loading portfolio...' : 'Laster portefølje...'} />;
  if (error) return <ErrorMessage message={error} />;
  if (!portfolioData) return <ErrorMessage message="Portfolio data not found" />;

  const { personal, home } = portfolioData;
  const content = home;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-20 pb-32">
        <div className="max-width-container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {content.greeting}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  {content.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                    {language === 'en' ? 'Get In Touch' : 'Ta Kontakt'}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/resume">
                  <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                    <Download className="mr-2 w-4 h-4" />
                    {language === 'en' ? 'View Resume' : 'Se CV'}
                  </Button>
                </Link>
              </div>

              {/* Quick Links */}
              <div className="flex items-center space-x-6 pt-8">
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                  <img
                    src={personal.profileImage}
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
                  <p className="text-sm font-medium">
                    {language === 'en' ? 'Available for work' : 'Tilgjengelig for arbeid'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-width-container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Professional Overview' : 'Profesjonell Oversikt'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'A blend of financial expertise, technological innovation, and analytical precision'
                : 'En blanding av finansiell ekspertise, teknologisk innovasjon og analytisk presisjon'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Experience */}
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">5+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'en' ? 'Years Experience' : 'År Erfaring'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'In finance, auditing, and data analysis'
                  : 'Innen finans, revisjon og dataanalyse'
                }
              </p>
            </div>

            {/* Education */}
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">MSc</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'en' ? 'Advanced Education' : 'Høyere Utdanning'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Master in Financial Economics from NTNU'
                  : 'Master i finansiell økonomi fra NTNU'
                }
              </p>
            </div>

            {/* Skills */}
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">∞</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'en' ? 'Technical Skills' : 'Tekniske Ferdigheter'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Python, Excel, Financial Systems'
                  : 'Python, Excel, Finansielle Systemer'
                }
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                {language === 'en' ? 'Learn More About Me' : 'Lær Mer Om Meg'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;