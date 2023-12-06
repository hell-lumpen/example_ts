import React, {ReactNode, useState} from "react";
import {NotificationContext} from "../notificationContext";
import {CustomNotification} from '../../models/NotificationModel';

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({children}) => {
    const notificationState = useState<CustomNotification | undefined>(undefined);

    return (
        <NotificationContext.Provider value={notificationState}>
            {children}
        </NotificationContext.Provider>
    );
};