import React from 'react';
import {useAuthenticatedUserState} from "../contexts/authenticatedUserContext";
import {useNotificationState} from "../contexts/notificationContext";

const TokenViewer = () => {
    const [user, setUser] = useAuthenticatedUserState();
    return (
        <div>
            User: {JSON.stringify(user, null, 2)}
        </div>
    );
};

export default TokenViewer;
