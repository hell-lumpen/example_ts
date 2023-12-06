import {AuthenticatedUser, UserCredentials} from "../models/AuthenticatedUser";
import {jwtDecode} from "jwt-decode";
import axios, { AxiosResponse, AxiosError } from 'axios';

interface JwtCustomPayload {
    exp: number;
    fullName: string;
    iat: number;
    role: string;
    sub: string;
}


const LC_TOKEN_KEY = 'SC_AUTH_TOKEN'

function saveToken(jwt: string) {
    localStorage.setItem(LC_TOKEN_KEY, jwt)
}

export function getToken(): string | null {
    return localStorage.getItem(LC_TOKEN_KEY);
}

export function deleteToken() {
    return localStorage.removeItem(LC_TOKEN_KEY);
}

export async function login(credentials: UserCredentials): Promise<AuthenticatedUser> {
    console.log('Login request ' + JSON.stringify(credentials))
    return axios.post('http://localhost:8080/api/auth/login', credentials)
        .then((response: AxiosResponse) => {
            if (response.data && response.data.token) {
                const token: string = response.data.token;
                saveToken(token);
                return restoreAuthUserFromJWT(token);
            } else {
                throw new Error('Invalid response format');
            }
        })
        // .catch((error: AxiosError | Error) => {
        //     if (axios.isAxiosError(error)) {
        //         const axiosError: AxiosError = error;
        //
        //         if (axiosError.response) {
        //             // Ошибка от сервера с кодом ответа
        //             throw error;
        //         } else if (axiosError.request) {
        //             // Ошибка запроса без ответа
        //             throw error;
        //         } else {
        //             // Другие ошибки
        //             throw error;
        //         }
        //     } else {
        //         // Другие ошибки, не связанные с Axios
        //         throw error;
        //     }
        // });
}


export function restoreAuthUserFromJWT(): AuthenticatedUser;
export function restoreAuthUserFromJWT(jwt: string): AuthenticatedUser;

export function restoreAuthUserFromJWT(jwt?: string): AuthenticatedUser | undefined {

    function decode(jwt: string): JwtCustomPayload {
        return jwtDecode<JwtCustomPayload>(jwt);
    }

    let decodedToken: JwtCustomPayload | null = null;

    if (jwt === undefined) {
        const jwt = getToken()
        if (!jwt) {
            console.error('token not found in LC');
            return undefined;
        }
        decodedToken = decode(jwt);
    }
    else {
        decodedToken = decode(jwt);
    }

    return {fullName: decodedToken.fullName, role: decodedToken.role}
}