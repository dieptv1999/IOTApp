import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { HOME } from '../containers';
import LoginCart from './widgets/LoginCart';
import RadioButton from './widgets/RadioButton';
import AsyncStorage from '@react-native-community/async-storage';


interface IProps {
    onLogin: (username: string, password: string, callback: any) => void,
    loginData: string,
    componentId: any,
}

interface IState {
    selected?: boolean,
    loading?: boolean,
    email: string,
    password: string,
}

class Login extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this._storeData = this._storeData.bind(this)
        this.state = {
            selected: true,
            loading: false,
            email: "",
            password: "",
        };
    }


    changeSelectRememberMe = () => {
        this.setState({
            selected: !this.state.selected,
        });
    };

    async _storeData(email: string, pwd: string, selected: string) {
        console.log(selected + "selected")
        try {
            await AsyncStorage.setItem("selected", selected);
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("pwd", pwd);
        } catch (error) {
            console.log("error auto remember")
        }
    };

    async _removeData(selected: string) {
        console.log(selected + "remove")
        try {
            await AsyncStorage.setItem("selected", selected);
            await AsyncStorage.removeItem("email");
            await AsyncStorage.removeItem("pwd");
        } catch (e) {
            console.log("don't remove remember")
        }
    }

    render() {
        if (!this.state.loading) {
            if (this.props.loginData != null) {
                console.log(this.state.selected, "render")
                if (this.state.selected) this._storeData(this.state.email, this.state.password, JSON.stringify(this.state.selected));
                else this._removeData(JSON.stringify(this.state.selected))
                Navigation.push(this.props.componentId, {
                    component: {
                        name: HOME,
                        options: {
                            topBar: {
                                visible: false,
                            },
                            statusBar: {
                                visible: true,
                                style: 'dark',
                                backgroundColor: 'white'
                            },
                        },
                    }
                })
            }
            return (
                <ImageBackground source={require("../../assets/image_01.png")} style={{ width: '100%', height: '100%' }}
                    imageStyle={styles.imageBackground}>
                    <View style={styles.Column}>
                        <View style={styles.logo}>
                            <Image source={require("../../assets/logo.png")} resizeMode='stretch' />
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Lazyy</Text>
                        </View>
                        <LoginCart callback={(email: string, password: string) => {
                            this.setState({
                                email: email,
                                password: password,
                            })
                        }}
                            setSelected={(val: boolean) => {
                                this.setState({
                                    selected: val
                                })
                            }} />
                        <View style={styles.buttonLogin}>
                            <RadioButton selected={this.state.selected} size={20} content={" Remember me"} callback={this.changeSelectRememberMe.bind(this)} />
                            <View style={styles.buttonLoginDetail}>
                                <Button title="Login" onPress={() => {
                                    this.setState({
                                        loading: true
                                    });
                                    this.props.onLogin(this.state.email, this.state.password,
                                        () => {
                                            console.log("callback")
                                            this.setState({ loading: false })
                                        }
                                    )
                                }}></Button>
                            </View>
                        </View>
                        <View style={styles.buttonRegister}>
                            <Text >Bạn chưa đăng kí? </Text>
                            <Text style={{ color: 'blue' }}>Đăng kí</Text>
                        </View>
                        <Text>{this.props.times}</Text>
                    </View>
                    {/* <View style={styles.background}>
                        <Image source={require("../../assets/image_01.png")} resizeMode='stretch' style={styles.imageBackground} />
                    </View> */}
                </ImageBackground >
            );
        } else
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
    }
}

export default Login

Login.defaultProps = {
    loginData: null
}

const styles = StyleSheet.create({
    imageBackground: {
        position: 'relative',
        right: 0,
        height: 250,
        paddingLeft: 100,
        resizeMode: 'contain'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    boxShadow: {
        width: 200,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#ed7171',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#ffffff',
    },
    Column: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        zIndex: 1,
        elevation: 1,
        position: 'absolute',
        paddingLeft: 28,
        paddingRight: 28,
    },
    Row: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        height: 700
    },
    logo: {
        width: '100%',
        height: 110,
        paddingTop: 60,
        paddingBottom: 110,
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: 'grey'
    },
    buttonLogin: {
        width: '100%',
        height: 70,
        paddingTop: 20,
        alignContent: 'center',
        //flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        //backgroundColor: 'black'
    },
    buttonRegister: {
        width: '100%',
        height: 100,
        paddingTop: 10,
        //backgroundColor: 'pink',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    buttonLoginDetail: {
        width: 150,
        height: 100,
    }
});