import React from 'react';
import {
    View,
    Text, Button
} from 'react-native';
import {RootStackNavigation} from "@/navigator/index";


interface IProps  {
    navigation: RootStackNavigation;
}

class Brief extends React.Component<IProps> {

    // constructor(props:any) {
    //     super(props);
    //     props.navigation.setOptions({
    //         headerTransparent: true,
    //         headerTitle: '',
    //     });
    // }
    render() {
        const {navigation} = this.props;
        return (
            <View>
                <Text>Brief</Text>
                <Button title={"hide"} onPress={()=>{
                    navigation.setOptions({
                        headerTransparent: true,
                        headerTitle: '',
                    });
                }} />
                <Button title={"show"} onPress={()=>{
                    navigation.setOptions({
                        headerTransparent: false,
                        headerTitle: 'Brief',
                    });
                }} />
            </View>
        );
    }
}

export default Brief;
