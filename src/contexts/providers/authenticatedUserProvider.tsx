import React, {ReactNode, useState} from "react";
import {AuthenticatedUserContext} from "../authenticatedUserContext";
import {AuthenticatedUser} from "../../models/AuthenticatedUser";

interface AuthenticatedUserProviderProps {
    children: ReactNode
}

export const AuthenticatedUserProvider: React.FC<AuthenticatedUserProviderProps> = ({children}) => {
    const authenticatedUserState = useState<AuthenticatedUser | undefined>(undefined)
    return (
        <AuthenticatedUserContext.Provider value={authenticatedUserState}>
            {children}
        </AuthenticatedUserContext.Provider>
    )
}