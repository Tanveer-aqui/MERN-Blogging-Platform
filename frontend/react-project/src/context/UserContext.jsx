import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}`;

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUser = (res) => {
        const userData = res.data?.user || res.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }


    const logoutUser = async () => {
        try {
            await axios.get(`${API_URL}/logout`, { withCredentials: true });
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(`${API_URL}/session`, { 
                    withCredentials: true 
                });
                if (response.data.user) {
                    updateUser(response);
                } else {
                    logoutUser();
                }
            } catch (error) {
                logoutUser();
            } finally {
                setLoading(false);
            }
        };
    
        checkSession();
    }, []);
      

    const value = {user, updateUser, logoutUser, loading};

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};