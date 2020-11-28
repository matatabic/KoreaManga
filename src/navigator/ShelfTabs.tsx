import React from 'react';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import {StyleSheet, View} from 'react-native';
import ShelfTopBar from "@/pages/Shelf/ShelfTopBar";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ICategory} from "@/models/categorySetting";
import {RootStackNavigation} from "@/navigator/index";
import {Color} from "@/utils/const";
import {CategoryParamList} from "@/navigator/CategoryTabs";
import Shelf from "@/pages/Shelf";
import History from "@/pages/Shelf/history";


const mapStateToProps = (state: RootState) => {
    return {};
};


const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;


interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

const Tab = createMaterialTopTabNavigator<CategoryParamList>();

class ShelfTabs extends React.Component {

    renderTabBar = (props: MaterialTopTabBarProps) => {
        return <ShelfTopBar {...props} />;
    };

    renderScreen = (item: ICategory) => {

        return (
            <Tab.Screen
                key={item.id}
                name={item.id.toString()}
                component={Shelf}
                initialParams={{}}
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Tab.Navigator
                    lazy
                    tabBar={this.renderTabBar}
                    pager={props => <ViewPagerAdapter {...props} />}
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
                        component={Shelf}
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

export default connector(ShelfTabs);