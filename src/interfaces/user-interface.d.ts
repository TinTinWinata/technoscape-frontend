export interface ILoginForm {
    email: string;
    password: string;
}

export interface ISession {
    id: string;
    email: string;
    refresh_token: string;
    access_token: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
}
