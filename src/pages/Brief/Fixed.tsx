import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {hp, wp} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ModalStackNavigation} from "@/navigator/index";
import ImageTopBar from "./ImageTopBar";

const imageWidth = wp(33);

const mapStateToProps = ({user, brief}: RootState) => {
    return {
        isLogin: user.isLogin,
        book_id: brief.bookInfo.id,
        collection_id: brief.collection_id,
        markChapterNum: brief.markChapterNum,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: ModalStackNavigation;
    readNow: () => void;
    onClickCollection: () => void;
}

class Fixed extends React.PureComponent<IProps> {

    onClickCollection = () => {
        const {onClickCollection} = this.props;
        if (typeof onClickCollection === "function") {
            onClickCollection();
        }
    }

    readNow = () => {
        const {readNow} = this.props;
        if (typeof readNow === "function") {
            readNow();
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const {collection_id, markChapterNum} = this.props;
        return (
            <>
                <ImageTopBar/>
                <View style={styles.container}>
                    <View style={styles.spaceView}/>
                    <View style={styles.contentContainer}>
                        <Touchable style={styles.backIcon} onPress={this.goBack}>
                            <Icon name="icon-arrow-left-bold" color='#ccc' size={24}/>
                        </Touchable>
                        <View style={styles.leftWrapper}>
                            <Animated.View style={[styles.leftView, {
                                left: wp(30)
                            }]}>
                                <Touchable style={styles.touchWrapper} onPress={this.onClickCollection}>
                                    <Icon name="icon-xin"
                                          color={collection_id > 0 ? Color.theme : Color.red}
                                          size={25}
                                    />
                                    <Text style={styles.collection}>{collection_id > 0 ? '已收藏' : '收藏'}</Text>
                                </Touchable>
                            </Animated.View>
                        </View>

                        <Animated.View style={[styles.rightWrapper, {
                            left: wp(10),
                            transform: [{scale: 0.65}]
                        }]}>
                            <Touchable style={styles.rightWrapper} onPress={this.readNow}>
                                <View style={styles.rightView}>
                                    <Animated.Text style={[styles.rightTitle, {
                                        fontSize: 20
                                    }]}>
                                        {markChapterNum > 0 ? `续看第${markChapterNum}话` : '开始阅读'}
                                    </Animated.Text>
                                </View>
                            </Touchable>
                        </Animated.View>

                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
        height: hp(10),
    },
    spaceView: {
        height: hp(4),
    },
    shadowView: {
        height: hp(10),
        position: "relative",
        top: hp(10),
        left: 0,
        backgroundColor: Color.page_bg,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: hp(1.5),
        paddingRight: hp(3)
    },
    backIcon: {
        width: 25,
    },
    leftWrapper: {
        flex: 1,
    },
    rightWrapper: {
        flex: 1,
    },
    leftView: {
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightView: {
        flex: 1,
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.red,
        borderRadius: 35,
    },
    collection: {
        marginLeft: 5,
        fontSize: 16
    },
    leftTitle: {
        marginLeft: 8,
    },
    rightTitle: {
        color: Color.grey_title,
    },
})

export default connector(Fixed);
