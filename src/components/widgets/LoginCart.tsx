import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


interface IProps {
    callback: (email: string, password: string) => void,
    setSelected: (val: boolean) => void,
}

interface IState {
    email: string,
    password: string,
}

class LoginCart extends Component<IProps, IState> {

    constructor(props: any) {
        super(props)

        this._retrieveData = this._retrieveData.bind(this)
        this.state = {
            email: "",
            password: "",
        }
    }

    _retrieveData = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const pwd = await AsyncStorage.getItem('pwd');
            const selected = await AsyncStorage.getItem('selected');
            if (selected != null) {
                console.log(selected)
                this.props.setSelected(selected === "true")
                if (email !== null && pwd != null && selected === "true") {
                    this.setState({
                        email: email,
                        password: pwd
                    })
                    this.props.callback(email, pwd)
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    componentDidMount() {
        this._retrieveData()
    }

    render() {
        return (
            <View style={styles.loginCart}>
                <Text h4 style={{ paddingBottom: 20, paddingLeft: 8 }}>Login</Text>
                <Input
                    placeholder="Email"
                    style={{ padding: 0, margin: 0 }}
                    label="Email"
                    labelStyle={{ fontSize: 12 }}
                    onChangeText={(email) => {
                        this.setState({
                            email: email,
                        })
                        this.props.callback(email, this.state.password)
                    }}
                    value={this.state.email}
                />
                <Input
                    placeholder="Password"
                    style={{ padding: 0, margin: 0 }}
                    label="Password"
                    labelStyle={{ fontSize: 12 }}
                    secureTextEntry={true}
                    onChangeText={(password) => {
                        this.setState({
                            password: password,
                        })
                        this.props.callback(this.state.email, password)
                    }}
                    value={this.state.password}
                />
            </View>
        );
    }
}

export default LoginCart

const styles = StyleSheet.create({
    loginCart: {
        //height: 300,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    },
});