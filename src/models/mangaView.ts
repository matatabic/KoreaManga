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
    page_size: number;
    total: number;
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
        current_page: 0,
        page_size: 0,
        total: 0,
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

            let {episodeList: list, book_id, sort, headerIndex, endIndex} = yield select(
                (state: RootState) => state['mangaView'],
            );

            const {data} = yield call(EpisodeServices.getList, {
                book_id,
                sort: refreshing ? sort : direction ? endIndex + 1 : headerIndex - 6 > 0
                    ? headerIndex - 6 : 1,
                current_page: 1,
                page_size: refreshing ? 6 : direction ? 6 : headerIndex - 6 > 0 ?
                    6 : headerIndex - 1,
            });

            const newList = refreshing ? data.list :
                direction ? [...list, ...data.list] : [...data.list, ...list];

            yield put({
                type: 'setState',
                payload: {
                    episodeList: newList,
                    headerIndex: newList[0].sort,
                    endIndex: newList[newList.length - 1].sort,
                    headerHasMore: newList[0].sort > 1,
                    endHasMore: newList[newList.length - 1].sort < data.pages.total,
                    pagination: {
                        current_page: data.pages.current_page,
                        page_size: data.pages.page_size,
                        total: data.pages.total,
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
