import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Color} from "@/utils/const";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";

const mapStateToProps = ({brief}: RootState) => {
    return {
        data: brief.bookInfo,
        book_update_info: brief.book_update_info,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class BookIntro extends React.Component<ModelState> {
    render() {
        const {data, book_update_info} = this.props;
        return (
            <>
                <View style={styles.description}>
                    <Text style={styles.descriptionTitle}>{data.description}</Text>
                </View>
                <View style={styles.itemHeader}>
                    <View style={styles.itemHeaderLeft}>
                        <Text style={styles.itemHeaderLeftTitle}>章节</Text>
                    </View>
                    <View style={styles.itemHeaderRight}>
                        <Text style={styles.itemHeaderRightTitle}>{book_update_info}</Text>
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        flex: 1,
        backgroundColor: Color.page_bg,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 5,
    },
    descriptionTitle: {
        color: Color.dark_title,
    },
    itemHeader: {
        flex: 1,
        height: 45,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: Color.page_bg,
    },
    itemHeaderLeft: {
        marginLeft: 10,
    },
    itemHeaderLeftTitle: {
        fontSize: 15
    },
    itemHeaderRight: {
        marginRight: 15,
    },
    itemHeaderRightTitle: {
        fontSize: 12,
        color: Color.dark_title,
    },
})

export default connector(BookIntro);
