import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import ShelfServices from "@/services/shelf";
import {RootState} from "@/models/index";


export interface ICollection {
    id: string;
    book_id: string;
    title: string;
    image: string;
    chapter_info: string;
}

interface IPagination {
    current_page: number;
    page_size: number;
    total: number;
}

export interface ShelfState {
    collectionList: ICollection[];
    refreshing: boolean;
    hasMore: boolean;
    pagination: IPagination;
}

interface ShelfModel extends Model {
    namespace: 'shelf';
    state: ShelfState;
    reducers: {
        setState: Reducer<ShelfState>;
    };
    effects: {
        fetchCollectionList: Effect;
    };
}

const initialState = {
    collectionList: [],
    refreshing: false,
    hasMore: false,
    pagination: {
        current_page: 0,
        page_size: 0,
        total: 0,
    }
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

            const {collectionList: list, pagination} = yield select(
                (state: RootState) => state[namespace],
            );

            yield put({
                type: 'setState',
                payload: {
                    refreshing,
                },
            });

            const page = refreshing ? 1 : pagination.current_page + 1;

            const {data} = yield call(ShelfServices.getCollection, {
                page_size: 9,
                current_page: page,
            });

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: 'setState',
                payload: {
                    collectionList: newList,
                    refreshing: false,
                    hasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    pagination: {
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
