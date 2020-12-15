import React, { Component, useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, Dimensions, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Octicons';
import { CONTROL, LOGIN, POSITION } from '../containers';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import IconF from 'react-native-vector-icons/FontAwesome5'
import IconI from 'react-native-vector-icons/Ionicons'
import io from "socket.io-client";

async function _removeData() {
    try {
        await AsyncStorage.setItem("selected", 'true');
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("pwd");
    } catch (e) {
        console.log("don't remove remember")
    }
};

export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pressed: false,
            chatMessage: '',
            chatMessages: [],
            only: 1,
            data: null,
        }
    }



    _connectService = async () => {
        console.log(this.props.accessToken)
        this.setState({
            only: 0
        })
        if (this.state.only == 1) {
            this.socket = io("http://192.168.1.8:5000");
            // console.log(socket.id)
            this.socket.emit('topic', { message: 'Farm', token: this.props.accessToken });
            this.socket.on("Farmdata", msg => {
                // setChatMessages([...chatMessages, msg])
                console.log(msg, "message")
                this.setState({
                    data: msg
                })
            });
        }
    }


    componentDidMount() {
        this._connectService()
    }

    submitChatMessage = () => {
        this.socket.emit('message', this.state.chatMessage);
        this.setState({ chatMessage: '' });
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Theo dõi thông số</Text>
                    </View>
                    <View style={styles.info}>
                        {/* <Icon
                    name='cloud'
                    size={70}
                /> */}
                        <Image source={require('../../assets/sun.png')} style={{ height: 80, width: 80 }} resizeMode='contain' />
                        <Text style={{ fontSize: 50, fontWeight: 'bold' }}>{this.state.data != null ? this.state.data.temp : '0'}</Text>
                        <Text style={{ color: 'rgba(0,0,0,0.3)' }}>Đống đa, Hà Nội</Text>
                    </View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{ marginHorizontal: 20 }} >
                        {/* one */}
                        <View style={[styles.card, { backgroundColor: '#F88A55' }]}>
                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                width: '100%',
                                height: '100%',
                            }}>
                                <IconF
                                    name='temperature-low'
                                    color='white'
                                    size={40}
                                    style={{ marginRight: -10 }}
                                />
                                <Text style={styles.textData}>{this.state.data != null ? this.state.data.temp : '0'}</Text>
                            </View>
                            <View style={{
                                backgroundColor: '#E36D79',
                                height: '50%',
                                width: '100%',
                                marginLeft: -94,
                                borderTopLeftRadius: 50,
                                borderBottomStartRadius: 15,
                                borderBottomEndRadius: 15,
                            }}>
                            </View>
                        </View>
                        {/* two */}
                        <View style={[styles.card, { backgroundColor: '#B56290' }]}>
                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                width: '100%',
                                height: '100%',
                            }}>
                                <IconI
                                    name='water-sharp'
                                    color='white'
                                    size={40} />
                                <Text style={styles.textData}>{this.state.data != null ? this.state.data.waterTemp : '0'}</Text>
                            </View>
                            <View style={{
                                backgroundColor: '#7B5D8F',
                                height: '50%',
                                width: '100%',
                                marginLeft: -94,
                                borderBottomStartRadius: 15,
                                borderBottomEndRadius: 15,
                            }}>
                            </View>
                        </View>
                        {/* three */}
                        <View style={[styles.card, { backgroundColor: '#2E4857', alignItems: 'flex-start' }]}>
                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                width: '100%',
                                height: '100%',
                                elevation: 100,
                            }}>
                                <IconF
                                    name='cloud-sun'
                                    color='white'
                                    size={40} />
                                <Text style={styles.textData}>{this.state.data != null ? this.state.data.light : '0'}</Text>
                            </View>
                            <View style={{
                                backgroundColor: '#475579',
                                height: '50%',
                                width: '100%',
                                marginLeft: -94,
                                borderTopStartRadius: 15,
                                borderTopEndRadius: 15,
                            }}>
                            </View>
                        </View>
                        {/* four */}
                        <View style={[styles.card, { backgroundColor: '#2E4857', alignItems: 'flex-start' }]}>
                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                width: '100%',
                                height: '100%',
                                elevation: 100,
                            }}>
                                <Text style={{color: 'white', fontSize: 26}}>PH</Text>
                                <Text style={styles.textData}>{this.state.data != null ? this.state.data.ph : '0'}</Text>
                            </View>
                            <View style={{
                                backgroundColor: '#475579',
                                height: '50%',
                                width: '100%',
                                marginLeft: -94,
                                borderTopStartRadius: 15,
                                borderTopEndRadius: 15,
                            }}>
                            </View>
                        </View>
                        {/* five */}
                        <View style={[styles.card, { backgroundColor: '#2E4857', alignItems: 'flex-start' }]}>
                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                width: '100%',
                                height: '100%',
                                elevation: 100,
                            }}>
                                <Text style={{color: 'white', fontSize: 26}}>EC</Text>
                                <Text style={styles.textData}>{this.state.data != null ? this.state.data.ec : '0'}</Text>
                            </View>
                            <View style={{
                                backgroundColor: '#475579',
                                height: '50%',
                                width: '100%',
                                marginLeft: -94,
                                borderBottomRightRadius: 50,
                                borderTopStartRadius: 15,
                                borderTopEndRadius: 15,
                            }}>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.bottomBar}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5, height: '100%', marginLeft: 15 }}>
                            <Icon
                                name='home'
                                size={26}
                                color='rgba(0,0,0,0.5)'
                                style={{ padding: 6 }} />
                            <Text style={{ fontSize: 15, color: 'rgba(0,0,0,0.5)', fontWeight: 'bold' }}>Home</Text>
                        </View>
                        <View style={{ height: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 15, padding: 5 }}>
                            <TouchableNativeFeedback onPress={() => {
                                Navigation.showModal({
                                    stack: {
                                        children: [
                                            {
                                                component: {
                                                    name: POSITION,
                                                    options: {
                                                        screenBackgroundColor: 'transparent',
                                                        modalPresentationStyle: 'overCurrentContext',
                                                        topBar: {
                                                            visible: false,
                                                            animate: true,
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                })
                            }}>
                                <Icon
                                    name='location'
                                    size={26}
                                    color='rgba(0,0,0,0.5)'
                                    style={{ paddingHorizontal: 10 }} />
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback onPress={() => {
                                Navigation.push(this.props.componentId, {
                                    component: {
                                        name: CONTROL,
                                        options: {
                                            topBar: {
                                                visible: false,
                                            },
                                            statusBar: {
                                                backgroundColor: '#397fff',
                                                style: 'dark',
                                            }
                                        }
                                    }
                                })
                            }}>
                                <Icon
                                    name='dashboard'
                                    size={26}
                                    color='rgba(0,0,0,0.5)'
                                    style={{ paddingHorizontal: 10 }} />
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback onPress={() => {
                                _removeData();
                                RNRestart.Restart();
                            }}>
                                <Icon
                                    name='sign-out'
                                    size={26}
                                    color='rgba(0,0,0,0.5)'
                                    style={{ paddingHorizontal: 10 }} />
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </SafeAreaView >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        position: 'absolute',
        elevation: 20,
        zIndex: 10,
        top: 10,
    },
    card: {
        height: 180,
        width: 94,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 15,
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
    },
    info: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
    textData: {
        fontSize: 26,
        fontFamily: 'Roboto',
        elevation: 100,
        color: 'white'
    }
})

export { HomeScreen };