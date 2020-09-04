import axios from "axios";

const CAROUSEL_URL = '/carousel/getCarouselList';
const GUESS_URL = '/book/getGuessList';
const COMMEND_URL = '/book/getCommendList';

async function getCarouselList() {
    return axios.get(CAROUSEL_URL);
}

async function getGuessList() {
    return axios.get(GUESS_URL);
}

async function getCommendList() {
    return axios.get(COMMEND_URL);
}

export default {
    getCarouselList,
    getGuessList,
    getCommendList,
};
