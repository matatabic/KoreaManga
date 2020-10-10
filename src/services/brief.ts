import axios from "axios";

const CHAPTER_URL = '/brief/getBrief';

interface params {
    book_id: number
}

export async function getBrief(params: params) {
    return axios.get(CHAPTER_URL, {
        params
    });
}

export default {
    getBrief,
};
