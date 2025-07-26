import React from 'react';
import { Download, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useTimeline, usePortfolio } from '../hooks/usePortfolio';
import { LoadingPage, LoadingSection } from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Resume = ({ language }) => {
  const { timelineData, loading: timelineLoading, error: timelineError } = useTimeline(language);
  const { portfolioData, loading: portfolioLoading } = usePortfolio(language);

  if (portfolioLoading) return <LoadingPage message={language === 'en' ? 'Loading resume...' : 'Laster CV...'} />;

  const personalData = portfolioData?.personal || {};

  return (
    <div className="min-h-screen py-20">
      <div className="max-width-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Resume' : 'CV'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {language === 'en' 
              ? 'A comprehensive overview of my professional journey, combining finance, technology, and analytical expertise.'
              : 'En omfattende oversikt over min profesjonelle reise, som kombinerer finans, teknologi og analytisk ekspertise.'
            }
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="mr-2 w-4 h-4" />
            {language === 'en' ? 'Download PDF' : 'Last ned PDF'}
          </Button>
        </div>

        {/* Professional Summary */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-gray-50 border-none">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Professional Summary' : 'Profesjonelt Sammendrag'}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {language === 'en' 
                  ? 'Results-driven audit accountant with a unique blend of financial economics expertise and nanotechnology engineering background. Specializing in data analysis, process improvement, and financial systems optimization. Proven track record in internal auditing, budgeting, and teaching complex technical concepts.'
                  : 'Resultatorientert revisjonsrevisor med en unik blanding av finansiell økonomi-ekspertise og nanoteknologi-ingeniørbakgrunn. Spesialiserer seg på dataanalyse, prosessforbedring og optimalisering av finansielle systemer. Dokumentert erfaring innen internrevisjon, budsjettering og undervisning av komplekse tekniske konsepter.'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {language === 'en' ? 'Professional Experience' : 'Arbeidserfaring'}
          </h2>
          
          {timelineLoading ? (
            <LoadingSection message={language === 'en' ? 'Loading experience...' : 'Laster erfaring...'} />
          ) : timelineError ? (
            <ErrorMessage message={timelineError} />
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              
              <div className="space-y-8">
                {timelineData.map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                    
                    {/* Content */}
                    <div className="ml-16 w-full">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{item.year}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600 font-medium">{item.company}</span>
                          </div>
                          <p className="text-gray-700">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Key Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'en' ? 'Key Achievements' : 'Viktige Prestasjoner'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'Academic Excellence' : 'Akademisk Fortreffelighet'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? 'Master thesis on stock volatility analysis'
                    : 'Masteroppgave om aksjevolatilitetsanalyse'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'Professional Growth' : 'Profesjonell Vekst'}    
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? 'Transitioned from engineering to finance successfully'
                    : 'Vellykkede overgang fra ingeniørfag til finans'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏫</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'Teaching Excellence' : 'Undervisningsfortreffelighet'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? '4+ years as teaching assistant at NTNU'
                    : '4+ år som læringsassistent ved NTNU'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Interested in Working Together?' : 'Interessert i å Jobbe Sammen?'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? "Let's discuss how my expertise can contribute to your organization's success."
              : 'La oss diskutere hvordan min ekspertise kan bidra til organisasjonens suksess.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <ExternalLink className="mr-2 w-4 h-4" />
              {language === 'en' ? 'Contact Me' : 'Kontakt Meg'}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => window.open(personalData.linkedin, '_blank')}
            >
              <ExternalLink className="mr-2 w-4 h-4" />
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;