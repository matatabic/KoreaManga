import React from 'react';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import {Animated, LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import Category from "@/pages/Category";
import CategoryTopBarWrapper from "@/pages/views/CategoryTopBarWrapper";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ICategory} from "@/models/categorySetting";
import {createCategoryModel} from "@/config/dva";
import {RootStackNavigation} from "@/navigator/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {IBookCover} from "@/models/home";
import {viewportHeight} from "@/utils/index";
import {bottomHeight} from "@/navigator/BottomTabs";


const mapStateToProps = (state: RootState) => {
    return {
        myCategories: state['categorySetting'].myCategories,
        hideHeader: state['category'].hideHeader,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

export type CategoryParamList = {
    [key: string]: {
        namespace: string;
        goBrief: (data: IBookCover) => void;
        category_id: string;
    };
};
const Tab = createMaterialTopTabNavigator<CategoryParamList>();

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

export const bookStatus = [
    {'id': 1, 'name': '热门'},
    {'id': 2, 'name': '更新'},
    {'id': 3, 'name': '新上架'},
    {'id': 4, 'name': '完结'},
];

interface IState {
    tabHeight: number,
    listHeight: number,
}

class CategoryTabs extends React.PureComponent<IProps, IState> {

    constructor(props: any) {
        super(props);
        //设置默认宽高
        this.state = {
            tabHeight: 45,
            listHeight: viewportHeight - getStatusBarHeight() - 45 - bottomHeight,
        }
    }

    translateY = new Animated.Value(0);

    goBrief = (data: IBookCover) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            item: data,
        });
    };

    renderTabBar = (props: MaterialTopTabBarProps) => {
        return <CategoryTopBarWrapper {...props} />;
    };

    createModel = (id: string) => {
        bookStatus.map((item) => {
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
                }}
                options={{
                    tabBarLabel: item.name,
                }}
            />
        );
    };

    render() {
        const {myCategories, hideHeader} = this.props;
        const {tabHeight, listHeight} = this.state;
        if (hideHeader) {
            LayoutAnimation.spring();
            this.setState({
                tabHeight: 0,
                listHeight: viewportHeight - getStatusBarHeight() - bottomHeight,
            })
        } else {
            LayoutAnimation.spring();
            this.setState({
                tabHeight: 45,
                listHeight: viewportHeight - getStatusBarHeight() - 45 - bottomHeight,
            })
        }
        return (
            <>
                <View style={styles.statusBar}/>
                <View style={[styles.tabView, {
                    height: tabHeight
                }]}>
                    <Text style={styles.title}>漫画分类</Text>
                </View>
                <View style={{height: listHeight}}>
                    <Tab.Navigator
                        lazy
                        tabBar={this.renderTabBar}
                        pager={props => <ViewPagerAdapter {...props} />}
                        sceneContainerStyle={styles.sceneContainer}
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
                                backgroundColor: '#FCE04F',
                            },
                            allowFontScaling: true,
                            activeTintColor: '#FCE04F',
                            inactiveTintColor: '#333',
                        }}>
                        {myCategories.map(this.renderScreen)}
                    </Tab.Navigator>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sceneContainer: {},
    statusBar: {
        width: '100%',
        height: getStatusBarHeight(),
        backgroundColor: '#FBDB3F',
    },
    tabView: {
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBDB3F',
    },
    title: {
        fontSize: 16
    },
});

export default connector(CategoryTabs);
