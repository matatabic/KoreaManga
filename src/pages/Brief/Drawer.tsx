import React from 'react';
import {Animated, FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import Header from "@/pages/Brief/DrawerComponents/Header";
import {IChapter} from "@/models/brief";
import Item from "@/pages/Brief/DrawerComponents/Item";


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

class Drawer extends React.Component<IProps> {

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

    render() {
        const {drawerTranslateX, statusBarHeight, chapterList} = this.props;
        return (
            <Animated.View style={[styles.wrapper, {
                transform: [{translateX: drawerTranslateX}]
            }]}>
                <View style={styles.container}>
                    <Touchable onPress={this.hideDrawer} style={styles.transparentView}/>
                    <View style={[styles.listContainer, {
                        paddingTop: statusBarHeight
                    }]}>
                        <Header/>
                        <FlatList
                            data={chapterList}
                            renderItem={this.renderItem}
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

export default connector(Drawer);
