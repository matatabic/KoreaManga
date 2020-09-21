import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, ListRenderItemInfo} from 'react-native';
import Icon from '@/assets/iconfont/index';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {RootState} from "@/models/index";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "@/navigator/index";
import {connect, ConnectedProps} from "react-redux";
import {BlurView} from "@react-native-community/blur";
import {IChapter} from "@/models/brief";
import ChapterItem from "@/pages/Brief/ChapterItem";


const mapStateToProps = ({brief}: RootState, {route}: { route: RouteProp<RootStackParamList, 'Brief'> }) => {
    const {data} = route.params;

    return {
        data,
        chapterList:brief.chapterList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, 'Brief'>
}

class Brief extends React.PureComponent<IProps> {

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const {dispatch,data} = this.props;
        dispatch({
            type:'brief/fetchChapterList',
            payload:{
                data
            }
        })
    }

    get header(){
        const {data} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.blurView}>
                    <Image source={{uri: data.image}} style={styles.TopBackground}/>
                    <BlurView
                        blurType="light"
                        blurAmount={10}
                        style={[StyleSheet.absoluteFillObject, {height: 500}]}
                    />
                </View>
                <View style={styles.headerContainer}>
                    <View style={styles.leftView}>
                        <Icon name="icon-arrow-left-bold" size={24}/>
                    </View>
                    <View style={styles.rightView}>
                        <Icon style={styles.rightIcon} name="icon-shangbian" size={22}/>
                        <Icon style={styles.rightIcon} name="icon-xiabian" size={22}/>
                        <Icon style={styles.rightIcon} name="icon-jubao" size={22}/>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <Text>

                    </Text>

                </View>
            </View>
        )
    }

    renderItem = ({item}: ListRenderItemInfo<IChapter>) => {
        return <ChapterItem  />;
    };

    render() {
        const {chapterList} = this.props;

        return (
            <FlatList
                ListHeaderComponent={this.header}
                data={chapterList}
                renderItem={this.renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {

        paddingTop: getStatusBarHeight()
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 15,
    },
    blurView: {
        ...StyleSheet.absoluteFillObject
    },
    TopBackground: {
        width: '100%',
        height: 500,
    },
    leftView: {},
    rightView: {
        flexDirection: 'row',
    },
    rightIcon: {
        marginHorizontal: 15
    },
    mainContainer: {}

})

export default connector(Brief);
