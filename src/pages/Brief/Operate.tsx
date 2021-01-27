import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {viewportWidth, wp} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ModalStackNavigation, RootStackNavigation} from "@/navigator/index";


const imageWidth = wp(30);

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
    statusBarHeight: number;
    fixedOpacity: number;
    navigation: RootStackNavigation & ModalStackNavigation;
    opacity: Animated.AnimatedInterpolation;
    leftViewX: Animated.AnimatedInterpolation;
    rightViewX: Animated.AnimatedInterpolation;
    rightViewScale: Animated.AnimatedInterpolation;
    rightFontSize: Animated.AnimatedInterpolation;
    fontColor: Animated.AnimatedInterpolation;
    readNow: () => void;
    onClickCollection: () => void;
}

class Operate extends React.Component<IProps> {

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

    render() {
        const {
            fixedOpacity, statusBarHeight, markChapterNum, opacity, leftViewX,
            rightViewX, rightViewScale, rightFontSize, fontColor, collection_id
        } = this.props;

        return (
            <View style={{opacity: fixedOpacity === 0 ? 1 : 0}}>
                <Animated.View style={[styles.shadow, {
                    height: statusBarHeight + 30,
                    opacity: opacity,
                }]}/>
                <View style={[styles.container, {
                    height: statusBarHeight + 30
                }]}>
                    <Animated.View style={[styles.leftWrapper, {
                        left: leftViewX,
                    }]}>
                        <Touchable style={{flexDirection: 'row', alignItems: "center"}}
                                   onPress={this.onClickCollection}>
                            <Icon name="icon-xin"
                                  color={collection_id > 0 ? Color.theme : Color.red}
                                  size={25}
                            />
                            <Animated.Text style={[styles.collectionTitle, {
                                color: fontColor
                            }]}>
                                {collection_id > 0 ? '已收藏' : '收藏'}
                            </Animated.Text>
                        </Touchable>
                    </Animated.View>
                    <View style={styles.rightView}>
                        <Animated.View style={[styles.read, {
                            left: rightViewX,
                            transform: [{scale: rightViewScale}]
                        }]}>
                            <Touchable style={styles.read} onPress={this.readNow}>
                                <Animated.Text style={{
                                    color: fontColor,
                                    fontSize: rightFontSize,
                                }}>
                                    {markChapterNum > 0 ? `续看第${markChapterNum}话` : '开始阅读'}
                                </Animated.Text>
                            </Touchable>
                        </Animated.View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: viewportWidth,
        paddingTop: 30,
        flexDirection: "row",
        paddingHorizontal: 20,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
    },
    shadow: {
        backgroundColor: Color.page_bg,
        zIndex: 10,
    },
    leftWrapper: {
        width: imageWidth,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },
    collectionTitle: {
        marginLeft: 10,
        fontSize: 15
    },
    rightView: {
        flex: 1,
        width: viewportWidth - 140,
        height: '100%',
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    read: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        backgroundColor: Color.red,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default connector(Operate);
