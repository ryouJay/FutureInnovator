"use client"
import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext({
    page: "home",
    setPage: (string:string) => {},
    load: true,
    setLoad: (boolean:boolean) => {},
});

export const GlobalStateProvider = ({children}:any) => {
    const [page, setPage] = useState<string>("home");
    const [load, setLoad] = useState<boolean>(true);

    return (
        <GlobalStateContext.Provider value={{ page, setPage, load, setLoad}}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => React.useContext(GlobalStateContext);
