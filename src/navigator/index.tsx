import React, {useEffect} from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {
    createStackNavigator,
    StackNavigationProp,
    HeaderStyleInterpolators,
    CardStyleInterpolators,
    TransitionPresets,
} from '@react-navigation/stack';
import {Platform, StyleSheet} from 'react-native';
import {Color} from "@/utils/const";
import {statusBarHeight} from "@/utils/index";
import BottomTabs from './BottomTabs';
import Brief from '@/pages/Brief';
import CategorySetting from "@/pages/CategorySetting";
import MangaView from "@/pages/MangaView";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Guess from "@/pages/Guess";
import SplashScreen from "react-native-splash-screen";


export type RootStackParamList = {
    BottomTabs: {
        screen?: string;
    };
    CategorySetting: undefined;
    Search: undefined;
    SearchBar: undefined;
    Brief: {
        id: number;
    };
    MangaView: {
        roast: number;
        book_id: number;
    },
    Guess: {
        headerTitle: string;
    };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

interface IState {
    navigationState: NavigationState | undefined;
}


function RootStackScreen() {

    useEffect(()=>{
        SplashScreen.hide();//关闭启动屏
    },[])

    return (
        <RootStack.Navigator
            headerMode="float"
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                ...Platform.select({
                    android: {
                        headerStatusBarHeight: statusBarHeight,
                    },
                }),
                headerTintColor: Color.white,
                headerStyle: {
                    backgroundColor: Color.theme,
                    ...Platform.select({
                        android: {
                            elevation: 0,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        },
                    }),
                },
            }}>
            <RootStack.Screen
                name="BottomTabs"
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                }}
                component={BottomTabs}
            />
            <RootStack.Screen
                name="Brief"
                component={Brief}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    cardStyle: {backgroundColor: Color.page_bg},
                    headerLeft: () => {
                        return null;
                    },
                }}
            />
            <RootStack.Screen
                name="CategorySetting"
                component={CategorySetting}
                options={{
                    headerTitle: '分类设置',
                }}
            />
            <RootStack.Screen
                name="Search"
                component={Search}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => {
                        return null;
                    },
                }}
            />
            <RootStack.Screen
                name="MangaView"
                component={MangaView}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    cardStyle: {backgroundColor: Color.black},
                    headerLeft: () => {
                        return null;
                    },
                }}
            />
            <RootStack.Screen
                name="Guess"
                component={Guess}
            />
        </RootStack.Navigator>
    );
}

export type ModalStackParamList = {
    Root: undefined;
    Login: undefined;
    Register: undefined;
}

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

const ModalStack = createStackNavigator<ModalStackParamList>();

function ModalStackScreen() {
    return (
        <ModalStack.Navigator
            mode="modal"
            headerMode="screen"
            screenOptions={() => ({
                ...TransitionPresets.ModalSlideFromBottomIOS,
                cardOverlayEnabled: true,
                gestureEnabled: true,
                headerTitleAlign: 'center',
                ...Platform.select({
                    android: {
                        headerStatusBarHeight: statusBarHeight,
                    },
                }),
                headerBackTitleVisible: false,
                headerTintColor: Color.white,
                headerStyle: {
                    backgroundColor: Color.theme,
                    ...Platform.select({
                        android: {
                            elevation: 0,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        },
                    }),
                }
            })}>
            <ModalStack.Screen
                name="Root"
                component={RootStackScreen}
                options={{headerShown: false}}
            />
            <ModalStack.Screen
                name="Login"
                component={Login}
                options={{
                    headerTitle: '登录',
                }}
            />
            <ModalStack.Screen
                name="Register"
                component={Register}
                options={{
                    headerTitle: '注册',
                }}
            />
        </ModalStack.Navigator>
    );
}

class Navigator extends React.Component<any, IState> {

    render() {
        return (
            <NavigationContainer>
                <ModalStackScreen/>
            </NavigationContainer>
        );
    }
}

export default Navigator;
