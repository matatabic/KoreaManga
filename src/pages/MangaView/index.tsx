import React from 'react';
import {View, Text, FlatList, StyleSheet, ListRenderItemInfo, Image} from 'react-native';
import {IChapter} from "@/models/brief";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RouteProp} from "@react-navigation/native";
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RootStackParamList} from "@/navigator/index";
import {IEpisode} from "@/models/mangaView";
import {viewportHeight, viewportWidth} from "@/utils/index";

const mapStateToProps = ({mangaView}: RootState) => {
    return {
        episodeList: mangaView.episodeList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, 'MangaView'>;
    data: IChapter;
}

interface IState {
    imgHeight: number;
}

class MangaView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            imgHeight: 100,
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const {id, book_id} = this.props.route.params.data;
        dispatch({
            type: 'mangaView/fetchEpisodeList',
            payload: {
                chapter_id: id,
                book_id: book_id
            }
        });
    }

    renderItem = ({item}: ListRenderItemInfo<IEpisode>) => {
        const {imgHeight} = this.state;

        return (
            <Image source={{uri: item.image}} resizeMode="stretch" style={{width: viewportWidth, height: 500}}/>
        )


    }

    render() {
        const {episodeList} = this.props;
        return (
            <FlatList
                // ListHeaderComponent={this.header}
                style={styles.container}
                data={episodeList}
                numColumns={1}
                renderItem={this.renderItem}
                keyExtractor={(item, key) => `item-${key}`}
                // ListFooterComponent={this.renderFooter}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
        backgroundColor: 'red'
    },
    image: {
        width: viewportWidth,
        height: viewportHeight,
    }
})

export default connector(MangaView);
