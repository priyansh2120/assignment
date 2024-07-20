'use client';

import React, { createContext, useContext, useState } from 'react';
import { Coin } from '@/types';

interface DragDropContextProps {
    draggingCoin: Coin | null;
    setDraggingCoin: React.Dispatch<React.SetStateAction<Coin | null>>;
}

const DragDropContext = createContext<DragDropContextProps | undefined>(undefined);

export const DragDropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [draggingCoin, setDraggingCoin] = useState<Coin | null>(null);

    return (
        <DragDropContext.Provider value={{ draggingCoin, setDraggingCoin }}>
            {children}
        </DragDropContext.Provider>
    );
};

export const useDragDrop = () => {
    const context = useContext(DragDropContext);
    if (!context) {
        throw new Error('useDragDrop must be used within a DragDropProvider');
    }
    return context;
};
