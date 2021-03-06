import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {ErrorMessage, FieldInputProps, FormikProps} from 'formik';
import {Color} from "@/utils/const";
import Icon, {IconNames} from '@/assets/iconfont/index';
import Touchable from "@/components/Touchable";

interface IProps {
    field: FieldInputProps<string>;
    form: FormikProps<string>;
    iconName: IconNames;
    chaCha: (form: FormikProps<string>, field: FieldInputProps<string>) => void;
}

class Input extends React.PureComponent<IProps> {

    chaCha = () => {
        const {form, field, chaCha} = this.props;
        if (typeof chaCha === "function") {
            chaCha(form, field);
        }
    }

    render() {
        const {form, field, iconName, ...rest} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Icon name={iconName} color={Color.night} size={20}/>
                    <TextInput
                        {...field}
                        {...rest}
                        style={styles.input}
                        onChangeText={form.handleChange(field.name)}
                        onBlur={form.handleBlur(field.name)}
                    />
                    <Touchable onPress={this.chaCha}>
                        <Icon name={'icon-chacha'} color={Color.night} size={20}/>
                    </Touchable>
                    <ErrorMessage
                        name={field.name}
                        component={Text}
                        render={
                            msg => {
                                return (
                                    <Text style={styles.error}>{msg}</Text>
                                )
                            }
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 15,
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 25,
        backgroundColor: Color.white,
    },
    input: {
        flex: 1,
        height: 50,
        marginLeft: 15,
    },
    error: {
        position: 'absolute',
        color: Color.red,
        left: 15,
        bottom: 0,
        fontSize: 12,
    },
});

export default Input;
