import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from './LoginForm.module.css';
import {UserCredentials} from "../models/AuthenticatedUser";

interface LoginFormProps {
    setAuthenticatedUserToken: Dispatch<SetStateAction<string | undefined>>,
}

const LoginForm: React.FC<LoginFormProps> = ({setAuthenticatedUserToken}) => {
    const [successAuth, setSuccessAuth] = useState(true);
    const [credentials, setCredentials] = useState<UserCredentials>({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Отправлены следующие учетные данные:', credentials);
        if (credentials.username !== '123') {
            setSuccessAuth(false);
            setCredentials({username: '', password: ''})
        }
        else {
            setSuccessAuth(true);
            setAuthenticatedUserToken(credentials.username + credentials.password);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Логин:
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>
                <label>
                    Пароль:
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>
                {!successAuth && (
                    <p style={{color: "red"}}>
                        Ошибка аутентификации: неверный логин или пароль
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