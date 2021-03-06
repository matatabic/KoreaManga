import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Loader, Placeholder} from "rn-placeholder";

class More extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Placeholder
                    Animation={Loader}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginVertical: 15,
        alignItems: 'center',
    },
});

export default More;
