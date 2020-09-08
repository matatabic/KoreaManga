import React from 'react';
import Icon from '@/assets/iconfont/index';
import {
    RouteProp,
    TabNavigationState,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Category from '@/pages/Category';
import Shelf from '@/pages/Shelf';
import Mine from '@/pages/Mine';
import {RootStackParamList, RootStackNavigation} from './index';
import Home from "@/pages/Home";

export type BottomTabParamList = {
    Home: undefined;
    Category: undefined;
    Shelf: undefined;
    Mine: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
    state?: TabNavigationState;
};

interface IProps {
    navigation: RootStackNavigation;
    route: Route;
}

function getHeaderTitle(routeName: string) {
    switch (routeName) {
        case 'Home':
            return '首页';
        case 'Category':
            return '分类';
        case 'Shelf':
            return '书架';
        case 'Mine':
            return '我的';
        default:
            return '首页';
    }
}

class BottomTabs extends React.Component<IProps> {

    componentDidMount() {
        this.setOptions();
    }

    componentDidUpdate() {
        this.setOptions();
    }

    setOptions = () => {
        const {navigation, route} = this.props;
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen || 'Home';
        console.log(routeName)
        if (routeName === 'Home') {
            navigation.setOptions({
                headerTransparent: true,
                headerTitle: '',
            });
        } else {
            navigation.setOptions({
                headerTransparent: false,
                headerTitle: getHeaderTitle(routeName),
            });
        }
    }

    render() {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#FBDB3F',
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
                    name="Category"
                    component={Category}
                    options={{
                        tabBarLabel: '分类',
                        tabBarIcon: ({color, size}) => (
                            <Icon name="icon-category" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Shelf"
                    component={Shelf}
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
