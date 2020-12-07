import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Touchable from "@/components/Touchable";
import {Color} from "@/utils/const";

interface IProps {
    destroyHistory: () => void;
}

class DestroyView extends React.PureComponent<IProps> {

    destroyHistory = () => {
        const {destroyHistory} = this.props;
        if (typeof destroyHistory === "function") {
            destroyHistory();
        }
    }

    render() {
        return (
            <Touchable onPress={this.destroyHistory} style={styles.container}>
                <Text style={styles.title}>清除历史记录</Text>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
    },
    title: {
        color: Color.dark_title,
    }
})

export default DestroyView;
