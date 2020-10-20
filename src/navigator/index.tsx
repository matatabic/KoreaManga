import React from 'react';
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
import Search from "@/pages/Search";
import {Color} from "@/utils/const";


export type RootStackParamList = {
    BottomTabs: {
        screen?: string;
    };
    CategorySetting: undefined;
    Search: undefined;
    SearchBar:undefined;
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

class Navigator extends React.Component<any, IState> {

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
                        headerTintColor: Color.grey_title,
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
            </NavigationContainer>
        );
    }
}

export default Navigator;
