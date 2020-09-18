import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IBookCover, ICommendList} from '@/models/home';
import BookCover from '@/components/BookCover';


interface IProps {
    data: ICommendList;
    goBrief: (data: IBookCover) => void;
}


class CommendItem extends React.PureComponent<IProps> {

    renderItem = (item: IBookCover, index: Number) => {
        const {goBrief} = this.props;
        return (
            <BookCover
                data={item}
                goBrief={goBrief}
                key={item.id}
            />
        );
    };

    render() {
        const {data} = this.props;
        return (
            <View style={styles.container}>
                {Object.keys(data).map((classify) => {
                    return (
                        <View key={classify}>
                            <View style={styles.header}>
                                <View style={styles.cell}/>
                                <Text style={styles.classifyName}>{classify}</Text>
                            </View>
                            <View style={styles.classifyView}>
                                {data[classify].map(this.renderItem)}
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection:'row',
        justifyContent:"flex-start",
        alignItems:'center',
        paddingVertical: 8,
        borderBottomColor: '#efefef',
    },
    cell:{
        width:6,
        height:15,
        backgroundColor:'#FBDB3F'
    },
    classifyName: {
        marginLeft:15,
        fontSize: 15,
        color: '#000',
    },
    classifyView: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        flexWrap: 'wrap',
    }
});

export default CommendItem;
