import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {hp, wp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ModalStackNavigation} from "@/navigator/index";
import ImageTopBar from "./ImageTopBar";


const mapStateToProps = ({user, brief}: RootState) => {
    return {
        isLogin: user.isLogin,
        book_id: brief.bookInfo.id,
        collection_id: brief.collection_id,
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
        const {collection_id} = this.props;
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <ImageTopBar/>
                    <View style={styles.backIconView}>
                        <Touchable style={styles.backIcon}>
                            <Icon name="icon-arrow-left-bold" color='#ccc' size={24}/>
                        </Touchable>
                    </View>
                    {
                        collection_id > 0 ?
                            <Touchable onPress={this.delUserCollection}>
                                <View style={[styles.leftView, {left: wp(30)}]}>
                                    <Icon name="icon-xin"
                                          color={Color.theme}
                                          size={25}
                                    />
                                    <Text style={styles.collection}>已收藏</Text>
                                </View>
                            </Touchable> :
                            <Touchable onPress={this.addUserCollection}>
                                <View style={[styles.leftView, {left: wp(30)}]}>
                                    <Icon name="icon-xin"
                                          color={Color.red}
                                          size={25}
                                    />
                                    <Text style={styles.collection}>收藏</Text>
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
        paddingTop: getStatusBarHeight() + hp(0.4),
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIconView: {
        width: wp(6),
    },
    backIcon: {
        marginLeft: 6,
        width: 25,
        height: 28,
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

export default connector(Fixed);
