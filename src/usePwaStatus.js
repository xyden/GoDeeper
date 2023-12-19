// usePwaStatus.js

import { useState, useEffect } from 'react';

const usePwaStatus = () => {
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                         || window.navigator.standalone
                         || document.referrer.includes('android-app://');

    setIsPwaInstalled(isStandalone);
  }, []);
  
  return isPwaInstalled;
};

export default usePwaStatus;