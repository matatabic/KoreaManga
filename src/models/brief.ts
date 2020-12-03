import {Effect, Model} from "dva-core-ts";
import {Reducer} from "redux";
import BriefServices from "@/services/brief";
import {StatusCode} from "@/utils/const";
import Toast from "react-native-root-toast";

export interface IChapter {
    id: string;
    title: string;
    name: string;
    roast: string;
}

export interface IInfo {
    id: string,
    title: string,
    image: string,
    category: string,
    author: string,
    description: string,
    status: string,
}

export interface BriefState {
    bookInfo: IInfo;
    collection_id: number;
    markChapter: string;
    markIndex: string;
    chapterList: IChapter[];
}

interface CategoryModel extends Model {
    namespace: 'brief';
    state: BriefState;
    reducers: {
        setState: Reducer<BriefState>;
        setCollectionId: Reducer<BriefState>;
    };
    effects: {
        fetchBrief: Effect;
        addUserCollection: Effect;
        delUserCollection: Effect;
    };
}

export const initialState = {
    bookInfo: {
        id: '',
        title: '',
        image: '',
        category: '',
        author: '',
        description: '',
        status: '',
    },
    collection_id: 0,
    markChapter: '',
    markIndex: '',
    chapterList: []
};

const briefModel: CategoryModel = {
    namespace: 'brief',
    state: initialState,
    reducers: {
        setState(state = initialState, {payload}) {
            return {
                ...state,
                ...payload,
            };
        },
        setCollectionId(state = initialState, {payload}) {
            return {
                ...state,
                collection_id: payload.collection_id,
            };
        },
    },
    effects: {
        *fetchBrief({payload}, {call, put}) {
            const {data} = yield call(BriefServices.getList, payload);
            yield put({
                type: 'setState',
                payload: {
                    ...data
                },
            });
        },
        *addUserCollection({payload}, {call, put}) {
            const data = yield call(BriefServices.addUserCollection, payload);
            if (data.code === StatusCode.SUCCESS) {
                yield put({
                    type: 'setCollectionId',
                    payload: {
                        collection_id: data.data
                    }
                })
            }
        },
        *delUserCollection({payload}, {call, put}) {
            const data = yield call(BriefServices.delUserCollection, payload);
            if (data.code === StatusCode.SUCCESS) {
                yield put({
                    type: 'setCollectionId',
                    payload: {
                        collection_id: 0
                    }
                })
            }
        },
    },
};

export default briefModel;
