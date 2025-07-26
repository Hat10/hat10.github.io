import React from 'react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockData } from '../data/mock';

const Blog = ({ language }) => {
  const blogPosts = mockData.blog[language];

  // Mock additional posts for demonstration
  const additionalPosts = [
    {
      title: language === 'en' ? 'Data Analysis in Modern Auditing' : 'Dataanalyse i Moderne Revisjon',
      excerpt: language === 'en' 
        ? 'How data analytics is transforming the audit profession'
        : 'Hvordan dataanalyse transformerer revisjonsbransjen',
      date: '2024-11-20',
      readTime: '5 min',
      category: language === 'en' ? 'Auditing' : 'Revisjon',
      slug: 'data-analysis-auditing'
    },
    {
      title: language === 'en' ? 'From Nanotechnology to Finance' : 'Fra Nanoteknologi til Finans',
      excerpt: language === 'en' 
        ? 'My journey transitioning between technical and financial domains'
        : 'Min reise med overgang mellom tekniske og finansielle domener',
      date: '2024-10-15',
      readTime: '7 min',
      category: language === 'en' ? 'Career' : 'Karriere',
      slug: 'nanotech-to-finance'
    },
    {
      title: language === 'en' ? 'Excel Automation for Finance Professionals' : 'Excel-automatisering for Finansprofesjonelle',
      excerpt: language === 'en' 
        ? 'Practical tips for automating repetitive financial tasks'
        : 'Praktiske tips for automatisering av repetitive finansoppgaver',
      date: '2024-09-30',
      readTime: '6 min',
      category: language === 'en' ? 'Technology' : 'Teknologi',
      slug: 'excel-automation-tips'
    }
  ];

  const allPosts = [...blogPosts.map(post => ({ ...post, readTime: '8 min', category: language === 'en' ? 'Finance' : 'Finans' })), ...additionalPosts];

  return (
    <div className="min-h-screen py-20">
      <div className="max-width-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Blog' : 'Artikler'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'en' 
              ? 'Insights on finance, data analysis, and the intersection of technology and business. Sharing knowledge from my journey in audit, economics, and technical innovation.'
              : 'Innsikt om finans, dataanalyse og skjæringspunktet mellom teknologi og business. Deler kunnskap fra min reise innen revisjon, økonomi og teknisk innovasjon.'
            }
          </p>
        </div>

        {/* Featured Post */}
        {allPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Featured Article' : 'Utvalgt Artikkel'}
            </h2>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-blue-100 to-gray-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <Badge className="bg-blue-600 text-white">
                      {allPosts[0].category}
                    </Badge>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(allPosts[0].date).toLocaleDateString(language === 'en' ? 'en-US' : 'nb-NO')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{allPosts[0].readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {allPosts[0].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {allPosts[0].excerpt}
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      {language === 'en' ? 'Read Article' : 'Les Artikkel'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {language === 'en' ? 'All Articles' : 'Alle Artikler'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.slice(1).map((post, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {post.category}
                    </Badge>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'nb-NO')}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      {language === 'en' ? 'Read More' : 'Les Mer'}
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Stay Updated' : 'Hold deg Oppdatert'}
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Get notified when I publish new articles about finance, technology, and data analysis. No spam, just valuable insights.'
              : 'Få beskjed når jeg publiserer nye artikler om finans, teknologi og dataanalyse. Ingen spam, bare verdifulle innsikter.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={language === 'en' ? 'Your email address' : 'Din e-postadresse'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              {language === 'en' ? 'Subscribe' : 'Abonner'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;