import React, { createContext, useContext, useState } from 'react';

// Create a UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};

// UserProvider component to wrap your app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false); // Initialize user state to false

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
