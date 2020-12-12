import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {viewportWidth} from "@/utils/index";
import {IEpisode} from "@/models/mangaView";
import FastImage, {OnProgressEvent} from 'react-native-fast-image'
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Color} from "@/utils/const";

interface IProps {
    data: IEpisode;
}

class Item extends React.PureComponent<IProps> {

    total = 0;
    state = {
        current_load: 0,
        loaded: true,
    }

    onError = () => {
        console.log('onError')
    }

    onLoadEnd = () => {
        setTimeout(() => {
            this.setState({
                loaded: false
            })
        }, 300)
    }

    onProgress = (event: OnProgressEvent) => {
        if (this.total === 0) {
            this.total = event.nativeEvent.total;
        }
        if (this.state.current_load !== event.nativeEvent.loaded) {
            this.setState({
                current_load: Math.round(event.nativeEvent.loaded / event.nativeEvent.total * 100)
            })
        }
    }

    render() {
        const {data} = this.props;
        const {loaded} = this.state;
        return (
            <View style={styles.container}>
                <FastImage source={{uri: data.image}}
                           onLoadEnd={this.onLoadEnd}
                           onProgress={(event) => this.onProgress(event)}
                           style={{
                               width: viewportWidth,
                               height: viewportWidth * data.multiple,
                           }}
                />
                {
                    loaded &&
                    <View style={[styles.CircularLoad, {
                        width: viewportWidth,
                        height: viewportWidth * data.multiple,
                    }]}>
                        <AnimatedCircularProgress
                            size={150}
                            width={15}
                            backgroundWidth={15}
                            fill={this.state.current_load}
                            tintColor={Color.theme}
                            backgroundColor={Color.white}
                        >
                            {fill => <Text style={styles.points}>{Math.round(fill)}</Text>}
                        </AnimatedCircularProgress>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    CircularLoad: {
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.black,
    },
    points: {
        textAlign: 'center',
        color: Color.theme,
        fontSize: 50,
        fontWeight: '500',
    },
})

export default Item;
