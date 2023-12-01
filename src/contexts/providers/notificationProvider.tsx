import React, { ReactNode, useEffect, useState } from "react";
import { Notification, NotificationState } from "../../models/NotificationModel";
import { NotificationContext } from "../notificationContext";

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [currentNotification, setCurrentNotification] = useState<Notification>({
        type: undefined,
        title: undefined,
        message: undefined,
    });

    const clearNotification = () => {
        setCurrentNotification({ type: undefined, title: undefined, message: undefined });
    };

    useEffect(() => {
        const clearNotificationTimeoutId = setTimeout(clearNotification, 5000);

        return () => clearTimeout(clearNotificationTimeoutId);
    }, [currentNotification]);

    const notificationContextValue: NotificationState = {
        notification: currentNotification,
        setNotification: setCurrentNotification,
    };

    return (
        <NotificationContext.Provider value={notificationContextValue}>
            {children}
        </NotificationContext.Provider>
    );
};