import React from 'react';
import {Text, ScrollView, TextInput, View, StyleSheet, Button} from 'react-native';
import {Formik, Field, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import Input from "@/components/Input";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";

const customerValidation = Yup.object().shape({
    account: Yup.string().required('请输入账号'),
    password: Yup.string().required('请输入密码'),
});

interface Values {
    account: string;
    password: string;
}

const initialValues: Values = {
    account: '',
    password: '',
}

const mapStateToProps = ({passport, loading}: RootState) => {
    return {
        loading: loading.effects['passport/login'],
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

class Login extends React.Component<IProps> {

    onSubmit = (values: Values, actions: FormikHelpers<Values>) => {

        const {dispatch, navigation} = this.props;
        dispatch({
            type: 'user/login',
            payload: values,
            // callback: () => {
            //     actions.setSubmitting(false);
            //     navigation.goBack();
            // },
        });
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={this.onSubmit}
                    validationSchema={customerValidation}>
                    {({handleSubmit}) => (
                        <View>
                            <Field
                                name="account"
                                placeholder="请输入用户名"
                                component={Input}
                                iconName={'icon-account'}
                            />
                            <Field
                                name="password"
                                placeholder="请输入密码"
                                component={Input}
                                iconName={'icon-mima'}
                                secureTextEntry
                            />
                            <View style={styles.jumpView}>
                                <Text style={styles.jumpTitle}>忘记密码?</Text>
                                <Text style={styles.jumpTitle}>注册账号</Text>
                            </View>
                            <Touchable onPress={handleSubmit} style={styles.login}>
                                <Text style={styles.loginText}>登录</Text>
                            </Touchable>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 200,
        paddingHorizontal: 15,
    },
    jumpView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingBottom: 15,
    },
    jumpTitle: {
        color: Color.dark_title
    },
    login: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        backgroundColor: Color.theme,
        marginHorizontal: 20,
    },
    loginText: {
        fontSize: 18,
        fontWeight: "bold",
        color: Color.white,
        textAlign: 'center',
        lineHeight: 50,
    }
});

export default connector(Login);