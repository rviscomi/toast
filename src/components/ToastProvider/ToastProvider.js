import React from 'react';

import useEscapeKey from '../../hooks/useEscapeKey.hook';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useEscapeKey(() => {
    setToasts([]);
  }, []);
  
  const popToast = React.useCallback((message, variant) => {
    setToasts([...toasts, { message, variant, id: Date.now() }]);
  });

  const dismissToast = React.useCallback(id => {
    setToasts(toasts.filter(toast => toast.id !== id));
  }, [toasts]);

  const toastMemo = React.useMemo(() => {
    return toasts;
  }, [toasts]);

  return (
    <ToastContext.Provider value={{
      toasts: toastMemo,
      popToast,
      dismissToast
    }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
