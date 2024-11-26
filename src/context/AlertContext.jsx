import React, { createContext, useContext, useState, useCallback } from "react";
import Alert from "../components/Alert";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: "",
    onClose: () => {},
  });

  const showAlert = useCallback((message, onClose = () => {}) => {
    setAlertState({
      isOpen: true,
      message,
      onClose: () => {
        onClose();
        setAlertState((prev) => ({ ...prev, isOpen: false }));
      },
    });
  }, []);

  const contextValue = {
    showAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {alertState.isOpen && (
        <Alert message={alertState.message} onClose={alertState.onClose} />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
