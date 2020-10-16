import {Effect, Model, SubscriptionsMapObject} from "dva-core-ts";
import {Reducer} from "redux";
import {RootState} from "@/models/index";
import {IBook} from "@/models/home";
import CategoryServices from "@/services/category";
import BookServices from "@/services/book";
import storage, {load} from "@/config/storage";

export interface ICategory {
    id: string;
    name: string;
}

export interface IStatus {
    id: string;
    title: string;
}

export interface IPagination {
    current_page: number;
    total: number;
    hasMore: boolean;
}

export interface CategoryState {
    categoryList: ICategory[];
    bookList: IBook[];
    statusList: IStatus[];
    activeStatus: string;
    activeModel: string;
    activeCategory: string;
    refreshing: boolean;
    hideHeader: boolean;
    pagination: IPagination;
}

interface CategoryModel extends Model {
    namespace: 'category';
    state: CategoryState;
    reducers: {
        setState: Reducer<CategoryState>;
    };
    effects: {
        loadData: Effect;
        fetchCategoryList: Effect;
        fetchBookList: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}

const initialState = {
    categoryList: [],
    bookList: [],
    statusList: [],
    activeStatus: '1',
    activeModel: '',
    activeCategory: '0',
    refreshing: false,
    hideHeader: false,
    pagination: {
        current_page: 1,
        total: 0,
        hasMore: false,
    }
};

const categoryModel: CategoryModel = {
    namespace: 'category',
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
        *fetchCategoryList(_, {call, put}) {
            const {data} = yield call(CategoryServices.getList);
            yield put({
                type: 'setState',
                payload: {
                    categoryList: data,
                },
            });
        },
        *loadData(_, {call, put}) {
            const statusList = yield call(load, {key: 'statusList'});
            yield put({
                type: 'setState',
                payload: {
                    statusList
                },
            });
        },
        *fetchBookList(action, {call, put, select}) {
            const {payload, type} = action;
            const {refreshing} = payload;

            const namespace = type.split('/')[0];

            const {bookList: list, pagination} = yield select(
                (state: RootState) => state[namespace],
            );

            yield put({
                type: 'setState',
                payload: {
                    refreshing,
                },
            });

            const page = refreshing ? 1 : (pagination.current_page + 1);

            const {data} = yield call(BookServices.getList, {
                page_size: 9,
                current_page: page,
                category_id: payload.category_id,
                status: payload.status,
            });

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
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'loadData'});
        },
        asyncStorage() {
            storage.sync.statusList = async () => {
                const data = await CategoryServices.getStatus();
                return data.data;
            };
        },
    },
};

export default categoryModel;
