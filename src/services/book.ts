import axios from "axios";

const BOOK_URL = '/book/getBookList';
const CAROUSEL_URL = '/carousel/getCarouselList';
const COMMEND_URL = '/book/getCommendList';

interface params {
    category_id: string;
    page_size: number;
    current_page: number;
    status: string;
    title?: string;
}

async function getBookList(params: params) {
    return axios.get(BOOK_URL, {
        params
    });
}

async function getCarouselList() {
    return axios.get(CAROUSEL_URL);
}

async function getCommendList() {
    return axios.get(COMMEND_URL);
}

export default {
    getBookList,
    getCarouselList,
    getCommendList,
};
