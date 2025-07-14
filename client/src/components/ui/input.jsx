import React from 'react';
import './input.css';

const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`input ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
