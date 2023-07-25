import { createContext, useContext, useState } from "react";

const StateContext = createContext()

export const ContextProvider = ({children}) => {
    const [isTheme, setIsTheme] = useState("theme-one");

    return(
        <StateContext.Provider value={{isTheme, setIsTheme}}>
            {children}
        </StateContext.Provider>
    )    
}

export const useStateContext = () => useContext(StateContext)