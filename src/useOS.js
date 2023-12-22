import { useState, useEffect } from 'react';

const useOS = () => {
  const [os, setOs] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      setOs('Android');
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // The MSStream part is to exclude IE on Windows phones
      setOs('iOS');
    } else {
      setOs('unknown');
    }
  }, []);

  return os;
};

export default useOS;