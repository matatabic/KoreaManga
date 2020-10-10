import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Icon from "@/assets/iconfont";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import Touchable from "@/components/Touchable";
import {initialState} from "@/models/search";

const mapStateToProps = ({search}: RootState) => {
    return {
        bookList: search.bookList
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    goBack: any;
}


class SearchBar extends React.PureComponent<IProps> {

    timeout: any = null;
    inputText: string = '';


    goBack = () => {
        const {goBack} = this.props;
        goBack();
    }


    debounce = (cb: any, text: string, wait = 500) => {
        let timeout = this.timeout
        if (timeout !== null) {
            clearTimeout(timeout)
        }
        this.timeout = setTimeout(() => {
            this.timeout = null
            this.inputText = text;
            cb && cb()
        }, wait);
    }

    fetch = () => {
        const {dispatch} = this.props;
        if (this.inputText.length > 0) {
            dispatch({
                type: 'search/fetchSimpleList',
                payload: {
                    page_size: 5,
                    current_page: 1,
                    title: this.inputText
                }
            })
            dispatch({
                type: 'search/setState',
                payload: {
                    hasSearch: true,
                }
            })
        } else {
            dispatch({
                type: 'search/setState',
                payload: {
                    ...initialState
                }
            })
        }
    }

    onChangeText = (text: string) => {
        this.debounce(this.fetch, text, 500)
    }

    onSubmitEditing = () => {
        const {dispatch} = this.props;
        if (this.inputText && this.inputText.length > 0) {
            dispatch({
                type:'search/setState',
                payload:{
                    searchValue:this.inputText
                }
            })
            dispatch({
                type: 'search/fetchBookList',
                payload: {
                    title: this.inputText,
                    refreshing: true,
                }
            })
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftView}>
                    <Icon name="icon-search" style={styles.searchIcon} size={15}/>
                    <TextInput style={styles.searchInput}
                               onSubmitEditing={this.onSubmitEditing}
                               maxLength={20}
                               placeholder={'搜索关键字...'}
                               onChangeText={(text) => {
                                   this.onChangeText(text)
                               }}
                    >
                    </TextInput>
                </View>
                <Touchable onPress={this.goBack}>
                    <View style={styles.rightView}>
                        <Text>取消</Text>
                    </View>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        paddingTop: getStatusBarHeight(),
        backgroundColor: '#FCE04F'
    },
    leftView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    searchView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchIcon: {
        marginHorizontal: 8,
    },
    searchInput: {
        flex: 1,
        padding: 0
    },
    rightView: {
        width: 30,
        height: '100%',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
})

export default connector(SearchBar);
