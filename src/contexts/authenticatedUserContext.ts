import React, {createContext, useContext} from "react";
import {AuthenticatedUser} from "../models/AuthenticatedUser";

export const AuthenticatedUserContext = createContext<[AuthenticatedUser | undefined, React.Dispatch<React.SetStateAction<AuthenticatedUser | undefined>>]>([undefined, () => {}]);

export function useAuthenticatedUserState ()  {
    return useContext(AuthenticatedUserContext);
}