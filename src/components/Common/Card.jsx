import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  padding = true,
  hover = false,
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg border border-gray-200
        ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;