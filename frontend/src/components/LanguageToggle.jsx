import React from 'react';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="flex">
        <Button
          variant={currentLanguage === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('en')}
          className="px-3 py-1 text-sm rounded-l-md rounded-r-none"
        >
          EN
        </Button>
        <Button
          variant={currentLanguage === 'no' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('no')}
          className="px-3 py-1 text-sm rounded-r-md rounded-l-none border-l-0"
        >
          NO
        </Button>
      </div>
    </div>
  );
};

export default LanguageToggle;