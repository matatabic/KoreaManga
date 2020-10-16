import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IntroItem from "@/pages/Search/Item/IntroItem";
import {IBook} from "@/models/search";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {Color} from "@/utils/const";

const mapStateToProps = ({search}: RootState) => {
    return {
        introList: search.introList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    goBrief: (data: IBook) => void;
}

class Intro extends React.PureComponent<IProps> {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'search/fetchIntroList'
        });
    }

    get renderItem() {
        const {introList, goBrief} = this.props;
        return (
            Object.keys(introList).map((value, key) => {
                return (
                    <View style={styles.item} key={key}>
                        {
                            introList[value].map((item: IBook, index: string) => {
                                return (
                                    <View key={`key-${key}-${index}`}>
                                        <IntroItem data={item} onPress={goBrief}/>
                                    </View>
                                )
                            })
                        }
                    </View>
                )
            })
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerTitle}>大家都在搜</Text>
                <View style={styles.itemView}>
                    {this.renderItem}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 235,
        backgroundColor: Color.page_bg,
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: Color.dark_title,
        marginTop: 15,
        fontSize: 12,
    },
    itemView: {
        flex: 1,
        marginVertical: 15,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
})
export default connector(Intro);
