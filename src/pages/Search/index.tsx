import React from 'react';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import {IBook} from "@/models/search";
import SearchBar from "./SearchBar";
import Intro from "./Intro";
import BookList from "./BookList";
import SearchHistory from "./SearchHistory";
import Simple from "./Simple";
import {ScrollView} from "react-native";

const mapStateToProps = ({search}: RootState) => {
    return {
        showSimpleView: search.showSimpleView,
        showBookView: search.showBookView,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

class Search extends React.Component<IProps> {

    goBrief = (data: IBook) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            id: data.id
        })
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'search/setState',
            payload: {
                searchTitle: '',
                showSimpleView: false,
                showBookView: false,
            }
        })
    }

    get renderItem() {
        const {showSimpleView, showBookView} = this.props;
        if (showBookView) {
            return <BookList goBrief={this.goBrief}/>
        } else if (showSimpleView) {
            return <Simple goBrief={this.goBrief}/>
        } else {
            return (
                <ScrollView>
                    <Intro goBrief={this.goBrief}/>
                    <SearchHistory/>
                </ScrollView>
            );
        }
    }

    render() {
        return (
            <>
                <SearchBar navigation={this.props.navigation}/>
                {this.renderItem}
            </>
        )
    }
}


export default connector(Search);
