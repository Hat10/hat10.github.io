import React from 'react';
import { ExternalLink, Github, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useProjects, usePortfolio } from '../hooks/usePortfolio';
import { LoadingPage, LoadingSection } from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Projects = ({ language }) => {
  const { projectsData, loading: projectsLoading, error: projectsError } = useProjects(language);
  const { portfolioData } = usePortfolio(language);

  const personalData = portfolioData?.personal || {
    github: 'https://github.com/Hat10'
  };

  if (projectsLoading) return <LoadingPage message={language === 'en' ? 'Loading projects...' : 'Laster prosjekter...'} />;

  return (
    <div className="min-h-screen py-20">
      <div className="max-width-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Projects' : 'Prosjekter'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'en' 
              ? 'Explore my work combining financial analysis, data science, and process automation. Each project represents a unique challenge solved through analytical thinking and technical implementation.'
              : 'Utforsk mitt arbeid som kombinerer finansiell analyse, datavitenskap og prosessautomatisering. Hvert prosjekt representerer en unik utfordring løst gjennom analytisk tenkning og teknisk implementering.'
            }
          </p>
        </div>

        {/* GitHub CTA */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Github className="w-8 h-8 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? 'View All Projects on GitHub' : 'Se Alle Prosjekter på GitHub'}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Explore my complete portfolio of projects, including source code, documentation, and detailed explanations.'
                : 'Utforsk min komplette portefølje av prosjekter, inkludert kildekode, dokumentasjon og detaljerte forklaringer.'
              }
            </p>
            <Button 
              size="lg" 
              className="bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => window.open(personalData.github, '_blank')}
            >
              <Github className="mr-2 w-5 h-5" />
              {language === 'en' ? 'Visit GitHub Profile' : 'Besøk GitHub-profil'}
            </Button>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'en' ? 'Featured Projects' : 'Utvalgte Prosjekter'}
          </h2>
          
          {projectsError ? (
            <ErrorMessage message={projectsError} />
          ) : projectsData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {language === 'en' ? 'No projects found.' : 'Ingen prosjekter funnet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projectsData.map((project, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                        {project.live_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => window.open(project.live_url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="bg-blue-100 text-blue-800">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="mr-2 w-4 h-4" />
                        {language === 'en' ? 'View Source Code' : 'Se Kildekode'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Skills & Tools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'en' ? 'Technologies & Tools' : 'Teknologier & Verktøy'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Python', 'Pandas', 'NumPy', 'Excel', 'VBA', 'Plotly', 'Streamlit', 'Git', 'SQL', 'JavaScript', 'React', 'Node.js'].map((tech, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Have a Project in Mind?' : 'Har du et Prosjekt i Tankene?'}
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {language === 'en' 
              ? "I'm always interested in collaborating on projects that combine financial analysis, data science, or process automation. Let's discuss your ideas!"
              : 'Jeg er alltid interessert i å samarbeide om prosjekter som kombinerer finansiell analyse, datavitenskap eller prosessautomatisering. La oss diskutere ideene dine!'
            }
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <ExternalLink className="mr-2 w-4 h-4" />
            {language === 'en' ? 'Get In Touch' : 'Ta Kontakt'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;