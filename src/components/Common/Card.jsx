import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  padding = true,
  hover = false,
  multiline,      // Extract to prevent passing to DOM
  jsx,           // Extract to prevent passing to DOM
  headerAction,  // Extract to prevent passing to DOM
  ...props       // Only spread safe props
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg border border-gray-200
        ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
      {...props}  // Only safe props are spread here
    >
      {(title || subtitle || headerAction) && (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {headerAction && (
              <div className="flex-shrink-0 ml-4">
                {headerAction}
              </div>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;