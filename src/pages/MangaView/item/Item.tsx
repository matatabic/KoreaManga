import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {viewportWidth} from "@/utils/index";
import {IEpisode} from "@/models/mangaView";
import FastImage from 'react-native-fast-image'

interface IProps {
    data: IEpisode;
}

class Item extends React.PureComponent<IProps> {

    onError = () => {
        console.log('onError')
    }

    render() {
        const {data} = this.props;
        return (
            <View style={styles.container}>
                <FastImage source={{uri: data.image}}
                           style={{
                               width: viewportWidth,
                               height: viewportWidth * data.multiple,
                           }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
})

export default Item;
