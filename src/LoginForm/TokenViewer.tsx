import React from 'react';
import {useAuthenticatedUser} from "../contexts/authenticatedUserContext";

const TokenViewer = () => {
    const token = useAuthenticatedUser();
    return (
        <div>
            Token: {token}
        </div>
    );
};

export default TokenViewer;
