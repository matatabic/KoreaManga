import axios from "axios";

const CHAPTER_URL = '/brief/getBrief';

interface BriefReqPrams {
    book_id: number
}

export async function getBrief(data: BriefReqPrams) {
    return axios.get(CHAPTER_URL, {
        params: {
            ...data
        }
    });
}

export default {
    getBrief,
};
