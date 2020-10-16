import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
    MaterialTopTabBar,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Touchable from '@/components/Touchable';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {Color} from "@/utils/const";
import TopBatItem from "@/pages/Category/Item/TopBatItem";
import {IStatus} from "@/models/category";

const mapStateToProps = ({category}: RootState) => {
    return {
        activeModel: category.activeModel,
        activeStatus: category.activeStatus,
        activeCategory: category.activeCategory,
        statusList:category.statusList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;


class CategoryTopBar extends React.PureComponent<IProps> {


    goCategorySetting = () => {
        const {navigation} = this.props;
        navigation.navigate('CategorySetting');
    };

    onPress = (item:IStatus) => {
        const {dispatch, activeCategory} = this.props;
        dispatch({
            type: 'category/setState',
            payload: {
                activeStatus: item.id
            }
        })
        dispatch({
            type: `tab-category-${activeCategory}-status-${item.id}/fetchBookList`,
            payload: {
                refreshing: true,
                category_id: activeCategory,
                status: item.id,
            },
        });
    }

    render() {
        let {statusList,indicatorStyle, activeTintColor, activeStatus, ...restProps} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.topTabBarView}>
                    <MaterialTopTabBar
                        {...restProps}
                        indicatorStyle={indicatorStyle}
                        activeTintColor={activeTintColor}
                        style={styles.tabBar}
                    />
                    <Touchable
                        style={styles.categoryBtn}
                        onPress={this.goCategorySetting}>
                        <Text style={styles.text}>···</Text>
                    </Touchable>
                </View>
                <View style={styles.bottomTabBarView}>
                    {
                        statusList.map((item) => {
                            const active = item.id == activeStatus;
                            return (
                                <TopBatItem data={item} active={active} onPress={this.onPress} />
                            )
                        })
                    }
                </View>
                <View style={styles.line}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.page_bg,
    },
    topTabBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Color.light_btn,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    tabBar: {
        flex: 1,
        elevation: 0,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    categoryBtn: {
        paddingHorizontal: 10,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: Color.light_btn,
    },
    text: {
        color: Color.black,
        fontSize: 15,
    },
    whiteBackgroundColor: {
        backgroundColor: Color.page_bg,
    },
    bottomTabBarView: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        padding: 0,
        margin: 0,
    },
    bottomView: {
        width: 50,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomText: {
        fontSize: 12,
    },
    activeText: {
        fontSize: 12,
        color: Color.theme,
    },
    line: {
        width: '100%',
        height: 7,
        backgroundColor: Color.split_line,
        marginBottom: 3,
    }
});

export default connector(CategoryTopBar);
