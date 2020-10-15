import axios from "axios";


const CATEGORY_URL = '/category/getList';
const CATEGORY_TREE_URL = '/category/getTreeList';

async function getList() {
    return axios.get(CATEGORY_URL);
}

async function getTreeList() {
    return axios.get(CATEGORY_TREE_URL);
}

export default {
    getList,
    getTreeList,
};
