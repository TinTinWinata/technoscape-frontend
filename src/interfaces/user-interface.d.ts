export interface ISession {
    uid: number;
    phoneNumber: string;
    gender: string;
    createTime: number;
    ktpId: string;
    updateTime: number;
    birthDate: string;
    email: string;
    username: string;
    accessToken: string;
    role: string;
    is_approved: boolean;
}

export interface IResetPassword {
    current_password: string;
    forgot_password_link_id: string | undefined;
}
