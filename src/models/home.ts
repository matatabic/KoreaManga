import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import HomeServices from "@/services/home";

export interface IBookCover {
    id: string;
    title: string;
    image: string;
    category: string;
    author: string;
    description: string;
    status: string;
}

export interface ICarousel {
    id: string;
    image: string;
    colors: [string, string];
}

export interface ICommendList {
    [key: string]: IBookCover[];
}

export interface HomeState {
    carouselList: ICarousel[];
    activeCarouselIndex: number;
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
        fetchCommendList: Effect;
    };
}

const initialState = {
    carouselList: [],
    activeCarouselIndex: 0,
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
