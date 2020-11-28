import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import ShelfServices from "@/services/shelf";
import {RootState} from "@/models/index";
import _ from 'lodash';

export interface ICollection {
    id: string;
    book_id: string;
    title: string;
    image: string;
    chapter_info: string;
}

export interface IHistory {
    id: number;
    book_id: number;
    title: string;
    image: string;
    chapter_id: number;
    chapter_num: number;
    roast: number;
}


export interface IHistoryList {
    title: string;
    data: IHistory[][];
}

interface IPagination {
    current_page: number;
    page_size: number;
    total: number;
}

export interface ShelfState {
    collectionList: ICollection[];
    historyList: IHistoryList[];
    collectionHasMore: boolean;
    collectionPagination: IPagination;
    historyHasMore: boolean;
    historyPagination: IPagination;
    refreshing: boolean;
    isEdit: boolean;
}

interface ShelfModel extends Model {
    namespace: 'shelf';
    state: ShelfState;
    reducers: {
        setState: Reducer<ShelfState>;
    };
    effects: {
        fetchCollectionList: Effect;
        fetchHistoryList: Effect;
    };
}


const initialState = {
    collectionList: [],
    historyList: [],
    collectionHasMore: false,
    collectionPagination: {
        current_page: 0,
        page_size: 0,
        total: 0,
    },
    historyHasMore: false,
    historyPagination: {
        current_page: 0,
        page_size: 0,
        total: 0,
    },
    refreshing: false,
    isEdit: false,
};

const shelfModel: ShelfModel = {
    namespace: 'shelf',
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
        *fetchCollectionList(action, {call, put, select}) {
            const {payload, type} = action;
            const {refreshing} = payload;

            const namespace = type.split('/')[0];

            const {collectionList: list, collectionPagination: pagination} = yield select(
                (state: RootState) => state[namespace],
            );

            yield put({
                type: 'setState',
                payload: {
                    refreshing,
                },
            });

            const {data} = yield call(ShelfServices.getCollection, {
                page_size: 9,
                current_page: refreshing ? 1 : pagination.current_page + 1,
            });

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: 'setState',
                payload: {
                    collectionList: newList,
                    refreshing: false,
                    collectionHasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    collectionPagination: {
                        current_page: data.pages.current_page,
                        page_size: data.pages.page_size,
                        total: data.pages.total,
                    },
                }
            });

            if (action.callback) {
                action.callback();
            }
        },
        *fetchHistoryList(action, {call, put, select}) {
            const {payload, type} = action;
            const {refreshing} = payload;

            const namespace = type.split('/')[0];

            const {historyList: list, historyPagination: pagination} = yield select(
                (state: RootState) => state[namespace],
            );

            yield put({
                type: 'setState',
                payload: {
                    refreshing,
                },
            });

            const {data} = yield call(ShelfServices.getHistory, {
                page_size: 6,
                current_page: refreshing ? 1 : pagination.current_page + 1,
            });


            let newList = [];

            if (refreshing) {
                newList = data.list;
            } else {
                newList = [...list, ...data.list];
                newList = newList.reduce((pre, cur) => {
                    const index = pre.findIndex((i: { title: any; }) => cur.title === i.title)
                    if (index < 0) {
                        pre.push(cur)
                    } else {
                        pre[index].data = pre[index].data.concat(cur.data)
                    }
                    return pre;
                }, [])
            }

            yield put({
                type: 'setState',
                payload: {
                    historyList: newList,
                    refreshing: false,
                    historyHasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    historyPagination: {
                        current_page: data.pages.current_page,
                        page_size: data.pages.page_size,
                        total: data.pages.total,
                    },
                }
            });

            if (action.callback) {
                action.callback();
            }
        },
    },

};

export default shelfModel;
