import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {isIphoneX} from "react-native-iphone-x-helper";
import Touchable from "@/components/Touchable";
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import {viewportWidth, wp} from "@/utils/index";
import ImageTopBar from "@/pages/Brief/ImageTopBar";


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
    readNow: () => void;
    onClickCollection: () => void;
}

const imageWidth = wp(30);

class FixedOperate extends React.Component<IProps> {

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
            statusBarHeight, markChapterNum, collection_id
        } = this.props;
        return (
            <View style={[styles.container, {
                height: statusBarHeight + 30,
                top: isIphoneX() ? 0 : -11
            }]}>
                <ImageTopBar statusBarHeight={statusBarHeight}/>
                <Animated.View style={[styles.leftWrapper, {
                    left: wp(25),
                }]}>
                    <Touchable style={{flexDirection: 'row', alignItems: "center"}} onPress={this.onClickCollection}>
                        <Icon name="icon-xin"
                              color={collection_id > 0 ? Color.theme : Color.red}
                              size={25}
                        />
                        <Animated.Text style={[styles.collectionTitle, {
                            color: Color.white,
                        }]}>
                            {collection_id > 0 ? '已收藏' : '收藏'}
                        </Animated.Text>
                    </Touchable>
                </Animated.View>
                <View style={styles.rightView}>
                    <Animated.View style={[styles.read, {
                        left: wp(10),
                        transform: [{scale: 0.65}]
                    }]}>
                        <Touchable style={styles.read} onPress={this.readNow}>
                            <Animated.Text style={{
                                color: Color.white,
                                fontSize: 20,
                            }}>
                                {markChapterNum > 0 ? `续看第${markChapterNum}话` : '开始阅读'}
                            </Animated.Text>
                        </Touchable>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 19,
        width: viewportWidth,
        paddingTop: 30,
        flexDirection: "row",
        paddingHorizontal: 20,
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


export default connector(FixedOperate);
