import {Effect, Model} from "dva-core-ts";
import {Reducer} from "redux";
import BriefServices from "@/services/brief";

export interface IChapter {
    id: string;
    title: string;
}

export interface BriefState {
    chapterList: IChapter[];
}

interface CategoryModel extends Model {
    namespace: 'brief';
    state: BriefState;
    reducers: {
        setState: Reducer<BriefState>;
    };
    effects: {
        fetchChapterList: Effect;
    };
}

const initialState = {
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
        *fetchChapterList({payload}, {call, put}) {
            const {data} = yield call(BriefServices.getChapterList, payload.data.id);
            yield put({
                type: 'setState',
                payload: {
                    chapterList: data.list,
                },
            });
        },

    },
};

export default briefModel;
