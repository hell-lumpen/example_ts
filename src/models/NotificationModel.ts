import React from "react";

export enum NotificationType {
    INFO,
    WARNING,
    SUCCESS,
    ERROR
}

export interface Notification {
    type: NotificationType | undefined;
    title: string | undefined;
    message: string | undefined;
}

export interface NotificationState {
    notification: Notification;
    setNotification: React.Dispatch<React.SetStateAction<Notification>>;
}