export enum Method {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE",
}

export interface Endpoint {
    url: string;
    method: Method;
}

interface AuthEndpoint {
    register: Endpoint;
    login: Endpoint;
    logout: Endpoint;
}

interface UserEndpoint {
    forgotPassword: Endpoint;
    getProfilePicture: Endpoint;
    acviteUser: Endpoint;
    updateProfilePictureUser: Endpoint;
    updateGeneralUser: Endpoint;
    getProfileUser: Endpoint;
    changePassword: Endpoint;
    changeForgotPassword: Endpoint;
    validateForgotPassword: Endpoint;
}

interface LoanEndpoint {
    crateLoanApproval: Endpoint;
    acceptLoan: Endpoint;
    approveLoanApproval: Endpoint;
    getLoan: Endpoint;
    payLoan: Endpoint;
}

interface EndpointList {
    auth: AuthEndpoint;
    user: UserEndpoint;
    loan: LoanEndpoint;
}

const authEndpoints: AuthEndpoint = {
    login: {
        url: "/user/login",
        method: Method.POST,
    },
    logout: {
        url: "/user/logout",
        method: Method.POST,
    },
    register: {
        url: "/user/auth/create",
        method: Method.POST,
    },
};

const userEndpoints: UserEndpoint = {
    forgotPassword: {
        method: Method.POST,
        url: "/forgot-password/generate",
    },
    getProfilePicture: {
        url: "/media/profile_picture",
        method: Method.GET,
    },
    acviteUser: {
        url: "/user/active",
        method: Method.GET,
    },
    getProfileUser: {
        url: "/user/profile",
        method: Method.GET,
    },
    updateProfilePictureUser: {
        url: "/user/update/profile-picture",
        method: Method.POST,
    },
    updateGeneralUser: {
        url: "/user/update",
        method: Method.POST,
    },
    changePassword: {
        url: "/user/change-password",
        method: Method.PUT,
    },
    changeForgotPassword: {
        url: "/user/forgot-password",
        method: Method.PUT,
    },
    validateForgotPassword: {
        url: "/forgot-password/validate",
        method: Method.POST,
    },
};

export const loanEndpoints: LoanEndpoint = {
    crateLoanApproval: {
        url: "/loan/approval",
        method: Method.POST,
    },
    acceptLoan: {
        url: "/loan/accept",
        method: Method.POST,
    },
    approveLoanApproval: {
        url: "/loan/approval/approve",
        method: Method.PUT,
    },
    getLoan: {
        url: "/loan/get",
        method: Method.GET,
    },
    payLoan: {
        url: "/loan/pay",
        method: Method.POST,
    },
};

export const endpoints: EndpointList = {
    auth: authEndpoints,
    user: userEndpoints,
    loan: loanEndpoints,
};
