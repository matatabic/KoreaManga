import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
    MaterialTopTabBar,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Touchable from '@/components/Touchable';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {bookStatus} from "@/navigator/CategoryTabs";

const mapStateToProps = ({category}: RootState) => {
    return {
        activeModel: category.activeModel,
        activeStatus: category.activeStatus,
        activeCategory: category.activeCategory,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;


class CategoryTopBarWrapper extends React.PureComponent<IProps> {


    goCategorySetting = () => {
        const {navigation} = this.props;
        navigation.navigate('CategorySetting');
    };

    onPress(id: number) {
        const {dispatch, activeCategory} = this.props;
        dispatch({
            type: 'category/setState',
            payload: {
                activeStatus: id
            }
        })
        dispatch({
            type: `tab-category-${activeCategory}-status-${id}/fetchBookList`,
            payload: {
                refreshing: true,
                category_id: activeCategory,
                status: id,
            },
        });
    }

    render() {
        let {indicatorStyle, activeTintColor, activeStatus, ...restProps} = this.props;

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
                        bookStatus.map((item) => {
                            let style = styles.bottomText;
                            if (item.id == activeStatus) {
                                style = styles.activeText;
                            }
                            return (
                                <Touchable key={item.id} onPress={() => this.onPress(item.id)} style={styles.bottomView}>
                                    <Text style={style}>{item.name}</Text>
                                </Touchable>
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
        backgroundColor: '#fff',
    },
    topTabBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
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
        borderColor: '#ccc',
    },
    text: {
        color: '#333',
        fontSize: 15,
    },
    whiteBackgroundColor: {
        backgroundColor: '#fff',
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
        color: '#FBDB3F',
    },
    line: {
        width: '100%',
        height: 7,
        backgroundColor: '#efefef',
        marginBottom: 3,
    }
});

export default connector(CategoryTopBarWrapper);