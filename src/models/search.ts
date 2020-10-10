import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import BookServices from "@/services/book";
import {RootState} from "@/models/index";


export interface IPagination {
    current_page: number;
    total: number;
    hasMore: boolean;
}

export interface IBook {
    id: string;
    title: string;
    image: string;
    author: string;
    category: string;
    status: string;
    statusColor: string;
}


export interface SearchState {
    searchList: any[];
    simpleList: IBook[];
    bookList: IBook[];
    searchValue: string,
    refreshing: boolean;
    hasSearch: boolean;
    showDetail: boolean;
    pagination: IPagination;
}

interface HomeModel extends Model {
    namespace: 'search';
    state: SearchState;
    reducers: {
        setState: Reducer<SearchState>;
    };
    effects: {
        fetchSimpleList: Effect;
        fetchBookList: Effect;
    };
}

const searchList = [
    ['海贼王', '一拳超人', '怪物8👌', '东京巴别塔'],
    ['青春辛德瑞拉', '我们在秘密交往'],
    ['恶役只有死亡结局'],
    ['因为成为了魔王的手下所以要毁掉原作漫画']
];

export const initialState = {
    searchList: searchList,
    simpleList: [],
    bookList: [],
    searchValue: '',
    refreshing: false,
    hasSearch: false,
    showDetail: false,
    pagination: {
        current_page: 1,
        page_size:5,
        total: 0,
        hasMore: false,
    }
};

const homeModel: HomeModel = {
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
        *fetchSimpleList({payload}, {call, put}) {
            const {data} = yield call(BookServices.getBookList, payload);
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

            const {data} = yield call(BookServices.getBookList, {...payload, ...page});

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
    },
};

export default homeModel;
