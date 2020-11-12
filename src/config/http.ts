import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from "@react-native-community/async-storage";
import {WHITE_LIST} from "@/config/api";

axios.defaults.baseURL = Config.API_URL;
axios.defaults.withCredentials = false;
//添加请求拦截器
axios.interceptors.request.use(
    async function (config) {
        console.log('相应数据request', config)
        if (config.url != null) {
            const needToken = WHITE_LIST.indexOf(config.url) > -1;
            if (!needToken) {
                let jsonValue: string | null = await AsyncStorage.getItem('userInfo');
                axios.defaults.headers.ACCESS_TOKEN = jsonValue != null ?
                    JSON.parse(jsonValue).rawData.token !== undefined ? JSON.parse(jsonValue).rawData.token : null
                    : null;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

//添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        console.log('响应数据response', response);
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);
