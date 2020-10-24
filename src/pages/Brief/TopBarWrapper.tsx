import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Touchable from "@/components/Touchable";

interface IProps {
    goBack: () => void;
}

class TopBarWrapper extends React.PureComponent<IProps> {

    onPress = () => {
        const {goBack}  =this.props;
        console.log(goBack)
        goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Touchable onPress={this.onPress} style={styles.leftView}>
                        <Icon name="icon-arrow-left-bold" color='#ccc' size={24}/>
                    </Touchable>
                    <View style={styles.rightView}>
                        <Icon style={styles.rightIcon} name="icon-shangbian" color='#ccc' size={22}/>
                        <Icon style={styles.rightIcon} name="icon-xiabian" color='#ccc' size={22}/>
                        <Icon style={styles.rightIcon} name="icon-jubao" color='#ccc' size={22}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: getStatusBarHeight(),
        height: 45,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 15,
    },
    leftView: {
        width:25,
        height:28,
        marginLeft: 6,
    },
    rightView: {
        flexDirection: 'row',
    },
    rightIcon: {
        marginHorizontal: 10
    },
})

export default TopBarWrapper;
