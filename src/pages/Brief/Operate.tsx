import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {hp, wp} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ModalStackNavigation} from "@/navigator/index";


const mapStateToProps = ({user, brief}: RootState) => {
    return {
        isLogin: user.isLogin,
        data: brief.bookInfo,
        collection_id: brief.collection_id,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: ModalStackNavigation;
    opacity: Animated.AnimatedInterpolation;
    leftViewX: Animated.AnimatedInterpolation;
    rightViewX: Animated.AnimatedInterpolation;
    rightViewScale: Animated.AnimatedInterpolation;
    rightFontSize: Animated.AnimatedInterpolation;
}

class Operate extends React.Component<IProps> {

    addUserCollection = () => {
        const {dispatch, navigation, isLogin, data} = this.props;
        if (isLogin) {
            dispatch({
                type: 'brief/addUserCollection',
                payload: {
                    book_id: data.id
                }
            })
        } else {
            navigation.navigate("Login");
        }
    }

    delUserCollection = () => {
        const {dispatch, navigation, isLogin, collection_id} = this.props;
        if (isLogin) {
            dispatch({
                type: 'brief/delUserCollection',
                payload: {
                    id: collection_id.toString()
                }
            })
        } else {
            navigation.navigate("Login");
        }
    }

    render() {
        const {opacity, leftViewX, rightViewX, rightViewScale, rightFontSize, collection_id} = this.props;
        return (
            <>
                <Animated.View style={[styles.shadowView, {opacity: opacity}]}/>
                <View style={styles.container}>
                    <View style={styles.spaceView}/>
                    <View style={styles.contentContainer}>
                        <View style={styles.seize}/>
                        {
                            collection_id > 0 ?
                                <Touchable onPress={this.delUserCollection}>
                                    <Animated.View style={[styles.leftView, {
                                        left: leftViewX
                                    }]}>
                                        <Icon name="icon-xin"
                                              color={Color.theme}
                                              size={25}
                                        />
                                        <Text style={styles.collection}>已收藏</Text>
                                    </Animated.View>
                                </Touchable> :
                                <Touchable onPress={this.addUserCollection}>
                                    <Animated.View style={[styles.leftView, {
                                        left: leftViewX
                                    }]}>
                                        <Icon name="icon-xin"
                                              color={Color.red}
                                              size={25}
                                        />
                                        <Text style={styles.collection}>收藏</Text>
                                    </Animated.View>
                                </Touchable>
                        }

                        <Animated.View style={[styles.rightView, {
                            left: rightViewX,
                            transform: [{scale: rightViewScale}]
                        }]}>
                            <Touchable onPress={() => {
                                console.log('开始阅读')
                            }}>
                                <Animated.Text style={[styles.rightTitle, {
                                    fontSize: rightFontSize
                                }]}>开始阅读</Animated.Text>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    seize: {
        width: wp(6),
    },
    leftView: {
        width: 75,
        marginLeft: wp(6),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    collection: {
        marginLeft: 5
    },
    leftTitle: {
        marginLeft: 8,
    },
    rightView: {
        width: wp(50),
        height: hp(6),
        marginLeft: wp(15),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.red,
        marginHorizontal: 10,
        borderRadius: 35,
    },
    rightTitle: {
        color: Color.grey_title,
    },
})

export default connector(Operate);
