import React from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {
    createStackNavigator,
    StackNavigationProp,
    HeaderStyleInterpolators,
    CardStyleInterpolators,
    TransitionPresets,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {Platform, StyleSheet} from 'react-native';
import Brief from '@/pages/Brief';
import CategorySetting from "@/pages/CategorySetting";
import MangaView from "@/pages/MangaView";
import Search from "@/pages/Search";
import {Color} from "@/utils/const";
import Login from "@/pages/Login";
import {statusBarHeight} from "@/utils/index";


export type RootStackParamList = {
    BottomTabs: {
        screen?: string;
    };
    CategorySetting: undefined;
    Search: undefined;
    SearchBar: undefined;
    Brief: {
        id: string;
    };
    MangaView: {
        data: {
            sort: string;
            title: string;
            book_id: string;
        }
    },
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

interface IState {
    navigationState: NavigationState | undefined;
}



function RootStackScreen() {
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
                        return (
                            <></>
                        )
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
                        return <></>
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
                        return <></>
                    },
                }}
            />
        </RootStack.Navigator>
    );
}

export type ModalStackParamList = {
    Root: undefined;
    Login: undefined;
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
