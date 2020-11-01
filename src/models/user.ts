import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import {RootState} from "@/models/index";
import storage, {load} from '@/config/storage';
import Toast from 'react-native-root-toast';
import UserServices from "@/services/user";

interface IUser {
    account: string;
    password: string;
}

export interface UserState {
    user: IUser[],
}

interface UserModel extends Model {
    namespace: 'user';
    state: UserState;
    reducers: {
        setState: Reducer<UserState>;
    };
    effects: {
        login: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}


export const initialState = {
    user: [],
};

const UserModel: UserModel = {
    namespace: 'user',
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
        *login({payload}, {call, put}) {
            const data = yield call(UserServices.Login, payload);
            console.log(data)
            Toast.show(data.msg,{
                duration:Toast.durations.LONG,
                position:Toast.positions.CENTER,
                shadow:true,
                animation:true,
            })
        },
    },
    subscriptions: {},
};

export default UserModel;
