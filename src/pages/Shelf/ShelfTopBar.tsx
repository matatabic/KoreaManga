import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {MaterialTopTabBar, MaterialTopTabBarProps,} from '@react-navigation/material-top-tabs';
import Touchable from '@/components/Touchable';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {Color} from "@/utils/const";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const mapStateToProps = ({shelf}: RootState) => {
    return {
        activePage: shelf.activePage,
        isEditHistory: shelf.isEditHistory,
        isEditCollection: shelf.isEditCollection,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector> & MaterialTopTabBarProps;

class ShelfTopBar extends React.PureComponent<ModelState> {

    editBtn = () => {
        const {dispatch, activePage, isEditCollection, isEditHistory} = this.props;
        switch (activePage) {
            case 1:
                dispatch({
                    type: 'shelf/setState',
                    payload: {
                        isEditCollection: !isEditCollection,
                        ids: [],
                    }
                })
                break;
            case 2:
                dispatch({
                    type: 'shelf/setState',
                    payload: {
                        isEditHistory: !isEditHistory,
                        ids: [],
                    }
                })
                break;
            case 3:

                break;
        }
    };

    render() {
        let {indicatorStyle, activeTintColor, activePage, isEditCollection, isEditHistory, ...restProps} = this.props;
        let isEdit = false;
        switch (activePage) {
            case 1:
                isEdit = isEditCollection;
                break;
            case 2:
                isEdit = isEditHistory;
                break;
            case 3:
                isEdit = false
                break;
        }
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
                        style={styles.editBtn}
                        onPress={this.editBtn}>
                        <Text style={styles.text}>{isEdit ? '取消' : '编辑'}</Text>
                    </Touchable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
        backgroundColor: Color.theme,
    },
    topTabBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Color.light_btn,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    tabBar: {
        flex: 1,
        marginLeft: 25,
        elevation: 0,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    editBtn: {
        paddingHorizontal: 15,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: Color.light_btn,
    },
    text: {
        color: Color.white,
        fontSize: 15,
    },
});

export default connector(ShelfTopBar);
