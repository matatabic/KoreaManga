import React from 'react';
import {Animated} from 'react-native';
import {NavigationContainer, RouteProp, NavigationState} from '@react-navigation/native';
import {
    createStackNavigator,
    StackNavigationProp,
    HeaderStyleInterpolators,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {Platform, StyleSheet, StatusBar} from 'react-native';
import Brief from '@/pages/Brief';
import CategorySetting from "@/pages/CategorySetting";
import MangaView from "@/pages/MangaView";


export type RootStackParamList = {
    BottomTabs: {
        screen?: string;
    };
    Detail: undefined;
    CategorySetting: undefined;
    Brief: {
        data: {
            id: string;
            title: string;
            image: string;
            category: string;
            author: string;
            description: string;
            status: string;
        }
    };
    MangaView: {
        data: {
            id: string;
            title: string;
        }
    }
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

interface IState {
    navigationState: NavigationState | undefined;
}

class Navigator extends React.Component<any, IState> {

    headerLeft = () => {
        return (
            <></>
        )
    }

    render() {
        return (
            <NavigationContainer>
                <RootStack.Navigator
                    headerMode="float"
                    screenOptions={{
                        headerTitleAlign: 'center',
                        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                        ...Platform.select({
                            android: {
                                headerStatusBarHeight: StatusBar.currentHeight,
                            },
                        }),
                        headerBackTitleVisible: false,
                        headerTintColor: '#333',
                        headerStyle: {
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
                        options={{
                            headerTitle: '首页',
                        }}
                    />
                    <RootStack.Screen
                        name="Brief"
                        component={Brief}
                        options={{
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeft: this.headerLeft,
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
                        name="MangaView"
                        component={MangaView}
                        options={{
                            headerTitle: '分类设置',
                        }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Navigator;
