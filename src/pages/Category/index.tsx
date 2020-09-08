import React from 'react';
import {
    View,
    Text, Button
} from 'react-native';


class Category extends React.Component {
    render() {
        return (
            <View>
                <Text>Category</Text>
                <Button title={"hide"} onPress={()=>{}} />
            </View>
        );
    }
}

export default Category;
