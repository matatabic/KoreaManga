import {Effect, Model} from "dva-core-ts";
import {Reducer} from "redux";
import CategoryServices from "@/services/category";
import {RootState} from "@/models/index";
import {IBookCover} from "@/models/home";


export interface ICategory {
    id: string;
    name: string;
}

export interface bookReqParam {
    page_size: number,
    current_page: number,
    category_id?: number,
    status: number,
}

export interface IPagination {
    current_page: number;
    total: number;
    hasMore: boolean;
}

export interface CategoryState {
    categoryList: ICategory[];
    bookList: IBookCover[];
    activeStatus: number;
    activeModel: string;
    activeCategory: number;
    refreshing: boolean;
    loading: boolean;
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
        fetchCategoryList: Effect;
        fetchBookList: Effect;
    };
}

const initialState = {
    categoryList: [],
    bookList: [],
    activeStatus: 1,
    activeModel: '',
    activeCategory: 0,
    refreshing: false,
    loading: false,
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
            const {data} = yield call(CategoryServices.getCategoryList,);
            yield put({
                type: 'setState',
                payload: {
                    categoryList: data,
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

            const {data} = yield call(CategoryServices.getBookList, {
                page_size: 9,
                current_page: page,
                category_id: payload.category_id,
                status: payload.status,
            });

            const newList = refreshing ? data.list : list.concat(data.list);

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
                },
            });

            if (action.callback) {
                action.callback();
            }
        },
    },
};

export default categoryModel;
