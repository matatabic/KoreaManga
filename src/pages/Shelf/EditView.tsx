import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getBottomSpace} from "react-native-iphone-x-helper";
import {Color} from "@/utils/const";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";


const mapStateToProps = ({shelf}: RootState) => {
    return {
        ids: shelf.ids,
        activePage: shelf.activePage,
        collectionList: shelf.collectionList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    isEdit: boolean;
    checkAll: () => void;
    destroy: () => void;
}

class EditView extends React.Component<IProps> {

    checkAll = () => {
        const {checkAll} = this.props;
        if (typeof checkAll === 'function') {
            checkAll();
        }
    }

    destroy = () => {
        const {destroy} = this.props;
        if (typeof destroy === 'function') {
            destroy();
        }
    }

    render() {
        const {isEdit, ids, collectionList} = this.props;
        return (
            isEdit &&
            <View>
                <View style={styles.container}>
                    <Touchable style={styles.content} onPress={this.checkAll}>
                        {ids.length === collectionList.length ?
                            <>
                                <Icon name="icon-tianxie" size={18} color={Color.red}/>
                                <Text style={{color: Color.red, marginLeft: 10}}>取消全选</Text>
                            </> :
                            <>
                                <Icon name="icon-gouxuan" size={18} color={Color.grey}/>
                                <Text style={{color: Color.grey, marginLeft: 10}}>全选</Text>
                            </>
                        }
                    </Touchable>
                    <Touchable style={styles.content} onPress={this.destroy}>
                        {ids.length > 0 ?
                            <>
                                <Icon name="icon-lajitong" size={18} color={Color.red}/>
                                <Text style={{color: Color.red, marginLeft: 10}}>删除({ids.length})</Text>
                            </> :
                            <Icon name="icon-lajitong" size={18} color={Color.grey}/>
                        }
                    </Touchable>
                </View>
                <View style={styles.space}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 49,
        flexDirection: 'row',
        backgroundColor: Color.page_bg,
    },
    space: {
        height: getBottomSpace(),
        backgroundColor: Color.page_bg,
    },
    content: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.grey,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default connector(EditView);