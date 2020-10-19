import React from 'react';
import {Image} from 'react-native';
import {viewportWidth} from "@/utils/index";
import {IEpisode} from "@/models/mangaView";

interface IProps {
    data: IEpisode;
}

class Item extends React.PureComponent<IProps> {
    render() {
        const {data} = this.props;
        return (
            <Image source={{uri: data.image}}
                   resizeMode="stretch"
                   style={{
                       width: viewportWidth,
                       height: viewportWidth * data.multiple
                   }}
            />
        );
    }
}

export default Item;
