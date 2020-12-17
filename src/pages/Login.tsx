import React from 'react';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import {Formik, Field, FieldInputProps, FormikProps} from 'formik';
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

const mapStateToProps = ({loading}: RootState) => {
    return {
        loading: loading.effects['user/login'],
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

interface IState {
    disabled: boolean;
    loginPage: boolean;
}

class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            disabled: false,
            loginPage: true,
        }
    }

    onSubmit = (values: Values) => {
        const {dispatch, navigation, loading} = this.props;
        const {disabled,loginPage} = this.state;

        if (disabled || loading) {
            return;
        }

        this.setState({
            disabled: true
        })

        if(loginPage){
            dispatch({
                type: 'user/login',
                payload: values,
                callback: (isGoBack: boolean) => {
                    isGoBack ? navigation.goBack()
                        : setTimeout(() => {
                            this.setState({
                                disabled: false
                            })
                        }, 2000);
                },
            });
        }else{
            dispatch({
                type: 'user/register',
                payload: values,
                callback: (isGoBack: boolean) => {
                    isGoBack ? navigation.goBack()
                        : setTimeout(() => {
                            this.setState({
                                disabled: false
                            })
                        }, 2000);
                },
            });
        }

    }

    chaCha = (form: FormikProps<string>, field: FieldInputProps<string>) => {
        if (field.name === 'account') {
            form.setFieldValue('account', '');
        } else if (field.name === 'password') {
            form.setFieldValue('password', '');
        }
    }

    onChange = () => {
        const {navigation} = this.props;
        const {loginPage} = this.state;
        if(loginPage){
            navigation.setOptions({
                'headerTitle': '注册'
            })
        }else{
            navigation.setOptions({
                'headerTitle': '登录'
            })
        }
        this.setState({
            loginPage: !loginPage
        })



    }

    render() {
        const {disabled, loginPage} = this.state;
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
                                <Touchable onPress={this.onChange}>
                                    <Text style={styles.jumpTitle}>{loginPage ? '注册账号' : '立即登录'}</Text>
                                </Touchable>
                            </View>
                            <Touchable disabled={disabled} onPress={handleSubmit} style={styles.login}>
                                <Text style={styles.loginText}>{loginPage ? '登录' : '注册'}</Text>
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
