import React, {createContext, useContext} from "react";
import {CustomNotification} from "../models/NotificationModel";

export const NotificationContext = createContext<[CustomNotification | undefined, React.Dispatch<React.SetStateAction<CustomNotification | undefined>>]>([undefined, () => {
}]);

export function useNotificationState() {
    return useContext(NotificationContext);
}