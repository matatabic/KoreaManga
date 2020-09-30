import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import MangaViewServices from "@/services/mangaView";


export interface IEpisode {
    id: string;
    image: string;
}

export interface MangaViewState {
    episodeList: IEpisode[];
}

interface MangaViewModel extends Model {
    namespace: 'mangaView';
    state: MangaViewState;
    reducers: {
        setState: Reducer<MangaViewState>;
    };
    effects: {
        fetchEpisodeList: Effect;
    };
}

const initialState = {
    episodeList: [],
};

const mangaViewModel: MangaViewModel = {
    namespace: 'mangaView',
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
        *fetchEpisodeList({payload}, {call, put}) {
            const {data} = yield call(MangaViewServices.getEpisode, {
                chapter_id: payload.chapter_id,
                book_id: payload.book_id,
                page_size: 10,
                current_page: 1,
            });
            yield put({
                type: 'setState',
                payload: {
                    episodeList: data.list,
                },
            });
        },
    },
};

export default mangaViewModel;
