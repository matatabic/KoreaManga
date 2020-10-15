import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import BookServices from "@/services/book";
import {RootState} from "@/models/index";
import storage, {load} from '@/config/storage';


export interface IPagination {
    current_page: number;
    total: number;
    hasMore: boolean;
}

export interface IBook {
    id: string;
    title: string;
    image?: string;
    author?: string;
    category?: string;
    status?: string;
    statusColor?: string;
}

export interface IIntro {
    [key: string]: IBook[];
}

export interface SearchState {
    introList: IIntro[];
    simpleList: IBook[];
    bookList: IBook[];
    searchHistoryList: string[];
    searchTitle: string;
    refreshing: boolean;
    showSimpleView: boolean,
    showBookView: boolean,
    pagination: IPagination;
}

interface HomeModel extends Model {
    namespace: 'search';
    state: SearchState;
    reducers: {
        setState: Reducer<SearchState>;
    };
    effects: {
        loadData: Effect;
        fetchIntroList: Effect;
        fetchSimpleList: Effect;
        fetchBookList: Effect;
        saveSearch: Effect;
        destroyHistory: Effect;
        clearHistory: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}


export const initialState = {
    introList: [],
    simpleList: [],
    bookList: [],
    searchHistoryList: [],
    searchTitle: '',
    refreshing: false,
    showSimpleView: false,
    showBookView: false,
    pagination: {
        current_page: 1,
        page_size: 9,
        total: 0,
        hasMore: false,
    }
};

const searchModel: HomeModel = {
    namespace: 'search',
    state: initialState,
    reducers: {
        setState(state = initialState, {payload}) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *loadData(_, {call, put}) {
            const searchHistoryList = yield call(load, {key: 'searchHistoryList'});
            if (searchHistoryList) {
                yield put({
                    type: 'setState',
                    payload: {
                        searchHistoryList,
                    },
                });
            }
        },
        *fetchIntroList(_, {call, put}) {
            const {data} = yield call(BookServices.getIntro);
            yield put({
                type: 'setState',
                payload: {
                    introList: data,
                },
            });
        },
        *fetchSimpleList({payload}, {call, put}) {
            console.log('fetchSimpleListfetchSimpleListfetchSimpleListfetchSimpleList')
            const {data} = yield call(BookServices.getList, payload);
            yield put({
                type: 'setState',
                payload: {
                    simpleList: data.list,
                },
            });
        },
        *fetchBookList(action, {call, put, select}) {
            const {payload, type} = action;
            const {refreshing} = payload;
            console.log(action)
            console.log('fetchBookListfetchBookListfetchBookListfetchBookList')
            const {bookList: list, pagination} = yield select(
                (state: RootState) => state['search'],
            );

            yield put({
                type: 'setState',
                payload: {
                    refreshing
                },
            });

            const page = refreshing ? {'current_page': 1} : {'current_page': pagination.current_page + 1};

            const {data} = yield call(BookServices.getList, {...payload, ...page});

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: 'setState',
                payload: {
                    bookList: newList,
                    refreshing: false,
                    pagination: {
                        current_page: data.pages.current_page,
                        total: data.pages.total,
                        hasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    },
                }
            });

            if (action.callback) {
                action.callback();
            }
        },
        *saveSearch({payload}, {call, put, select}) {
            let {searchHistoryList} = yield select(
                ({search}: RootState) => search,
            );

            if (payload.data) {
                searchHistoryList.unshift(payload.data)

                yield put({
                    type: 'setState',
                    payload: {
                        searchHistoryList
                    }
                })

                storage.save({
                    key: 'searchHistoryList',
                    data: searchHistoryList,
                })
            }
        },
        *destroyHistory(_, {put}) {
            yield put({
                type: 'setState',
                payload: {
                    searchHistoryList: []
                }
            })

            storage.save({
                key: 'searchHistoryList',
                data: [],
            })
        },
        *clearHistory({payload}, {put, select}) {
            let {searchHistoryList: list} = yield select(
                ({search}: RootState) => search,
            );

            const searchHistoryList = list.filter((item: string, index: number) => index != payload.index)

            yield put({
                type: 'setState',
                payload: {
                    searchHistoryList
                }
            })

            storage.save({
                key: 'searchHistoryList',
                data: searchHistoryList,
            })
        }
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'loadData'});
        },
        asyncStorage() {
            storage.sync.searchHistoryList = async () => {
                return null;
            };
        },
    },
};

export default searchModel;
