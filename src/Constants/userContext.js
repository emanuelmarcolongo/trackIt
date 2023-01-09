import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({
    userInfo: {},
    progress: 0,
    setUserInfo: () => {},
    setProgress: () => {}
});

export const UserProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const localInfo = localStorage.getItem('token');
        if (localInfo) {
            setUserInfo({...userInfo})
        }
    }, [])

    const value = {userInfo, setUserInfo, progress, setProgress};

    return (
         <UserContext.Provider value={value}>
            {children}
         </UserContext.Provider>
        
    )
};