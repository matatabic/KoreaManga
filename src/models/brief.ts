import {Effect, Model} from "dva-core-ts";
import {Reducer} from "redux";
import BriefServices from "@/services/brief";

export interface IChapter {
    id: string;
    title: string;
    name: string;
    sort: string;
}

export interface IInfo {
    title: string,
    image: string,
    category: string,
    author: string,
    description: string,
    status: string,
}

export interface BriefState {
    bookInfo: IInfo;
    collected: boolean;
    markChapter: string;
    markIndex: string;
    chapterList: IChapter[];
}

interface CategoryModel extends Model {
    namespace: 'brief';
    state: BriefState;
    reducers: {
        setState: Reducer<BriefState>;
    };
    effects: {
        fetchBrief: Effect;
    };
}

export const initialState = {
    bookInfo: {
        title: '',
        image: '',
        category: '',
        author: '',
        description: '',
        status: '',
    },
    collected: false,
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
    },
};

export default briefModel;
