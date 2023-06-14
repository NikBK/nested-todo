import { createContext, useContext, useState } from 'react';

const ContextProvider = createContext();

export function useGlobalContext() {
    return useContext(ContextProvider);
}

const initialTodos = {
    id: 1,
    items: []
};

const GlobalContext = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);
    const [todos, setTodos] = useState(initialTodos);

    return (
        <ContextProvider.Provider value={{ loggedIn, setLoggedIn, todos, setTodos }}>
            {children}
        </ContextProvider.Provider>
    )
}

export default GlobalContext;
