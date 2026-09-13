import { useCallback, useEffect, useState } from 'react';

const useAnnouncement = (delay = 250) => {
  const [text, setText] = useState('');

  const announce = useCallback((message: string) => {
    setText(message);
  }, []);

  useEffect(() => {
    let timeout: number | undefined;

    if (text !== '') {
      timeout = window.setTimeout(() => {
        setText('');
      }, delay);
    }

    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
    };
  }, [text, delay]);

  return { text, announce };
};

export default useAnnouncement;
