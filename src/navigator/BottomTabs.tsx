import React from 'react';
import Icon from '@/assets/iconfont/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Mine from '@/pages/Mine';
import Home from "@/pages/Home";
import CategoryTabs from "@/navigator/CategoryTabs";
import ShelfTabs from "@/navigator/ShelfTabs";
import {getBottomSpace} from "react-native-iphone-x-helper";
import {Color} from "@/utils/const";

export const bottomHeight = getBottomSpace() + 49;

export type BottomTabParamList = {
    Home: undefined;
    CategoryTabs: undefined;
    ShelfTabs: undefined;
    Mine: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

class BottomTabs extends React.Component {

    render() {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: Color.theme,
                    style: {
                        height: bottomHeight
                    }
                }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: '首页',
                        tabBarIcon: ({color, size}) => (
                            <Icon name="icon-home" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="CategoryTabs"
                    component={CategoryTabs}
                    options={{
                        tabBarLabel: '分类',
                        tabBarIcon: ({color, size}) => (
                            <Icon name="icon-category" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="ShelfTabs"
                    component={ShelfTabs}
                    options={{
                        tabBarLabel: '书架',
                        tabBarIcon: ({color, size}) => (
                            <Icon name="icon-shujiashugui" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Mine"
                    component={Mine}
                    options={{
                        tabBarLabel: '我的',
                        tabBarIcon: ({color, size}) => (
                            <Icon name="icon-mine" color={color} size={size}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

export default BottomTabs;
