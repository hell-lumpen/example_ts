import React, {useState} from 'react';
import styles from './LoginForm.module.css';
import {UserCredentials} from "../models/AuthenticatedUser";
import {login} from "../services/authService";
import {useAuthenticatedUserState} from "../contexts/authenticatedUserContext";
import {useNotificationState} from "../contexts/notificationContext";
import {NotificationType} from "../models/NotificationModel";


interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = () => {
    const [authenticatedUser, setAuthenticatedUser] = useAuthenticatedUserState();

    const [successAuth, setSuccessAuth] = useState(true);
    const [credentials, setCredentials] = useState<UserCredentials>({
        username: '',
        password: '',
    });

    const [notification, setNotification] = useNotificationState();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuccessAuth(true);
        const {name, value} = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };


    const handleUserLoginButtonClick = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = await login(credentials);
            setAuthenticatedUser(user);

            setNotification({
                type: NotificationType.INFO,
                title: 'Успешный вход',
                message: 'Подробное сообщение об успешном входе'
            });
        } catch (error: any) {
            setNotification({
                type: NotificationType.ERROR,
                title: 'Произошла ошибка во время авторизации',
                message: error.message
            });
        }
    };


    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleUserLoginButtonClick} className={styles.form}>
                <label>
                    Логин:
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </label>
                <label>
                    Пароль:
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </label>
                {!successAuth && (
                    <p className={styles.error}>
                        Ошибка аутентификации
                    </p>
                )}
                <button type="submit" className={styles.button}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default LoginForm;