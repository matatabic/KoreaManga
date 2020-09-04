import React from 'react';

import Home from '@/pages/Home';
import TopBarWrapper from '@/pages/views/TopBarWrapper';
import {StyleSheet, Text, View} from 'react-native';

class HomeTabs extends React.Component {
    renderTabBar = () => {
        return <TopBarWrapper/>;
    };

    render() {
        return (
            <View>
                {this.renderTabBar()}
                <Home/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sceneContainer: {
        backgroundColor: 'transparent',
    },
});

export default HomeTabs;
