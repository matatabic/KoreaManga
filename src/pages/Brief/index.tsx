import React from 'react';
import {View, Text, StyleSheet, FlatList, ListRenderItemInfo, Image} from 'react-native';
import {RootState} from "@/models/index";
import {RouteProp} from "@react-navigation/native";
import {RootStackNavigation, RootStackParamList} from "@/navigator/index";
import {connect, ConnectedProps} from "react-redux";
import {IChapter, initialState} from "@/models/brief";
import Item from "./Item";
import ImageBlurBackground from "@/pages/views/ImageBlurBackground";
import TopBarWrapper from "./TopBarWrapper";
import {ip} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Icon from "@/assets/iconfont";
import Footer from "./Footer";


const mapStateToProps = ({brief}: RootState, {route}: { route: RouteProp<RootStackParamList, 'Brief'> }) => {
    const {id} = route.params;
    return {
        id,
        title: brief.title,
        image: brief.image,
        category: brief.category,
        author: brief.author,
        description: brief.description,
        status: brief.status,
        collected: brief.collected,
        markChapter: brief.markChapter,
        markIndex: brief.markChapter,
        chapterList: brief.chapterList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, 'Brief'>
    navigation: RootStackNavigation;
}

class Brief extends React.PureComponent<IProps> {

    componentDidMount() {
        this.loadData();
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'brief/setState',
            payload: {
                ...initialState
            }
        })
    }

    loadData = () => {
        const {dispatch, id} = this.props;
        dispatch({
            type: 'brief/fetchBrief',
            payload: {
                book_id: id
            }
        })
    }

    goMangaView = (item: IChapter) => {
        const {navigation, id} = this.props;
        navigation.navigate('MangaView', {
            data: {
                id: item.id,
                title: item.title,
                book_id: id,
            }
        });
    }

    get header() {
        const {title, image, status, author, category, collected, description} = this.props;
        return (
            <View>
                <View>
                    <View style={styles.operateView}>
                        <View style={styles.operateLeftView}>
                            <Icon name="icon-xing" color={collected ? '#F43453' : '#93919c'} size={22}/>
                            <Text>{collected ? '已收藏' : '收藏'}</Text>
                        </View>
                        <View style={styles.operateRightView}>
                            <Text style={styles.operateRightTitle}>开始阅读</Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <View style={styles.bulletinView}>
                            <Image source={{uri: image}} style={styles.image}/>
                            <View style={styles.bulletinTitleView}>
                                <Text style={styles.bulletinTitle}>{title}</Text>
                                <Text style={styles.bulletin}>{status}</Text>
                                <Text style={styles.bulletin}>{author}</Text>
                                <Text style={styles.bulletin}>{category}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.descriptionView}>
                    <Text style={styles.descriptionTitle}>{description}</Text>
                </View>
                <View style={styles.itemHeader}>
                    <View style={styles.itemHeaderLeft}>
                        <Text style={styles.itemHeaderLeftTitle}>章节</Text>
                    </View>
                    <View style={styles.itemHeaderRight}>
                        <Text style={styles.itemHeaderRightTitle}>2020-09-16更新至第363话</Text>
                    </View>
                </View>
            </View>

        );
    }

    renderItem = ({item}: ListRenderItemInfo<IChapter>) => {
        return <Item data={item} goMangaView={this.goMangaView}/>;
    };

    renderFooter = () => {
        return <Footer/>
    }

    render() {
        const {image, chapterList} = this.props;
        if (!image && image.length == 0) {
            return false;
        }
        return (
            <>
                <ImageBlurBackground image={image}/>
                <FlatList
                    ListHeaderComponent={this.header}
                    style={styles.container}
                    data={chapterList}
                    numColumns={4}
                    columnWrapperStyle={styles.columnWrapper}
                    renderItem={this.renderItem}
                    keyExtractor={(item, key) => `item-${key}`}
                    ListFooterComponent={this.renderFooter}
                />
                <TopBarWrapper/>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    columnWrapper: {
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    headerContainer: {
        paddingTop: getStatusBarHeight() + 75,
        marginHorizontal: 10,
        height: 330,
    },
    bulletinView: {
        flexDirection: 'row',
    },
    bulletinTitleView: {
        marginLeft: 10,
    },
    bulletinTitle: {
        color: '#f3f6f6',
        fontSize: 26,
        marginTop: 5,
        marginBottom: 12,
    },
    bulletin: {
        color: '#ccc',
        fontSize: 15,
        marginBottom: 12,
    },
    operateView: {
        position: "absolute",
        width: '100%',
        height: 80,
        bottom: 0,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    operateLeftView: {
        marginTop: 330 - ip(120) - getStatusBarHeight() - 75 - 10,
        marginLeft: 10,
        width: 120,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    operateLeftTitle: {
        marginLeft: 8,
    },
    operateRightView: {
        flex: 1,
        marginTop: 330 - ip(120) - getStatusBarHeight() - 75 - 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F43453',
        marginHorizontal: 10,
        borderRadius: 35,
    },
    operateRightTitle: {
        color: '#fff'
    },
    image: {
        width: 120,
        height: ip(120),
    },
    descriptionView: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 5,
    },
    descriptionTitle: {
        color: '#5B5B5B',
    },
    itemHeader: {
        flex: 1,
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    itemHeaderLeft: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    itemHeaderLeftTitle: {
        fontSize: 15
    },
    itemHeaderRight: {
        flex: 1,
        marginRight: 25,
        justifyContent: 'center',
    },
    itemHeaderRightTitle: {
        fontSize: 12,
        color: '#93919C'
    },
})

export default connector(Brief);
