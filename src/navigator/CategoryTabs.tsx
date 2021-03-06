import React from 'react';
import {createMaterialTopTabNavigator, MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import {View, StyleSheet, Animated} from 'react-native';
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


const mapStateToProps = ({category, categorySetting}: RootState) => {
    return {
        statusList: categorySetting.statusList,
        myCategories: categorySetting.myCategories,
        hideHeader: category.hideHeader,
        activeCategory: category.activeCategory,
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


interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

const Tab = createMaterialTopTabNavigator<CategoryParamList>();


const tabBarViewHeight = 45;
const listHeight = viewportHeight - getStatusBarHeight();

class CategoryTabs extends React.PureComponent<IProps> {

    translateY = new Animated.Value(0)

    getTopOpacity = () => {
        return this.translateY.interpolate({
            inputRange: [-tabBarViewHeight, 0],
            outputRange: [0, 1],
            extrapolate: "clamp",
        })
    }

    showTopBar = () => {
        Animated.timing(this.translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }

    hideTopBar = () => {
        Animated.timing(this.translateY, {
            toValue: -tabBarViewHeight,
            useNativeDriver: true,
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
        this.createModel(item.id);
        return (
            <Tab.Screen
                key={item.id.toString()}
                name={item.id}
                component={Category}
                initialParams={{
                    namespace: `tab-category-${item.id}`,
                    goBrief: this.goBrief,
                    category_id: item.id,
                }}
                options={{
                    tabBarLabel: item.name,
                }}
            />
        );
    };

    render() {
        const {myCategories, hideHeader} = this.props;
        const topOpacity = this.getTopOpacity();

        if (hideHeader) {
            this.hideTopBar();
        } else {
            this.showTopBar();
        }

        return (
            <View>
                <View style={[styles.statusBar, {
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: Color.page_bg
                }]}/>
                <Animated.View style={[styles.statusBar, {
                    backgroundColor: Color.theme,
                    opacity: topOpacity,
                }
                ]}/>

                <Animated.View style={[styles.tabBarView, {
                    height: tabBarViewHeight,
                    backgroundColor: Color.theme,
                    opacity: topOpacity,
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
                        pager={(props) => <ViewPagerAdapter {...props}/>}
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
            </View>
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
