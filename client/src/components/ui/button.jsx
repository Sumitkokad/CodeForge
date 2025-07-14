// import React from 'react';

// const Button = ({ children, className = '', variant = 'default', ...props }) => {
//   let baseClass = 'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2';

//   if (variant === 'outline') {
//     baseClass += ' border border-gray-300 text-gray-700 hover:bg-gray-100';
//   } else {
//     baseClass += ' bg-emerald-500 text-white hover:bg-emerald-600';
//   }

//   return (
//     <button className={`${baseClass} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// };

// export { Button };


import React from 'react';
import './button.css';

const Button = React.forwardRef(
  ({ className = '', variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    const combinedClassName = `btn ${variant} ${size} ${className}`.trim();

    return <Comp className={combinedClassName} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button };
