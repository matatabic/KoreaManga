import {Effect, Model} from "dva-core-ts";
import {Reducer} from "redux";
import BriefServices from "@/services/brief";
import {StatusCode} from "@/utils/const";
import Toast from "react-native-root-toast";

export interface IChapter {
    id: string;
    title: string;
    name: string;
    sort: string;
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
    collection: boolean;
    markChapter: string;
    markIndex: string;
    chapterList: IChapter[];
}

interface CategoryModel extends Model {
    namespace: 'brief';
    state: BriefState;
    reducers: {
        setState: Reducer<BriefState>;
        setCollection: Reducer<BriefState>;
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
    collection: false,
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
        setCollection(state = initialState, {payload}) {
            state.collection = !state.collection;
            return {
                ...state,
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
                    type: 'setCollection',
                })
            }
            Toast.show(data.msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
            })
        },
        *delUserCollection({payload}, {call, put}) {
            const data = yield call(BriefServices.delUserCollection, payload);
            if (data.code === StatusCode.SUCCESS) {
                yield put({
                    type: 'setCollection',
                })
            }
            Toast.show(data.msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
            })
        },
    },
};

export default briefModel;
