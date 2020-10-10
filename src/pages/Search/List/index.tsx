import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IProps {
    data: any
}

class Item extends React.Component<IProps> {

    get renderItem() {
        const {data} = this.props;
        return (
            <>
                {
                    data.map((items: any, index: string) => {
                        return (
                            <View style={styles.itemView} key={index}>
                                {
                                    items.map((item: any, index: string) => {
                                        return (
                                            <View style={styles.item} key={index}>
                                                <Text style={styles.title}>{item}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </>
        )
    }

    render() {
        const {data} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.ad}>大家都在搜</Text>
                <View style={styles.itemContainer}>
                    {this.renderItem}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 235,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    ad: {
        color: '#a6a6a6',
        marginTop: 15,
        fontSize: 12,
    },
    itemContainer: {
        flex: 1,
        marginVertical: 15,
    },
    itemView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    item: {
        height: '100%',
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5
    },
    title: {
        marginHorizontal: 7
    }
})
export default Item;
