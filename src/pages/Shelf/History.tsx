import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList,
    SectionListRenderItemInfo,
} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ModalStackNavigation, RootStackNavigation} from "@/navigator/index";
import {IHistory} from "@/models/shelf";
import {Color} from "@/utils/const";
import HistoryItem from "@/pages/Shelf/Item/HistoryItem";
import More from "@/components/More";
import End from "@/components/End";
import EditView from "@/pages/Shelf/EditView";

const mapStateToProps = ({user, shelf, loading}: RootState) => {
    return {
        isLogin: user.isLogin,
        historyList: shelf.historyList,
        isEdit: shelf.isEditHistory,
        refreshing: shelf.refreshing,
        hasMore: shelf.historyHasMore,
        loading: loading.effects['shelf/fetchHistoryList']
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation & ModalStackNavigation;
}

interface IState {
    endReached: boolean;
}

class History extends React.PureComponent<IProps, IState> {

    _unsubscribe: () => void = () => {
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
        };
    }

    componentDidMount() {
        this.loadData(true);
        const {navigation, dispatch} = this.props;
        this._unsubscribe = navigation.addListener('focus', () => {
            dispatch({
                type: 'shelf/setActivePage',
                payload: {
                    activePage: 2,
                    isEditHistory: false,
                    isEditCollection: false,
                }
            })
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    loadData = (refreshing: boolean, callback?: () => void) => {
        const {dispatch, isLogin} = this.props;
        if (isLogin) {
            dispatch({
                type: 'shelf/fetchHistoryList',
                payload: {
                    refreshing: refreshing,
                },
                callback
            });
        }
    }

    renderSectionHeader = ({section: {title}}: any) => {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
        );
    }


    renderItem = ({item}: SectionListRenderItemInfo<IHistory[]>) => {
        return (
            <HistoryItem data={item}/>
        )
    }

    onRefresh = () => {
        this.loadData(true)
    }

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
    }

    checkAll = () => {

    }

    destroy = () => {

    }

    render() {
        const {refreshing, historyList, isEdit} = this.props;
        return (
            <View style={styles.container}>
                <SectionList
                    keyExtractor={(item, index) => `section-item-${index}`}
                    renderSectionHeader={this.renderSectionHeader}
                    onRefresh={this.onRefresh}
                    refreshing={refreshing}
                    sections={historyList}
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    stickySectionHeadersEnabled={true}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.1}
                    renderItem={this.renderItem}
                    extraData={this.state}
                    ListFooterComponent={this.renderFooter}
                />
                <EditView isEdit={isEdit} checkAll={this.checkAll} destroy={this.destroy}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 15,
        backgroundColor: Color.page_bg,
    },
    headerView: {
        height: 45,
        justifyContent: 'center',
        backgroundColor: Color.page_bg,
    },
    headerTitle: {
        fontSize: 16,
    }
})

export default connector(History);
