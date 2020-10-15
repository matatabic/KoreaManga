import {Effect, Model, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import {RootState} from '@/models/index';
import CategoryServices from "@/services/category";

export interface ICategory {
    id: string;
    name: string;
    classify?: string;
}

export interface ICategories {
    [key: string]: ICategory[];
}

interface CategorySettingModelState {
    isEdit: boolean;
    myCategories: ICategory[];
    categories: ICategories[];
}

interface CategorySettingModel extends Model {
    namespace: 'categorySetting';
    state: CategorySettingModelState;
    reducers: {
        setState: Reducer<CategorySettingModelState>;
    };
    effects: {
        loadData: Effect;
        toggle: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}

const initialState = {
    isEdit: false,
    myCategories: [
        {id: '0', name: '全部'},
    ],
    categories: [],
};

const categorySettingModel: CategorySettingModel = {
    namespace: 'categorySetting',
    state: initialState,
    effects: {
        *loadData(_, {call, put}) {
            const myCategories = yield call(load, {key: 'myCategories'});
            const categories = yield call(load, {key: 'categories'});
            if (myCategories) {
                yield put({
                    type: 'setState',
                    payload: {
                        myCategories,
                        categories,
                    },
                });
            } else {
                yield put({
                    type: 'setState',
                    payload: {
                        categories,
                    },
                });
            }
        },
        *toggle({payload}, {put, select}) {
            const categorySetting = yield select(
                ({categorySetting}: RootState) => categorySetting,
            );
            yield put({
                type: 'setState',
                payload: {
                    isEdit: !categorySetting.isEdit,
                    myCategories: payload.myCategories,
                },
            })
            if (categorySetting.isEdit) {
                storage.save({
                    key: 'myCategories',
                    data: payload.myCategories,
                })
            }
        },
    },
    reducers: {
        setState(state, {payload}) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'loadData'});
        },
        asyncStorage() {
            storage.sync.categories = async () => {
                const data = await CategoryServices.getTreeList();
                return data.data;
            };
            storage.sync.myCategories = async () => {
                return null;
            };
        },
    },
};

export default categorySettingModel;
