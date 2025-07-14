import React from 'react';
import './card.css';

const Card = ({ className = '', children, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ className = '', children, ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardDescription = ({ className = '', children, ...props }) => {
  return (
    <p className={`card-description ${className}`} {...props}>
      {children}
    </p>
  );
};

const CardFooter = ({ className = '', children, ...props }) => {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h2 className={`card-title ${className}`} {...props}>
      {children}
    </h2>
  );
};

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
