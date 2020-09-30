import axios from "axios";

const CHAPTER_URL = '/brief/getBrief';

interface params {
    book_id: number
}

export async function getBrief(data: params) {
    return axios.get(CHAPTER_URL, {
        params: {
            ...data
        }
    });
}

export default {
    getBrief,
};
