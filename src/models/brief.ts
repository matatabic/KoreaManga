import {Effect, Model} from "dva-core-ts";
import {Reducer} from "redux";
import BriefServices from "@/services/brief";

export interface IChapter {
    id: string;
    title: string;
    name: string;
}

export interface BriefState {
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

const initialState = {
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
            const {data} = yield call(BriefServices.getBrief, payload);
            yield put({
                type: 'setState',
                payload: {
                    collected: data.collected,
                    markChapter: data.markChapter,
                    markIndex: data.markIndex,
                    chapterList: data.chapters,
                },
            });
        },
    },
};

export default briefModel;
