"use client";

import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const openFeedbackModal = () => {
    setIsFeedbackOpen(true);
  };
  const closeFeedbackModal = () => {
    setIsFeedbackOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isFeedbackOpen, openFeedbackModal, closeFeedbackModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
