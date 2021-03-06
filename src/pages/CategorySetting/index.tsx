import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/categorySetting';
import {DragSortableView} from 'react-native-drag-sort';
import {viewportWidth} from '@/utils/index';
import Item from '@/pages/CategorySetting/Item';
import {RootStackNavigation} from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';
import {Color} from "@/utils/const";

const mapStateToProps = ({categorySetting}: RootState) => {
    return {
        myCategories: categorySetting.myCategories,
        categories: categorySetting.categories,
        isEdit: categorySetting.isEdit,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

interface IState {
    myCategories: ICategory[];
}

const fixedItems = [0];

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;
const itemHeight = 48;
const margin = 5;

class CategorySetting extends React.Component<IProps, IState> {
    state = {
        myCategories: this.props.myCategories,
    };

    onSubmit = () => {
        const {dispatch} = this.props;
        const {myCategories} = this.state;
        dispatch({
            type: 'categorySetting/toggle',
            payload: {
                myCategories,
            },
        });
    };

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setOptions({
            headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit}/>,
        });
    }

    UNSAFE_componentWillMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'categorySetting/setState',
            payload: {
                isEdit: false,
            },
        });
    }

    onLongPress = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'categorySetting/setState',
            payload: {
                isEdit: true,
            },
        });
    };

    onPress = (item: ICategory, index: number, selected: boolean) => {
        const {isEdit} = this.props;
        const {myCategories} = this.state;
        const disabled = fixedItems.indexOf(index) > -1;
        if (selected && disabled) {
            return false;
        }
        if (isEdit) {
            if (selected) {
                this.setState({
                    myCategories: myCategories.filter(
                        (selectedItem) => selectedItem.id !== item.id,
                    ),
                });
            } else {
                this.setState({
                    myCategories: myCategories.concat([item]),
                });
            }
        }
    };

    onClickItem = (data: ICategory[], item: ICategory) => {
        this.onPress(item, data.indexOf(item), true);
    };

    renderItem = (item: ICategory, index: number) => {
        const {isEdit} = this.props;
        const disabled = fixedItems.indexOf(index) > -1;
        return (
            <Item
                data={item}
                isEdit={isEdit}
                disabled={disabled}
                selected
            />
        );
    };

    renderUnSelectedItem = (item: ICategory, index: number) => {
        const {isEdit} = this.props;
        return (
            <Touchable
                key={item.id}
                onPress={() => this.onPress(item, index, false)}
                onLongPress={this.onLongPress}>
                <Item
                    data={item}
                    isEdit={isEdit}
                    selected={false}
                />
            </Touchable>
        );
    };

    onDataChange = (data: ICategory[]) => {
        this.setState({
            myCategories: data,
        });
    };

    render() {
        const {myCategories} = this.state;
        const {categories, isEdit} = this.props;

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.classifyName}>我的分类</Text>
                <View style={styles.classifyView}>
                    <DragSortableView
                        dataSource={myCategories}
                        fixedItems={fixedItems}
                        renderItem={this.renderItem}
                        sortable={isEdit}
                        keyExtractor={(item) => item.id}
                        onDataChange={this.onDataChange}
                        parentWidth={parentWidth}
                        childrenWidth={itemWidth}
                        childrenHeight={itemHeight}
                        marginChildrenTop={margin}
                        onClickItem={this.onClickItem}
                    />
                </View>
                <View>
                    {Object.keys(categories).map((classify) => {
                        return (
                            <View key={classify}>
                                <View>
                                    <Text style={styles.classifyName}>{classify}</Text>
                                </View>
                                <View style={styles.classifyView}>
                                    {categories[classify].map(
                                        (item: ICategory, index: number) => {
                                            if (
                                                myCategories.find(
                                                    (selectedItem) => selectedItem.id === item.id,
                                                )
                                            ) {
                                                return null;
                                            }
                                            return this.renderUnSelectedItem(item, index);
                                        },
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    classifyName: {
        fontSize: 16,
        marginTop: 14,
        marginBottom: 8,
        marginLeft: 10,
    },
    classifyView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    },

});

export default connector(CategorySetting);
