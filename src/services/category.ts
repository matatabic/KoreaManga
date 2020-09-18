import axios from "axios";
import {bookReqParam} from '@/models/category'

const BOOK_URL = '/book/getBookList';
const CATEGORY_URL = '/category/getCategoryList';


async function getBookList(params: bookReqParam) {
    return axios.get(BOOK_URL, {
        params: {
            ...params
        }
    });
}

async function getCategoryList() {
    return axios.get(CATEGORY_URL);
}


export default {
    getBookList,
    getCategoryList,
};
