import axios from "axios";

const EPISODE_URL = '/episode/getList';


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
