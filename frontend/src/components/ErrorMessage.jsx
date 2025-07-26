import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry, 
  className = '',
  showRetry = true 
}) => {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center max-w-md">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {showRetry && onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-2">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export const ErrorPage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen">
      <ErrorMessage 
        message={message} 
        onRetry={onRetry}
        className="min-h-screen"
      />
    </div>
  );
};

export default ErrorMessage;