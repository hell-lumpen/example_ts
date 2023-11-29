export interface UserCredentials {
    username: string,
    password: string,
};

export interface AuthenticatedUser {
    role: string,
    fullName: string,
}