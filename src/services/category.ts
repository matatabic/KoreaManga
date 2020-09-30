import axios from "axios";

const BOOK_URL = '/book/getBookList';
const CATEGORY_URL = '/category/getCategoryList';

interface params {
    category_id: string;
    page_size: number;
    current_page: string;
    status: string;
}

async function getBookList(data: params) {
    return axios.get(BOOK_URL, {
        params: {
            ...data
        },
    });
}

async function getCategoryList() {
    return axios.get(CATEGORY_URL);
}


export default {
    getBookList,
    getCategoryList,
};
