import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext, Children, useContext } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [ authData, setAuthData ] = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        loadStorageData();
    }, [])

    async function loadStorageData() {
        try {
            const AuthDataSerialized = await AsyncStorage.getItem("@AuthData")
            if (AuthDataSerialized) {
                const _authData = JSON.parse(String(AuthDataSerialized))
                setAuthData(_authData)
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    async function signIn(userInfo) {
        setAuthData(userInfo)
        await AsyncStorage.setItem('@AuthData', JSON.stringify(userInfo));
    }

    async function signOut() {
        setAuthData(undefined)
        await AsyncStorage.removeItem("@AuthData")
    }

    return (
        <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    if (!context)
        throw new Error('useAuth must be used inside an AuthProvider')
    
    return context;
}

export { AuthContext, AuthProvider, useAuth }