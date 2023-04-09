import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext, Children, useContext } from "react";
import SocketService from "../utils/socket";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [ authData, setAuthData ] = useState()
    const [ loading, setLoading ] = useState(true)
    const [ userInfo, setUserInfo ] = useState()
    const [ pushNotificationStatus, setPushNotificationStatus ] = useState(false)

    
    useEffect(() => {
        loadStorageData();
        
        // initialize socket service
        SocketService.initializeSocket();
    }, [])

    async function loadStorageData() {
        try {
            const AuthDataSerialized = await AsyncStorage.getItem("@AuthData")
            if (AuthDataSerialized) {
                const _authData = JSON.parse(String(AuthDataSerialized))
                setAuthData(_authData)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    async function signUp(userInfo) {
        setAuthData(userInfo)
        await AsyncStorage.setItem('@UserData', JSON.stringify(userInfo));
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
        <AuthContext.Provider value={{ authData, loading, signIn, signOut, signUp, setUserInfo, userInfo, pushNotificationStatus, setPushNotificationStatus }}>
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