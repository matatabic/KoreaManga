import axios from "axios";

const LOGIN_URL = '/passport/login';
const LOGOUT_URL = '/passport/logout';

export interface IParams {
    account: string;
    password: string;
}

export async function Login(params: IParams) {
    return axios.post(LOGIN_URL,
        params
    );
}

export async function logout() {
    return axios.post(LOGOUT_URL);
}

export default {
    Login,
    logout,
};
