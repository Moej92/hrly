// "use client";

import { createContext, useContext } from "react";

type DialogContextType = {
    closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if(!context) {
        throw new Error('useDialog must be used within a DialogContext.Provider');
    }

    return context;
}

