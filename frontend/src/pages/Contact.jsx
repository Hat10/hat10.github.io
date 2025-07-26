import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { usePortfolio } from '../hooks/usePortfolio';
import { portfolioAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Contact = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { portfolioData } = usePortfolio(language);

  const personalData = portfolioData?.personal || {
    email: 'andreasstenb@gmail.com',
    linkedin: 'https://www.linkedin.com/in/andreasstenberg/',
    github: 'https://github.com/Hat10'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await portfolioAPI.submitContact(formData);
      
      toast({
        title: language === 'en' ? 'Message Sent!' : 'Melding Sendt!',
        description: response.message || (language === 'en' 
          ? "Thank you for your message. I'll get back to you soon."
          : 'Takk for meldingen din. Jeg kommer tilbake til deg snart.'),
      });
      
      // Clear form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      toast({
        title: language === 'en' ? 'Error' : 'Feil',
        description: language === 'en' 
          ? 'Failed to send message. Please try again.'
          : 'Kunne ikke sende melding. Vennligst prøv igjen.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-width-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Contact' : 'Kontakt'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'en' 
              ? "I'm always open to discussing new opportunities, collaborations, or just having a conversation about finance, technology, and data analysis. Feel free to reach out!"
              : 'Jeg er alltid åpen for å diskutere nye muligheter, samarbeid, eller bare ha en samtale om finans, teknologi og dataanalyse. Ta gjerne kontakt!'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'Get In Touch' : 'Ta Kontakt'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {language === 'en' ? 'Email' : 'E-post'}
                    </h3>
                    <a 
                      href={`mailto:${personalData.email}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {personalData.email}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'en' 
                        ? 'Best way to reach me for professional inquiries'
                        : 'Beste måten å nå meg på for profesjonelle henvendelser'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {language === 'en' ? 'Location' : 'Lokasjon'}
                    </h3>
                    <p className="text-gray-700">
                      {language === 'en' ? 'Trondheim, Norway' : 'Trondheim, Norge'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'en' 
                        ? 'Available for remote work and local meetings'
                        : 'Tilgjengelig for fjernarbeid og lokale møter'
                      }
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'en' ? 'Professional Links' : 'Profesjonelle Lenker'}
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={personalData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LinkedIn Profile</span>
                    </a>
                    <a
                      href={personalData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>GitHub Repository</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-gradient-to-r from-blue-50 to-gray-50 border-none">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'en' ? 'Current Availability' : 'Nåværende Tilgjengelighet'}
                </h3>
                <p className="text-gray-700 mb-4">
                  {language === 'en' 
                    ? 'Currently working as an Audit Associate at KPMG. Open to freelance projects and consulting opportunities in financial analysis and data science.'
                    : 'Jobber for tiden som revisor i KPMG. Åpen for frilansprosjekter og konsulentmuligheter innen finansiell analyse og datavitenskap.'
                  }
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">
                    {language === 'en' ? 'Available for new projects' : 'Tilgjengelig for nye prosjekter'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'Send a Message' : 'Send en Melding'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {language === 'en' ? 'Name' : 'Navn'}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={language === 'en' ? 'Your name' : 'Ditt navn'}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {language === 'en' ? 'Email' : 'E-post'}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={language === 'en' ? 'your.email@example.com' : 'din.epost@eksempel.com'}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {language === 'en' ? 'Subject' : 'Emne'}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={language === 'en' ? 'What would you like to discuss?' : 'Hva vil du diskutere?'}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {language === 'en' ? 'Message' : 'Melding'}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={language === 'en' 
                        ? 'Tell me about your project, opportunity, or question...'
                        : 'Fortell meg om prosjektet ditt, muligheten eller spørsmålet...'
                      }
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        {language === 'en' ? 'Sending...' : 'Sender...'}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        {language === 'en' ? 'Send Message' : 'Send Melding'}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'en' ? 'Frequently Asked Questions' : 'Ofte Stilte Spørsmål'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'en' ? 'What services do you offer?' : 'Hvilke tjenester tilbyr du?'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? 'I specialize in financial analysis, audit processes, data analysis automation, and Excel/Python-based financial modeling.'
                    : 'Jeg spesialiserer meg på finansiell analyse, revisjonsprosesser, dataanalyseautomatisering og Excel/Python-basert finansiell modellering.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'en' ? 'Do you work remotely?' : 'Jobber du på distanse?'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? 'Yes, I work with clients both locally in Norway and internationally through remote collaboration.'
                    : 'Ja, jeg jobber med klienter både lokalt i Norge og internasjonalt gjennom fjernsamarbeid.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'en' ? 'What is your response time?' : 'Hva er din responstid?'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? 'I typically respond to emails within 24 hours during business days.'
                    : 'Jeg svarer vanligvis på e-post innen 24 timer på virkedager.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'en' ? 'Can you help with academic projects?' : 'Kan du hjelpe med akademiske prosjekter?'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? 'Yes, I enjoy collaborating on research projects related to finance, data analysis, and quantitative methods.'
                    : 'Ja, jeg liker å samarbeide om forskningsprosjekter relatert til finans, dataanalyse og kvantitative metoder.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;