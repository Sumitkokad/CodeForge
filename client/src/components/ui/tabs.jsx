import React, { useState, createContext, useContext } from 'react';
import './tabs.css';

const TabsContext = createContext();

const Tabs = ({ defaultValue, className = '', onValueChange, children, ...props }) => {
  const [activeValue, setActiveValue] = useState(defaultValue);

  const handleValueChange = (value) => {
    setActiveValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <TabsContext.Provider value={{ activeValue, onValueChange: handleValueChange }}>
      <div className={`tabs ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ className = '', children, ...props }) => {
  return (
    <div className={`tabs-list ${className}`} {...props}>
      {children}
    </div>
  );
};

const TabsTrigger = ({ value, className = '', children, ...props }) => {
  const { activeValue, onValueChange } = useContext(TabsContext);
  const isActive = activeValue === value;

  const handleClick = () => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <button
      className={`tabs-trigger ${isActive ? 'active' : ''} ${className}`}
      onClick={handleClick}
      {...props}
      type="button"
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, className = '', children, ...props }) => {
  const { activeValue } = useContext(TabsContext);
  if (activeValue !== value) {
    return null;
  }
  return (
    <div className={`tabs-content ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Tabs, TabsContent, TabsList, TabsTrigger };
