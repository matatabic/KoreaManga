import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Carousel from "@/pages/Home/Carousel";


class Home extends React.Component {
    render() {
        return (
            <View>
                <Carousel/>
            </View>
        );
    }
}

export default Home;
