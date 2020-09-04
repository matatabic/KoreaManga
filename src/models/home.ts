import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import HomeServices from "@/services/home";

const CAROUSEL_URL = '/carousel/getCarouselList';
const GUESS_URL = '/book/getGuessList';
const COMMEND_URL = '/book/getCommendList';

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

export interface ICommend {
    id: string;
    title: string;
    image: string;
    category: string;
}

export interface ICommends {
    [key: string]: ICommend[];
}

export interface HomeState {
    carousels: ICarousel[];
    activeCarouselIndex: number;
    gradientVisible: boolean;
    guess: IGuess[];
    commends: ICommends[];
}

interface HomeModel extends Model {
    namespace: 'home';
    state: HomeState;
    reducers: {
        setState: Reducer<HomeState>;
    };
    effects: {
        fetchCarousels: Effect;
        fetchGuess: Effect;
        fetchCommends: Effect;
    };
}

const initialState = {
    carousels: [],
    activeCarouselIndex: 0,
    gradientVisible: true,
    guess: [],
    commends: [],
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
        *fetchCarousels(_, {call, put}) {
            const {data} = yield call(HomeServices.getCarouselList);
            yield put({
                type: 'setState',
                payload: {
                    carousels: data.list,
                },
            });
        },
        *fetchGuess(_, {call, put}) {
            const {data} = yield call(HomeServices.getGuessList);
            yield put({
                type: 'setState',
                payload: {
                    guess: data,
                },
            });
        },
        *fetchCommends(_, {call, put}) {
            const {data} = yield call(HomeServices.getCommendList);
            yield put({
                type: 'setState',
                payload: {
                    commends: data.list,
                },
            });
        },
    },
};

export default homeModel;
