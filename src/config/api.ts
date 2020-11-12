// book
const BOOK_URL = '/book/getList';
const CAROUSEL_URL = '/carousel/getList';
const COMMEND_URL = '/book/getCommend';
const INTRO_URL = '/book/getIntro';
//brief
const BRIEF_URL = '/brief/getList';
const ADD_COLLECTION_URL = 'collection/addUserCollection';
const DEL_COLLECTION_URL = 'collection/delUserCollection';
//category
const CATEGORY_URL = '/category/getList';
const STATUS_URL = '/status/getList';
const CATEGORY_TREE_URL = '/category/getTreeList';
//episode
const EPISODE_URL = '/episode/getList';
//user
const LOGIN_URL = '/passport/login';
const LOGOUT_URL = '/passport/logout';

const WHITE_LIST = [
    BOOK_URL,
    CAROUSEL_URL,
    COMMEND_URL,
    INTRO_URL,
    CATEGORY_TREE_URL,
    LOGIN_URL,
];

export {WHITE_LIST}

export {
    BOOK_URL,
    CAROUSEL_URL,
    COMMEND_URL,
    INTRO_URL,
    BRIEF_URL,
    ADD_COLLECTION_URL,
    DEL_COLLECTION_URL,
    CATEGORY_URL,
    STATUS_URL,
    CATEGORY_TREE_URL,
    EPISODE_URL,
    LOGIN_URL,
    LOGOUT_URL
};
