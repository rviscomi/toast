import React from 'react';

export default function useEscapeKey(callback, dependencies) {
  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        callback();
      }
    }

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, dependencies);
}