import React, { useState, ReactNode } from "react";
import { ModalContext, ModalConfig } from "./modal-context";
import { Modal } from "./modal";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const open = (config: ModalConfig) => {
    setContent(config.content);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      <Modal isVisible={visible} onClose={close}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};
