import React from 'react';
import {useAuthenticatedUserState} from "../contexts/authenticatedUserContext";
import {useNotificationState} from "../contexts/notificationContext";

const TokenViewer = () => {
    const [user, setUser] = useAuthenticatedUserState();
    const {notification} = useNotificationState();
    return (
        <div>
            User: {JSON.stringify(user, null, 2)}
            <br/>
            {notification.message && (
                <div>
                    Notification: {notification.message}
                </div>
            )}
        </div>
    );
};

export default TokenViewer;
