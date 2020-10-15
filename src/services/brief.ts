import axios from "axios";

const BRIEF_URL = '/brief/getList';

interface params {
    book_id: number
}

export async function getList(params: params) {
    return axios.get(BRIEF_URL, {
        params
    });
}

export default {
    getList,
};
