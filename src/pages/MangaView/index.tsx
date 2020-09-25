import React from 'react';
import {View, Text} from 'react-native';
import {IChapter} from "@/models/brief";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RouteProp} from "@react-navigation/native";

import {RootStackParamList} from "@/navigator/index";

const mapStateToProps = (state: RootState,) => {
    return {

    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState{
    route:RouteProp<RootStackParamList, 'MangaView'>;
    data:IChapter;
}

class MangaView extends React.Component<IProps> {
    render() {
        const {data,route} = this.props;

        return (
            <View>
                <Text>MangaView{route.params.data.id}</Text>
            </View>
        );
    }
}

export default connector(MangaView);
