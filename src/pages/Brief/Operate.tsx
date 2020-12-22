import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {hp, wp} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ModalStackNavigation, RootStackNavigation} from "@/navigator/index";

const imageWidth = wp(33);

const mapStateToProps = ({user, brief}: RootState) => {
    return {
        isLogin: user.isLogin,
        markChapterNum: brief.markChapterNum,
        markRoast: brief.markRoast,
        chapterList: brief.chapterList,
        data: brief.bookInfo,
        collection_id: brief.collection_id,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation & ModalStackNavigation;
    opacity: Animated.AnimatedInterpolation;
    leftViewX: Animated.AnimatedInterpolation;
    rightViewX: Animated.AnimatedInterpolation;
    rightViewScale: Animated.AnimatedInterpolation;
    rightFontSize: Animated.AnimatedInterpolation;
    readNow: () => void;
    onClickCollection: () => void;
}

class Operate extends React.Component<IProps> {

    onClickCollection = () => {
        const {onClickCollection} = this.props;
        if (typeof onClickCollection === "function"){
            onClickCollection();
        }
    }

    readNow = () => {
        const {readNow} = this.props;
        if (typeof readNow === "function"){
            readNow();
        }
    }



    render() {
        const {markChapterNum, opacity, leftViewX, rightViewX, rightViewScale, rightFontSize, collection_id} = this.props;
        return (
            <>
                <Animated.View style={[styles.shadowView, {opacity: opacity}]}/>
                <View style={styles.container}>
                    <View style={styles.spaceView}/>
                    <View style={styles.contentContainer}>
                        <View style={styles.leftWrapper}>
                            <Animated.View style={[styles.leftView, {
                                left: leftViewX
                            }]}>
                                <Touchable style={styles.touchWrapper} onPress={this.onClickCollection}>
                                    <Icon name="icon-xin"
                                          color={collection_id > 0 ? Color.theme : Color.red}
                                          size={22}
                                    />
                                    <Text style={styles.collection}>{collection_id > 0 ? '已收藏' : '收藏'}</Text>
                                </Touchable>
                            </Animated.View>
                        </View>
                        {/*<Touchable onPress={this.onClickCollection}>*/}
                        <Animated.View style={[styles.rightWrapper, {
                            left: rightViewX,
                            transform: [{scale: rightViewScale}]
                        }]}>
                            <View style={styles.rightView}>
                                <Animated.Text style={[styles.rightTitle, {
                                    fontSize: rightFontSize
                                }]}>
                                    {markChapterNum > 0 ? `续看第${markChapterNum}话` : '开始阅读'}
                                </Animated.Text>
                            </View>
                        </Animated.View>
                        {/*</Touchable>*/}
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
        alignItems: 'center',
        paddingHorizontal: hp(3)
    },
    leftWrapper: {
        flex: 1
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
        fontSize:14
    },
    leftTitle: {
        marginLeft: 8,
    },
    rightTitle: {
        color: Color.grey_title,
    },
})

export default connector(Operate);
