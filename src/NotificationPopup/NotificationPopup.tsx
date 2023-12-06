import React, {FC, useEffect} from 'react';
import styles from './NotificationPopup.module.css';
import {NotificationType} from '../models/NotificationModel';
import {useNotificationState} from '../contexts/notificationContext';

interface NotificationPopupProps {
    duration?: number;
}

const NotificationPopup: FC<NotificationPopupProps> = ({duration}) => {
    const [notification, setNotification] = useNotificationState();

    useEffect(() => {
        if (notification) {
            const timeout = setTimeout(() => {
                setNotification(undefined);
            }, duration || 5000);

            return () => clearTimeout(timeout);
        }
    }, [notification, duration]);

    const handleClose = () => {
        setNotification(undefined);
    };

    const getNotificationClassName = () => {
        if (notification) {
            switch (notification.type) {
                case NotificationType.INFO:
                    return styles.info;
                case NotificationType.WARNING:
                    return styles.warning;
                case NotificationType.SUCCESS:
                    return styles.success;
                case NotificationType.ERROR:
                    return styles.error;
                default:
                    return '';
            }
        }
    };

    return (
        <>
            {notification && (
                <div
                    className={`${styles.notification} ${getNotificationClassName()}`}
                    onClick={handleClose}
                >
                    <div className={styles.content}>
                        <h3 className={styles.title}>{notification.title}</h3>
                        <p className={styles.message}>{notification.message}</p>
                    </div>
                    <button className={`${styles.closeButton} ${getNotificationClassName()}`} onClick={handleClose}>
                        &times;
                    </button>
                </div>
            )}
        </>
    );
};

export default NotificationPopup;