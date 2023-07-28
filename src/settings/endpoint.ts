export enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface Endpoint {
  url: string;
  method: Method;
}

interface AuthEndpoint {
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

interface EndpointList {
  auth: AuthEndpoint;
  user: UserEndpoint;
}

const authEndpoints: AuthEndpoint = {
  login: {
    url: '/user/login',
    method: Method.POST,
  },
  logout: {
    url: '/user/logout',
    method: Method.POST,
  },
};

const userEndpoints: UserEndpoint = {
  forgotPassword: {
    method: Method.POST,
    url: '/forgot-password/generate',
  },
  getProfilePicture: {
    url: '/media/profile_picture/',
    method: Method.GET,
  },
  acviteUser: {
    url: '/user/active',
    method: Method.GET,
  },
  getProfileUser: {
    url: '/user/profile',
    method: Method.GET,
  },
  updateProfilePictureUser: {
    url: '/user/update/profile-picture/',
    method: Method.POST,
  },
  updateGeneralUser: {
    url: '/user/update/',
    method: Method.POST,
  },
  changePassword: {
    url: '/user/change-password',
    method: Method.PUT,
  },
  changeForgotPassword: {
    url: '/user/forgot-password',
    method: Method.PUT,
  },
  validateForgotPassword: {
    url: '/forgot-password/validate',
    method: Method.POST,
  },
};

export const endpoints: EndpointList = {
  auth: authEndpoints,
  user: userEndpoints,
};