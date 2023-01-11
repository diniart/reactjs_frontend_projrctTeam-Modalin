import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    // for check current user when browser was refreshed
    const currentUser = JSON.parse(localStorage.getItem("user"))
    
    // state for user 
    const [user, setUser] = useState(currentUser)

    return( 
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    
    )
}


