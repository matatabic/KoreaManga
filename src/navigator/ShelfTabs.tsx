import React from 'react';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import {StyleSheet, View} from 'react-native';
import ShelfTopBar from "@/pages/Shelf/ShelfTopBar";
import {ICategory} from "@/models/categorySetting";
import {Color} from "@/utils/const";
import {CategoryParamList} from "@/navigator/CategoryTabs";
import Shelf from "@/pages/Shelf";
import History from "@/pages/Shelf/History";
import Download from "@/pages/Shelf/Download";
import {ModalStackNavigation} from "@/navigator/index";

interface IProps {
    navigation: ModalStackNavigation;
}

const Tab = createMaterialTopTabNavigator<CategoryParamList>();

class ShelfTabs extends React.Component<IProps> {

    renderTabBar = (props: MaterialTopTabBarProps) => {
        return <ShelfTopBar reactNavigation={this.props.navigation} {...props} />;
    };

    renderScreen = (item: ICategory) => {
        return (
            <Tab.Screen
                key={item.id}
                name={item.id.toString()}
                component={Shelf}
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Tab.Navigator
                    lazy
                    tabBar={this.renderTabBar}
                    pager={props => <ViewPagerAdapter {...props}/>}
                    tabBarOptions={{
                        scrollEnabled: true,
                        tabStyle: {
                            width: 50,
                            height: 45,
                            padding: 0,
                            margin: 0,
                        },
                        labelStyle: {
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: Color.white,
                        },
                        indicatorStyle: {
                            height: 3,
                            width: 16,
                            marginLeft: 17,
                            marginBottom: 5,
                            borderRadius: 2,
                            backgroundColor: Color.white,
                        },
                        allowFontScaling: true,
                        activeTintColor: Color.dark_title,
                        inactiveTintColor: Color.black,
                    }}>
                    <Tab.Screen
                        key={1}
                        name={'收藏'}
                        component={Shelf}
                    />
                    <Tab.Screen
                        key={2}
                        name={'历史'}
                        component={History}
                    />
                    <Tab.Screen
                        key={3}
                        name={'下载'}
                        component={Download}
                    />
                </Tab.Navigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default ShelfTabs;
