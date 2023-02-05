import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext, Children, useContext } from "react";
import ZIM from "zego-zim-react-native";

const AuthContext = createContext()
ZIM.create({
    appID: 1189528528,
    appSign: "f92ae0afb43b8dbaa49356a9491d1212555895cf630d197599c190581acc7ba3",
  });
var zim = ZIM.getInstance();


const AuthProvider = ({ children }) => {
    const [ authData, setAuthData ] = useState()
    const [ loading, setLoading ] = useState(true)
    const [ userInfo, setUserInfo ] = useState()

    useEffect(() => {
        loadStorageData();
    }, [])

    async function loadStorageData() {
        try {
            const AuthDataSerialized = await AsyncStorage.getItem("@AuthData")
            const ZimDataSerialized = await AsyncStorage.getItem('@ZimData')
            if (AuthDataSerialized) {
                const _authData = JSON.parse(String(AuthDataSerialized))
                setAuthData(_authData)
            }

            if (ZimDataSerialized) {
                const _zimData = JSON.parse(String(ZimDataSerialized));
                setUserInfo(_zimData);
                const success = await zim.login(_zimData);
                console.log('ZIM LOGIN SUCCEDDED', success)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    async function zimLogIn(data) {
        try {
            console.log(data)
            const res = await zim.login(data)
            console.log('ZIM LOGIN SUCCEDDED', res)
            setUserInfo({
                userID: data.userID,
                userName: data.userName
            })
            await AsyncStorage.setItem('@ZimData', JSON.stringify(data));
        } catch (error) {
            console.error(error)
        }
    }

    async function signUp(userInfo) {
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
        <AuthContext.Provider value={{ authData, loading, signIn, signOut, signUp, setUserInfo, userInfo, zimLogIn, zim }}>
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