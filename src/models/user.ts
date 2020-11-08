import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import UserServices from "@/services/user";
import Toast from "react-native-root-toast";
import {StatusCode} from "@/utils/const";
import storage, {load} from "@/config/storage";

interface IUser {
    isLogin: boolean;
    mobile: string;
    username: string;
    nickname: string;
    token: string;
}

export interface UserState {
    userInfo: IUser,
}

interface UserModel extends Model {
    namespace: 'user';
    state: UserState;
    reducers: {
        setState: Reducer<UserState>;
    };
    effects: {
        loadData: Effect;
        login: Effect;
        logout: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}

const initialState = {
    userInfo: {
        isLogin: false,
        mobile: '',
        username: '',
        nickname: '',
        token: '',
    }
};

const userModel: UserModel = {
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
        *loadData(_, {call, put}) {
            const userInfo = yield call(load, {key: 'userInfo'});
            if (userInfo) {
                yield put({
                    type: 'setState',
                    payload: {
                        userInfo
                    }
                })
            }
        },
        *login(action, {call, put}) {
            const {payload} = action;
            const data = yield call(UserServices.Login, payload);
            let isGoBack = false;

            Toast.show(data.msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
            })

            if (data.code === StatusCode.SUCCESS) {
                isGoBack = true;
                const userInfo = {
                    isLogin: true,
                    mobile: data.data.mobile,
                    username: data.data.username,
                    nickname: data.data.nickname,
                    token: data.data.sid,
                }
                yield put({
                    type: 'setState',
                    payload: {
                        userInfo
                    }
                })
                storage.save({
                    key: 'userInfo',
                    data: userInfo,
                })
            }
            if (action.callback) {
                action.callback(isGoBack);
            }
        },
        *logout(_, {call, put}) {
            const data = yield call(UserServices.logout);
            yield put({
                type: 'setState',
                payload: {
                    userInfo:''
                }
            })
            storage.save({
                key: 'userInfo',
                data: undefined,
            })
        },
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'loadData'});
        },
        asyncStorage() {
            storage.sync.userInfo = async () => {
                return null;
            };
        },
    },
};

export default userModel;
