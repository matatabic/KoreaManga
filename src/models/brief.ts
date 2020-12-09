import {Effect, Model} from "dva-core-ts";
import {Reducer} from "redux";
import BriefServices from "@/services/brief";
import {StatusCode} from "@/utils/const";


export interface IChapter {
    id: number;
    title: string;
    roast: number;
    chapter_num: number;
}

export interface IBookInfo {
    id: number,
    title: string,
    image: string,
    category: string,
    author: string,
    description: string,
    status: string,
}

export interface BriefState {
    bookInfo: IBookInfo;
    collection_id: number;
    markChapterNum: number;
    markRoast: number;
    chapterList: IChapter[];
}

interface CategoryModel extends Model {
    namespace: 'brief';
    state: BriefState;
    reducers: {
        setState: Reducer<BriefState>;
        setCollectionId: Reducer<BriefState>;
        setChapter: Reducer<BriefState>;
    };
    effects: {
        fetchBrief: Effect;
        addUserCollection: Effect;
        delUserCollection: Effect;
    };
}

export const initialState = {
    bookInfo: {
        id: 0,
        title: '',
        image: '',
        category: '',
        author: '',
        description: '',
        status: '',
    },
    collection_id: 0,
    markChapterNum: 0,
    markRoast: 0,
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
        setChapter(state = initialState, {payload}) {
            return{
                ...state,
                ...payload,
            }
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
