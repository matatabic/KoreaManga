import axios from "axios";

const LOGIN_URL = '/passport/login';


export interface IParams {
    account:string;
    password:string;
}

export async function Login(params: IParams) {
    return axios.post(LOGIN_URL,
        params
    );
}

export default {
    Login,
};
