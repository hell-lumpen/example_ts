import {createContext, useContext} from "react";

export const authenticatedUserContext = createContext<string | undefined>(undefined);

export function useAuthenticatedUser ()  {
    return useContext(authenticatedUserContext);
}