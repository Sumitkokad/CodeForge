import React from 'react';
import './label.css';

const Label = ({ htmlFor, className = '', children, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`} {...props}>
      {children}
    </label>
  );
};

export { Label };
