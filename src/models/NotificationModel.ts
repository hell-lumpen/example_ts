export enum NotificationType {
    INFO,
    WARNING,
    SUCCESS,
    ERROR
}

export interface CustomNotification {
    type: NotificationType;
    title: string;
    message: string;
}