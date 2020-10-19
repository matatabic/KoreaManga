import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import EpisodeServices from "@/services/episode";
import {RootState} from "@/models/index";


export interface IEpisode {
    id: string;
    image: string;
    multiple: number;
}

export interface IPagination {
    current_page: number;
}

export interface MangaViewState {
    episodeList: IEpisode[];
    refreshing: boolean;
    book_id: number;
    headerIndex: number;
    endIndex: number;
    headerHasMore: boolean;
    endHasMore: boolean;
    pagination: IPagination;
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

export const initialState = {
    episodeList: [],
    refreshing: false,
    book_id: 0,
    headerIndex: 0,
    endIndex: 0,
    headerHasMore: false,
    endHasMore: false,
    pagination: {
        current_page: 1,
    }
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
        *fetchEpisodeList(action, {call, put, select}) {
            const {payload, type} = action;
            const {refreshing, direction} = payload;

            let {episodeList: list, book_id, chapter_id, headerIndex, endIndex, pagination} = yield select(
                (state: RootState) => state['mangaView'],
            );

            const {data} = yield call(EpisodeServices.getList, {
                book_id,
                sort: refreshing ? 0 : direction ? endIndex : headerIndex - 7,
                chapter_id,
                current_page: 1,
                page_size: 6
            });

            const newList = refreshing ? data.list :
                direction ? [...list, ...data.list] : [...data.list, ...list];
            console.log(newList)
            yield put({
                type: 'setState',
                payload: {
                    episodeList: newList,
                    headerIndex: newList[0].sort,
                    endIndex: newList[newList.length - 1].sort,
                    headerHasMore: newList[0].sort > 1,
                    endHasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    pagination: {
                        current_page: data.pages.current_page,

                    },
                }
            });

            if (action.callback) {
                action.callback();
            }
        },
    },
};

export default mangaViewModel;
