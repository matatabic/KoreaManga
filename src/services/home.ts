import axios from "axios";

const CAROUSEL_URL = '/carousel/getCarouselList';
const COMMEND_URL = '/book/getCommendList';

async function getCarouselList() {
    return axios.get(CAROUSEL_URL);
}

async function getCommendList() {
    return axios.get(COMMEND_URL);
}

export default {
    getCarouselList,
    getCommendList,
};
