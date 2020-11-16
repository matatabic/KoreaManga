import React from 'react';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import {StyleSheet, Text, Animated} from 'react-native';
import Category from "@/pages/Category";
import CategoryTopBar from "@/pages/Category/CategoryTopBar";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ICategory} from "@/models/categorySetting";
import {createCategoryModel} from "@/config/dva";
import {RootStackNavigation} from "@/navigator/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {IBook} from "@/models/home";
import {viewportHeight} from "@/utils/index";
import {Color} from "@/utils/const";


const mapStateToProps = (state: RootState) => {
    return {
        statusList: state['categorySetting'].statusList,
        myCategories: state['categorySetting'].myCategories,
        hideHeader: state['category'].hideHeader,
        activeCategory: state['category'].activeCategory,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

export type CategoryParamList = {
    [key: string]: {
        namespace: string;
        goBrief: (data: IBook) => void;
        category_id: string;
        scrollY: any
    };
};
const Tab = createMaterialTopTabNavigator<CategoryParamList>();

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}


const statusBarHeight = 45;
const listHeight = viewportHeight - statusBarHeight;

class CategoryTabs extends React.PureComponent<IProps> {

    translateY = new Animated.Value(0)

    getTopColor = () => {
        return this.translateY.interpolate({
            inputRange: [-statusBarHeight, 0],
            outputRange: [Color.white, Color.theme],
            extrapolate: "clamp",
        })
    }

    showTopBar = () => {
        Animated.timing(this.translateY, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
    }

    hideTopBar = () => {
        Animated.timing(this.translateY, {
            toValue: -(statusBarHeight + getStatusBarHeight()),
            useNativeDriver: false,
        }).start();
    }

    goBrief = (data: IBook) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            id: data.id
        });
    };

    renderTabBar = (props: MaterialTopTabBarProps) => {
        return <CategoryTopBar {...props} />;
    };

    createModel = (id: string) => {
        const {statusList} = this.props;
        statusList.map((item) => {
            createCategoryModel(`tab-category-${id}-status-${item.id}`);
        })
    }

    renderScreen = (item: ICategory) => {
        const {dispatch} = this.props;
        this.createModel(item.id);
        return (
            <Tab.Screen
                key={item.id}
                name={item.id.toString()}
                component={Category}
                listeners={{
                    tabPress: e => {
                        dispatch({
                            type: 'category/setState',
                            payload: {
                                activeCategory: item.id,
                            },
                        });
                    },
                    swipeEnd: e => {
                        dispatch({
                            type: 'category/setState',
                            payload: {
                                activeCategory: item.id,
                            },
                        });
                    }
                }}
                initialParams={{
                    namespace: `tab-category-${item.id}`,
                    goBrief: this.goBrief,
                    category_id: item.id,
                    scrollY: this.translateY,
                }}
                options={{
                    tabBarLabel: item.name,
                }}
            />
        );
    };


    render() {
        const {myCategories, hideHeader} = this.props;
        const topColor = this.getTopColor();

        if (hideHeader) {
            this.hideTopBar();
        } else {
            this.showTopBar();
        }

        return (
            <>
                <Animated.View style={[styles.statusBar, {
                    backgroundColor: topColor,
                }
                ]}/>
                <Animated.View style={[styles.tabBarView, {
                    height: statusBarHeight,
                    backgroundColor: topColor,
                    transform: [{translateY: this.translateY}]
                }]}>
                    <Animated.Text style={[styles.title]}>漫画分类</Animated.Text>
                </Animated.View>
                <Animated.View style={{
                    height: listHeight,
                    transform: [{translateY: this.translateY}]
                }}>
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
                                fontSize: 13,
                            },
                            indicatorStyle: {
                                height: 3,
                                width: 16,
                                marginLeft: 17,
                                marginBottom: 5,
                                borderRadius: 2,
                                backgroundColor: Color.theme,
                            },
                            allowFontScaling: true,
                            activeTintColor: Color.theme,
                            inactiveTintColor: Color.black,
                        }}>
                        {myCategories.map(this.renderScreen)}
                    </Tab.Navigator>
                </Animated.View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        height: getStatusBarHeight(),
    },
    tabBarView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16
    },
});

export default connector(CategoryTabs);
