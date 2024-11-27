import React, { createContext, useContext, useState, useCallback } from "react";
import Confirm from "../components/Confirm";

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const showConfirm = useCallback((message) => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        message,
        onConfirm: () => {
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        },
      });
    });
  }, []);

  const contextValue = {
    showConfirm,
  };

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}
      {confirmState.isOpen && (
        <Confirm
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={confirmState.onCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
};
