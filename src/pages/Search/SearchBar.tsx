import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import Touchable from "@/components/Touchable";
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";

const mapStateToProps = ({search}: RootState) => {
    return {
        searchTitle: search.searchTitle,
        showBookView: search.showBookView,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

interface IState {
    reloadData: Boolean;
    searchTitle: string;
}

class SearchBar extends React.PureComponent<IProps, IState> {

    timeout: any = null;
    lastSearchTitle: string = '';

    constructor(Props: IProps) {
        super(Props);
        this.state = {
            reloadData: true,
            searchTitle: '',
        }
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        if (nextProps.searchTitle === '') {
            return {
                reloadData: true,
            }
        }

        if (prevState.reloadData && nextProps.searchTitle !== '') {
            return {
                searchTitle: nextProps.searchTitle,
                reloadData: false,
            }
        }

        return null;
    }

    chaCha = () => {
        const {dispatch} = this.props
        this.setState({
            searchTitle: ''
        })
        dispatch({
            type: 'search/setState',
            payload: {
                searchTitle: '',
                bookList: [],
                showSimpleView: false,
                showBookView: false,
            }
        })
    }

    debounce = (cb: any, text: string, wait = 500) => {
        let timeout = this.timeout
        if (timeout !== null) {
            clearTimeout(timeout)
        }
        this.timeout = setTimeout(() => {
            this.timeout = null
            cb && cb()
        }, wait);
    }

    loadData = () => {
        const {dispatch, showBookView} = this.props;
        const {searchTitle} = this.state;

        if (!showBookView) {
            dispatch({
                type: 'search/fetchSimpleList',
                payload: {
                    page_size: 5,
                    current_page: 1,
                    title: searchTitle
                }
            })
            dispatch({
                type: 'search/setState',
                payload: {
                    searchTitle,
                    showSimpleView: true,
                }
            })
        }

    }

    onChangeText = (text: string) => {
        const {dispatch} = this.props;
        this.setState({
            searchTitle: text
        })
        console.log(text.length)
        if (text && text.length > 0) {
            this.debounce(this.loadData, text, 250)
        } else {
            console.log('showSimpleView: falseshowSimpleView: falseshowSimpleView: false')
            dispatch({
                type: 'search/setState',
                payload: {
                    searchTitle: '',
                    bookList: [],
                    showSimpleView: false,
                    showBookView: false,
                }
            })
        }
    }

    onSubmitEditing = () => {
        const {dispatch} = this.props;
        const {searchTitle} = this.state;
        if (searchTitle && searchTitle.length > 0) {
            dispatch({
                type: 'search/setState',
                payload: {
                    showBookView: true,
                    searchTitle
                }
            })
            dispatch({
                type: 'search/fetchBookList',
                payload: {
                    title: searchTitle,
                    refreshing: true,
                }
            })

            if (searchTitle != '' && this.lastSearchTitle !== searchTitle) {
                dispatch({
                    type: 'search/addSearch',
                    payload: {
                        searchTitle
                    }
                })
            }

            this.lastSearchTitle = searchTitle
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftView}>
                    <Icon name="icon-search" style={styles.searchIcon} size={18}/>
                    <TextInput style={styles.searchInput}
                               onSubmitEditing={this.onSubmitEditing}
                               maxLength={20}
                               placeholder={'搜索关键字...'}
                               ref='textInputRefer'
                               onChangeText={(text) => {
                                   this.onChangeText(text)
                               }}
                               value={this.state.searchTitle}
                    />
                    <Touchable onPress={this.chaCha}>
                        <Icon name="icon-chacha" style={styles.chaCha} size={18}/>
                    </Touchable>
                </View>
                <Touchable onPress={() => this.props.navigation.goBack()}>
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
        backgroundColor: Color.theme,
    },
    leftView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.page_bg,
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    searchView: {
        flex: 1,
        backgroundColor: Color.page_bg
    },
    searchIcon: {
        marginHorizontal: 10,
    },
    chaCha: {
        marginHorizontal: 10,
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
