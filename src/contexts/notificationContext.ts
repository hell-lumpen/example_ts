import {createContext, useContext} from "react";
import {NotificationState} from "../models/NotificationModel";

export const NotificationContext = createContext<NotificationState | undefined>(undefined);

export function useNotificationState() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('NotificationContext must be used within a NotificationProvider');
    }
    return context;
}