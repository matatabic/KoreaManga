import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Color} from "@/utils/const";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ip, wp} from "@/utils/index";


const mapStateToProps = ({brief}: RootState) => {
    return {
        title: brief.title,
        image: brief.image,
        category: brief.category,
        author: brief.author,
        description: brief.description,
        status: brief.status,
        collected: brief.collected,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;


const imageWidth = wp(33);
const imageHeight = ip(imageWidth);

class Information extends React.Component<ModelState> {
    render() {
        const {image, title, status, author, category} = this.props;
        if (!(image&&image.length>0)) return null;
        return (
            <View style={styles.bulletinView}>
                <Image source={{uri: image}} style={styles.image}/>
                <View style={styles.bulletinTitleView}>
                    <Text style={styles.bulletinTitle}>{title}</Text>
                    <Text style={styles.bulletin}>{status}</Text>
                    <Text style={styles.bulletin}>{author}</Text>
                    <Text style={styles.bulletin}>{category}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    image: {
        width: imageWidth,
        height: imageHeight,
    },
    bulletinView: {
        flexDirection: 'row',
    },
    bulletinTitleView: {
        marginLeft: 10,
    },
    bulletinTitle: {
        color: Color.grey_title,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 12,
    },
    bulletin: {
        color: Color.grey_title,
        fontSize: 15,
        marginBottom: 12,
    },
})

export default connector(Information);
