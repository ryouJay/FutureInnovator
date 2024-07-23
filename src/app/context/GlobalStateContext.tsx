"use client"
import React, {createContext, useEffect, useState} from 'react'

const GlobalStateContext = createContext({
    page: "Home",
    setPage: (string:string) => {},
    load: true,
    setLoad: (boolean:boolean) => {},
})

export const GlobalStateProvider = ({children}:any) => {
    const [page, setPage] = useState<string>("Default")
    const [load, setLoad] = useState<boolean>(true)

    useEffect(()=>{
        if (typeof window !== 'undefined'){
            const defaultPage = sessionStorage.getItem('page')
            if (defaultPage !== null) setPage(defaultPage)
        }
    },[])

    return (
        <GlobalStateContext.Provider value={{ page, setPage, load, setLoad}}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => React.useContext(GlobalStateContext);
