import React from 'react';
import BookList from "@/components/BookList";
import {IBook} from "@/models/search";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import ListPlaceholder from "@/components/Placeholder/ListPlaceholder";
import {RootStackNavigation, RootStackParamList} from "@/navigator/index";
import {RouteProp} from "@react-navigation/native";


const mapStateToProps = ({guess, loading}: RootState) => {
    return {
        bookList: guess.bookList,
        refreshing: guess.refreshing,
        hasMore: guess.hasMore,
        loading: loading.effects['guess/fetchGuessList']
    }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
    route: RouteProp<RootStackParamList, 'Guess'>;
}


class Guess extends React.Component<IProps> {

    componentDidMount() {
        const {headerTitle} = this.props.route.params;
        const {navigation} = this.props;

        navigation.setOptions({
            headerTitle: headerTitle
        })
        this.loadData(true);
    }

    loadData = (refreshing: boolean, callback?: () => void) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'guess/fetchGuessList',
            payload: {
                refreshing
            },
            callback
        });
    }

    goBrief = (data: IBook) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            id: data.id
        });
    };

    render() {
        const {
            bookList,
            refreshing,
            loading,
            hasMore,
        } = this.props;

        return (
            (loading && refreshing) ? <ListPlaceholder/> :
                <BookList
                    data={bookList}
                    loading={loading}
                    refreshing={refreshing}
                    hasMore={hasMore}
                    loadData={this.loadData}
                    goBrief={this.goBrief}
                />
        );
    }
}


export default connector(Guess);
