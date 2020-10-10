import axios from "axios";


const CATEGORY_URL = '/category/getCategoryList';


async function getCategoryList() {
    return axios.get(CATEGORY_URL);
}


export default {
    getCategoryList,
};
