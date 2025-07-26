import React from 'react';
import { GraduationCap, Award, Globe, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockData } from '../data/mock';

const About = ({ language }) => {
  const education = mockData.about.education[language];
  const skills = mockData.about.skills[language];
  const languages = mockData.about.languages[language];
  const interests = mockData.about.interests[language];

  return (
    <div className="min-h-screen py-20">
      <div className="max-width-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'About Me' : 'Om Meg'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'en' 
              ? 'Born March 29, 1999, I combine financial expertise with technological innovation. My journey spans from nanotechnology engineering to financial economics, creating a unique perspective on data-driven decision making.'
              : 'Født 29. mars 1999, kombinerer jeg finansiell ekspertise med teknologisk innovasjon. Min reise spenner fra nanoteknologi-ingeniørfag til finansiell økonomi, og skaper et unikt perspektiv på datadrevet beslutningstaking.'
            }
          </p>
        </div>

        {/* Profile Image and Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="text-center">
                <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-xl mb-6">
                  <img
                    src={mockData.personal.profileImage}
                    alt={mockData.personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {mockData.personal.name}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  {mockData.personal.title[language]}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'en' ? 'Born' : 'Født'}: {mockData.personal.birthdate}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span>{language === 'en' ? 'Education' : 'Utdanning'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4 pb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-500 mb-2">{edu.period}</p>
                      {edu.thesis && (
                        <p className="text-sm text-gray-700 italic">{edu.thesis}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span>{language === 'en' ? 'Skills' : 'Ferdigheter'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span>{language === 'en' ? 'Languages' : 'Språk'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span>{language === 'en' ? 'Interests' : 'Interesser'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            {language === 'en' ? 'My Approach' : 'Min Tilnærming'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {language === 'en' ? 'Analytical Precision' : 'Analytisk Presisjon'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'en' 
                  ? 'My background in nanotechnology has taught me to think at multiple scales and appreciate the importance of precision in both measurement and analysis.'
                  : 'Min bakgrunn innen nanoteknologi har lært meg å tenke på flere skalaer og verdsette viktigheten av presisjon i både måling og analyse.'
                }
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {language === 'en' ? 'Process Innovation' : 'Prosessinnovasjon'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'en' 
                  ? 'I believe in continuous improvement and leveraging technology to streamline financial processes and enhance decision-making capabilities.'
                  : 'Jeg tror på kontinuerlig forbedring og å utnytte teknologi for å strømlinjeforme finansielle prosesser og forbedre beslutningsevner.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;