
import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Carregar configurações salvas
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast');
    
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
    
    if (savedHighContrast === 'true') {
      setHighContrast(true);
    }
  }, []);

  useEffect(() => {
    // Aplicar tamanho da fonte
    const root = document.documentElement;
    
    switch (fontSize) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
    }
    
    localStorage.setItem('accessibility-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    // Aplicar alto contraste
    const root = document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    localStorage.setItem('accessibility-high-contrast', highContrast.toString());
  }, [highContrast]);

  const increaseFontSize = () => {
    if (fontSize === 'normal') {
      setFontSize('large');
    }
  };

  const decreaseFontSize = () => {
    if (fontSize === 'large') {
      setFontSize('normal');
    } else if (fontSize === 'normal') {
      setFontSize('small');
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const resetAccessibility = () => {
    setFontSize('normal');
    setHighContrast(false);
  };

  const value = {
    fontSize,
    highContrast,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    resetAccessibility
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
