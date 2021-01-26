import React from 'react';
import {View, Text, StyleSheet, SectionList, SectionListRenderItemInfo, Animated} from 'react-native';
import Carousel, {sideHeight} from "@/pages/Home/Carousel";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import {IBook} from "@/models/home";
import TopBarWrapper from "@/pages/views/TopBarWrapper";
import CarouselBlurBackground from "@/pages/views/CarouselBlurBackground";
import {viewportWidth} from "@/utils/index";
import {Color} from "@/utils/const";
import BookCover from "@/components/BookCover";
import More from "@/components/More";
import End from "@/components/End";
import HomePlaceholder from "@/components/Placeholder/HomePlaceholder";


const mapStateToProps = ({home, loading}: RootState) => {
    return {
        commendList: home.commendList,
        refreshing: home.refreshing,
        hasMore: home.hasMore,
        loading: loading.effects['home/fetchCommendList']
    };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
    navigation: RootStackNavigation;
}

interface IState {
    endReached: boolean;
}

const maxScroll = sideHeight + 10;

class Home extends React.PureComponent<IProps, IState> {

    scrollY = new Animated.Value(0)

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
        };
    }

    componentDidMount() {
        this.loadData(true);
    }

    loadData = (refreshing: boolean, callback?: () => void) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'home/fetchCommendList',
            payload: {
                refreshing
            },
            callback
        });
    };

    getTopBarColor = () => {
        return this.scrollY.interpolate({
            inputRange: [0, maxScroll],
            outputRange: ['transparent', Color.theme],
            extrapolate: "clamp",
        })
    }

    onRefresh = () => {
        this.loadData(true)
    }

    get header() {
        return (
            <View style={styles.carouselTop}>
                <Carousel/>
            </View>
        );
    }

    goBrief = (data: IBook) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            id: data.id
        });
    };

    onEndReached = () => {
        const {hasMore, loading} = this.props;
        if (!hasMore || loading) {
            return;
        }
        this.setState({
            endReached: true,
        });
        this.loadData(false, () => {
            this.setState({
                endReached: false,
            });
        });
    }

    renderFooter = () => {
        const {hasMore} = this.props;
        const {endReached} = this.state;
        if (endReached) {
            return <More/>;
        }
        if (!hasMore) {
            return <End/>;
        }

        return null;
    };

    renderItem = ({item}: SectionListRenderItemInfo<IBook[]>) => {
        return (
            <View style={styles.contentContainer}>
                {item.map(data => {
                    return (
                        <BookCover data={data} goBrief={this.goBrief} key={data.id}/>
                    )
                })}
            </View>
        )
    };

    renderSectionHeader = ({section: {title}}: any) => {
        return (
            <View style={styles.sectionHeader}>
                <View style={styles.cell}/>
                <Text style={styles.classifyName}>{title}</Text>
            </View>
        );
    }

    render() {
        const {commendList, refreshing, navigation, loading} = this.props;
        const topBarColor = this.getTopBarColor();
        return (
            (loading && refreshing) ? <HomePlaceholder/> :
                <View style={{flex: 1}}>
                    <CarouselBlurBackground/>
                    <TopBarWrapper navigation={navigation} topBarColor={topBarColor}/>
                    <SectionList
                        keyExtractor={(item, index) => `item-${item['id']}-key-${index}`}
                        ListHeaderComponent={this.header}
                        renderSectionHeader={this.renderSectionHeader}
                        onRefresh={this.onRefresh}
                        refreshing={refreshing}
                        sections={commendList}
                        stickySectionHeadersEnabled={true}
                        scrollEventThrottle={1}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: {contentOffset: {y: this.scrollY}}
                            }],
                            {
                                useNativeDriver: false
                            }
                        )}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.1}
                        renderItem={this.renderItem}
                        extraData={this.state}
                        ListFooterComponent={this.renderFooter}
                    />
                </View>
        )
    }
}

const styles = StyleSheet.create({
    carouselTop: {
        paddingTop: 10,
    },
    itemContainer: {
        backgroundColor: Color.page_bg
    },
    sectionHeader: {
        width: viewportWidth,
        height: 35,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 8,
        backgroundColor: Color.page_bg
    },
    cell: {
        width: 6,
        height: 15,
        backgroundColor: Color.yellow_title,
    },
    classifyName: {
        marginLeft: 15,
        fontSize: 15,
        color: Color.black,
    },
    contentContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: Color.page_bg,
    }
})

export default connector(Home);
