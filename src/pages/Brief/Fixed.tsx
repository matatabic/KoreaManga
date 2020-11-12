import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {hp, wp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import ImageTopBar from "@/pages/Brief/ImageTopBar";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ModalStackNavigation, ModalStackParamList} from "@/navigator/index";


const mapStateToProps = ({user, brief}: RootState) => {
    return {
        isLogin: user.userInfo.isLogin,
        book_id: brief.bookInfo.id,
        collection: brief.collection,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: ModalStackNavigation;
}

class Fixed extends React.PureComponent<IProps> {

    addUserCollection = () => {
        const {dispatch, navigation, isLogin, book_id} = this.props;
        if (isLogin) {
            dispatch({
                type: 'brief/addUserCollection',
                payload: {
                    book_id
                }
            })
        } else {
            navigation.navigate("Login");
        }
    }

    delUserCollection = () => {
        const {dispatch, navigation, isLogin, book_id} = this.props;
        if (isLogin) {
            dispatch({
                type: 'brief/delUserCollection',
                payload: {
                    book_id
                }
            })
        } else {
            navigation.navigate("Login");
        }
    }

    render() {
        const {collection} = this.props;
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <ImageTopBar/>
                    <Touchable style={styles.backIcon}>
                        <Icon name="icon-arrow-left-bold" color='#ccc' size={24}/>
                    </Touchable>
                    {
                        collection ?
                            <Touchable onPress={this.delUserCollection}>
                                <View style={[styles.leftView, {left: wp(30)}]}>
                                    <Icon name="icon-xin"
                                          color={Color.theme}
                                          size={25}
                                    />
                                    <Text style={styles.collected}>已收藏</Text>
                                </View>
                            </Touchable> :
                            <Touchable onPress={this.addUserCollection}>
                                <View style={[styles.leftView, {left: wp(30)}]}>
                                    <Icon name="icon-xin"
                                          color={Color.red}
                                          size={25}
                                    />
                                    <Text style={styles.collected}>收藏</Text>
                                </View>
                            </Touchable>
                    }
                    <View style={[styles.rightView, {
                        left: wp(10),
                        transform: [{scale: 0.65}]
                    }]}>
                        <Touchable onPress={() => {
                            console.log('开始阅读')
                        }}>
                            <Text style={[styles.rightTitle, {
                                fontSize: 20
                            }]}>开始阅读</Text>
                        </Touchable>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        height: hp(7),
        zIndex: 99999,
    },
    container: {
        paddingTop: getStatusBarHeight(),
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    backIcon: {
        position: "absolute",
        width: 25,
        height: 28,
        left: 6,
        bottom: hp(1.7),
    },
    leftView: {
        width: 75,
        height: hp(7),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    collected: {
        marginLeft: 5
    },
    leftTitle: {
        marginLeft: 8,
    },
    rightView: {
        width: wp(50),
        height: hp(6),
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

export default connector(Fixed);
