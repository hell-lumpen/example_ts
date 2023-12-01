import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {NotificationProvider} from "./contexts/providers/notificationProvider";
import {AuthenticatedUserProvider} from "./contexts/providers/authenticatedUserProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <NotificationProvider>
            <AuthenticatedUserProvider>
            <>
                <App/>
            </>
            </AuthenticatedUserProvider>
        </NotificationProvider>
    </React.StrictMode>
);