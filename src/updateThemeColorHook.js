// src/hooks/useUpdateThemeColor.js

import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

const useUpdateThemeColor = () => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const bodyStyles = window.getComputedStyle(document.body);
    const bgColor = bodyStyles.getPropertyValue('--chakra-colors-chakra-body-bg').trim();

    // Update meta tag only if bgColor is valid
    if (bgColor) {
      const metaThemeColor = document.querySelector('meta[name=theme-color]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', bgColor);
      }
    }
  }, [colorMode]); // Dependency on colorMode ensures this effect runs when mode changes
};

export default useUpdateThemeColor;
