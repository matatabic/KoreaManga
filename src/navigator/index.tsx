import React from 'react';
import {Animated} from 'react-native';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
    createStackNavigator,
    StackNavigationProp,
    HeaderStyleInterpolators,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {Platform, StyleSheet, StatusBar} from 'react-native';
import Brief from '@/pages/Brief';

export type RootStackParamList = {
    BottomTabs: {
        screen?: string;
    };
    Detail: undefined;
    CategorySetting: undefined;
    Brief: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

export type ModalStackParamList = {
    Root: undefined;
    ProgramDetail: {
        id?: string;
        previousId?: string;
        nextId?: string;
    };
    Login: undefined;
};

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();


const styles = StyleSheet.create({
    headerBackground: {
        flex: 1,
        backgroundColor: '#fff',
        opacity: 0,
    },
});

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
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
                    <Stack.Screen
                        name="BottomTabs"
                        component={BottomTabs}
                        options={{
                            headerTitle: '首页',
                        }}
                    />
                    <Stack.Screen
                        name="Brief"
                        component={Brief}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Navigator;
