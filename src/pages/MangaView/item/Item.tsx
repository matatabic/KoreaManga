import React from 'react';
import {Image} from 'react-native';
import {viewportWidth} from "@/utils/index";
import {IEpisode} from "@/models/mangaView";
import FastImage from 'react-native-fast-image'

interface IProps {
    data: IEpisode;
}

class Item extends React.PureComponent<IProps> {

    onLoadStart = () => {
        console.log('onLoadStart')
    }

    render() {
        const {data} = this.props;
        return (
            <FastImage source={{uri: data.image, cache: FastImage.cacheControl.immutable}}
                       resizeMode={FastImage.resizeMode.contain}
                       onLoadStart={this.onLoadStart}
                       style={{
                           width: viewportWidth,
                           height: viewportWidth * data.multiple,
                           backgroundColor: 'yellow'
                       }}
            />
        );
    }
}

export default Item;
