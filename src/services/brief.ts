import axios from "axios";

const CHAPTER_URL = '/chapter/getChapterList';

async function getChapterList(id: number) {
    return axios.get(CHAPTER_URL, {
        params: {
            book_id: id
        }
    });
}

export default {
    getChapterList,
};
