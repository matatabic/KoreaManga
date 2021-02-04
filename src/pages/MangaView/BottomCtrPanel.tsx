import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import {Color} from "@/utils/const";
import {viewportWidth} from "@/utils/index";
import {getBottomSpace} from "react-native-iphone-x-helper";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import CurrentView from "@/pages/MangaView/PanelComponents/CurrentView";
import SliderView from "@/pages/MangaView/PanelComponents/SliderView";
import BottomView from "@/pages/MangaView/PanelComponents/BottomView";

const mapStateToProps = ({brief}: RootState) => {
    return {
        statusBarHeight: brief.statusBarHeight,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    bottomPanelValue: Animated.Value;
    scrollToIndex: (index: number) => void;
    showDrawer: () => void;
    lastChapter: () => void;
    nextChapter: () => void;
}

function BottomCtrPanel({bottomPanelValue, scrollToIndex, showDrawer,lastChapter,nextChapter}: IProps) {
    return (
        <Animated.View style={[styles.wrapper, {
            transform: [{translateY: bottomPanelValue}]
        }]}>
            <CurrentView/>
            <SliderView scrollToIndex={scrollToIndex} lastChapter={lastChapter} nextChapter={nextChapter}/>
            <BottomView showDrawer={showDrawer}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        right: 0,
        width: viewportWidth,
        backgroundColor: Color.black,
        bottom: getBottomSpace(),
        zIndex: 10
    },
    container: {
        flexDirection: "row",
    }

})

export default connector(BottomCtrPanel);
