import React from 'react';
import {Animated, Easing, FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import Header from "./LightDrawerComponents/Header";
import {IChapter} from "@/models/brief";
import Item from "./LightDrawerComponents/Item";


const mapStateToProps = ({brief}: RootState) => {
    return {
        statusBarHeight: brief.statusBarHeight,
        book_update_info: brief.book_update_info,
        chapterList: brief.chapterList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    drawerTranslateX: any;
    goMangaView: (data: IChapter) => void;
    hideDrawer: () => void;
}

interface IState {
    chapterList: IChapter[];
}

class LightDrawer extends React.Component<IProps, IState> {

    spinValue = new Animated.Value(0)
    isSpin: boolean = true;

    constructor(props: IProps) {
        super(props);
        this.state = {
            chapterList: this.props.chapterList
        }

    }

    hideDrawer = () => {
        const {hideDrawer} = this.props;
        if (typeof hideDrawer === "function") {
            hideDrawer();
        }
    }

    renderItem = ({item}: ListRenderItemInfo<IChapter>) => {
        return (
            <Item data={item} goMangaView={this.props.goMangaView}/>
        )
    }

    reverse = () => {
        if (this.isSpin) {
            Animated.timing(
                this.spinValue,
                {
                    toValue: 0.5,
                    duration: 250,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start();
        } else {
            Animated.timing(
                this.spinValue,
                {
                    toValue: 1,
                    duration: 250,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start(() => this.spinValue.setValue(0));
        }
        this.setState({
            chapterList:[...this.state.chapterList.reverse()]
        })
        this.isSpin = !this.isSpin
    }

    render() {
        const {drawerTranslateX, statusBarHeight} = this.props;
        const {chapterList} = this.state;

        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <Animated.View style={[styles.wrapper, {
                transform: [{translateX: drawerTranslateX}]
            }]}>
                <View style={styles.container}>
                    <Touchable onPress={this.hideDrawer} style={styles.transparentView}/>
                    <View style={[styles.listContainer, {
                        paddingTop: statusBarHeight
                    }]}>
                        <Header spin={spin} reverse={this.reverse}/>
                        <FlatList
                            data={chapterList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, key) => `item-${key}-item-${item.id}`}
                            extraData={this.state}
                        />
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
    },
    container: {
        flex: 1,
        flexDirection: "row",
    },
    transparentView: {
        flex: 1,
        backgroundColor: Color.translucent,
    },
    listContainer: {
        flex: 5,
        backgroundColor: Color.page_bg,
    }
})

export default connector(LightDrawer);
