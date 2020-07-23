export interface AuthUser {
    token?: string;
    id?: string;
    expiresAt?: string;
    email?: string;
    image?: string;
    name?: string;
    loggedIn?: boolean;
}
