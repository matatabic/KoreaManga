import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import HomeServices from "@/services/home";

export interface IBookCover {
    id: string;
    title: string;
    image: string;
    category?: string;
    status?: string;
}

export interface ICarousel {
    id: string;
    image: string;
    colors: [string, string];
}

export interface IGuess {
    id: string;
    title: string;
    image: string;
    category: string;
}

export interface ICommendList {
    [key: string]: IBookCover[];
}

export interface HomeState {
    carouselList: ICarousel[];
    activeCarouselIndex: number;
    gradientVisible: boolean;
    guessList: IGuess[];
    commendList: ICommendList[];
}

interface HomeModel extends Model {
    namespace: 'home';
    state: HomeState;
    reducers: {
        setState: Reducer<HomeState>;
    };
    effects: {
        fetchCarouselList: Effect;
        fetchGuessList: Effect;
        fetchCommendList: Effect;
    };
}

const initialState = {
    carouselList: [],
    activeCarouselIndex: 0,
    gradientVisible: true,
    guessList: [],
    commendList: [],
};

const homeModel: HomeModel = {
    namespace: 'home',
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
        *fetchCarouselList(_, {call, put}) {
            const {data} = yield call(HomeServices.getCarouselList);
            yield put({
                type: 'setState',
                payload: {
                    carouselList: data.list,
                },
            });
        },
        *fetchGuessList(_, {call, put}) {
            const {data} = yield call(HomeServices.getGuessList);
            yield put({
                type: 'setState',
                payload: {
                    guessList: data,
                },
            });
        },
        *fetchCommendList(_, {call, put}) {
            const {data} = yield call(HomeServices.getCommendList);
            yield put({
                type: 'setState',
                payload: {
                    commendList: data.list,
                },
            });
        },
    },
};

export default homeModel;
