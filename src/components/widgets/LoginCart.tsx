import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Input } from 'react-native-elements';


interface IProps {
    callback: (email: string, password: string) => void,
}

interface IState {
    email: string,
    password: string,
}

class LoginCart extends Component<IProps, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }
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
                />
                <Input
                    placeholder="Password"
                    style={{ padding: 0, margin: 0 }}
                    label="Password"
                    labelStyle={{ fontSize: 12 }}
                    onChangeText={(password) => {
                        this.setState({
                            password: password,
                        })
                        this.props.callback(this.state.email, password)
                    }}
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