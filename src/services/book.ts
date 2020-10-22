import axios from "axios";

const BOOK_URL = '/book/getList';
const CAROUSEL_URL = '/carousel/getList';
const COMMEND_URL = '/book/getCommend';
const INTRO_URL = '/book/getIntro';

interface params {
    category_id: string;
    page_size: number;
    current_page: number;
    status: string;
    title?: string;
}

async function getList(params: params) {
    return axios.get(BOOK_URL, {
        params
    });
}

async function getCarousel() {
    return axios.get(CAROUSEL_URL);
}

async function getCommend(params: any) {
    return axios.get(COMMEND_URL,{
        params
    });
}

async function getIntro() {
    return axios.get(INTRO_URL);
}

export default {
    getList,
    getCarousel,
    getCommend,
    getIntro,
};
