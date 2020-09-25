import axios from "axios";

const BOOK_URL = '/book/getBookList';
const CATEGORY_URL = '/category/getCategoryList';


async function getBookList(data: any) {
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
