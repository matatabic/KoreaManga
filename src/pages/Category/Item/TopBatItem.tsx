import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Touchable from "@/components/Touchable";
import {IStatus} from "@/models/category";
import {Color} from "@/utils/const";

interface IProps {
    data: IStatus;
    active: Boolean;
    onPress: (data: IStatus) => void;
}

class TopBatItem extends React.PureComponent<IProps> {

    onPress = () => {
        const {data, onPress} = this.props;
        onPress(data)
    }

    render() {
        const {data, active} = this.props;
        return (
            <Touchable key={data.id} onPress={this.onPress}>
                <View style={styles.item}>
                    <Text style={active ? styles.activeTitle : styles.title}>{data.title}</Text>
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: 50,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
    },
    activeTitle: {
        fontSize: 12,
        color: Color.theme,
    },
})
export default TopBatItem;
