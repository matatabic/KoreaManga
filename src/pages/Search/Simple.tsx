import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IBook} from "@/models/search";
import SimpleItem from "./Item/SimpleItem";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";


const mapStateToProps = ({search}: RootState) => {
    return {
        searchTitle: search.searchTitle,
        simpleList: search.simpleList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    goBrief: (data: IBook) => void;
}

class Simple extends React.PureComponent<IProps> {

    get renderItem() {
        const {simpleList, goBrief} = this.props;
        return (
            simpleList.map((item, index) => {
                return (
                    <View key={index}>
                        <SimpleItem data={item} goBrief={goBrief}/>
                    </View>
                )
            })
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderItem}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 220,
    }
})
export default connector(Simple);
