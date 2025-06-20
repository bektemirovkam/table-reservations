import { createStrictContext } from "@/shared/lib/react";
import { ReactNode } from "react";

export interface ModalConfig {
    content: ReactNode;
}

export interface ModalContextType {
    open: (config: ModalConfig) => void;
    close: () => void;
}

export const ModalContext = createStrictContext<ModalContextType>();