import axios from "axios";
import {EPISODE_URL} from "@/config/api";


export interface IParams {
    book_id: number,
    sort: number,
    page_size: number,
    current_page: number,
}

export async function getList(params: IParams) {
    return axios.get(EPISODE_URL, {
        params
    });
}

export default {
    getList,
};
