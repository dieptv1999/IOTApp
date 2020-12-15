import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableNativeFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

export default class LightOverlay extends Component {

    constructor(props) {
        super(props)
        this._getContent = this._getContent.bind(this)
        this.state = {
            isClick: false,
        }
    }

    _getContent() {
        switch (this.props.device) {
            case 'LIGHT':
                return (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require("../../../assets/light.png")} style={{ height: 70, width: 70 }} resizeMode='cover' />
                        <Text>Đèn</Text>
                        <Text>Nhiệt độ : 36.66</Text>
                    </View>);
            case 'PUMP':
                return (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require("../../../assets/pump.png")} style={{ height: 60, width: 60 }} resizeMode='cover' />
                        <Text>Máy bơm</Text>
                    </View>);
            case 'FAN':
                return (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require("../../../assets/cooling-fan.png")} style={{ height: 60, width: 60 }} resizeMode='cover' />
                        <Text>Quạt</Text>
                    </View>);
            default:
                break;
        }
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Icon
                        name='closecircleo'
                        size={26}
                        onPress={() => {
                            Navigation.dismissModal(this.props.componentId)
                        }}
                        style={{ alignSelf: 'flex-start', margin: 8 }} />
                    <View style={styles.info}>
                        {this._getContent()}
                    </View>
                    <TouchableNativeFeedback onPress={() => {
                        this.setState({
                            isClick: !this.state.isClick,
                        })
                        this.props.callback({ type: this.props.device, value: this.state.isClick })
                    }}
                        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.1)', true)} >
                        <LinearGradient colors={this.state.isClick ? ['#471dfe', '#4447ff', '#397fff'] : ['gray', 'gray', 'gray']} start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }} style={[styles.power]}>
                            <View style={{
                                height: 114, width: 114, borderRadius: 57,
                                backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Icon
                                    name='poweroff'
                                    size={36}
                                    color={this.state.isClick ? '#471dfe' : 'gray'} />
                            </View>
                        </LinearGradient>
                    </TouchableNativeFeedback>
                    <Image source={require("../../../assets/bottom.png")} resizeMode='cover' style={{ width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050',
    },
    container: {
        height: '80%',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        height: 160,
        width: 160,
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    power: {
        height: 140,
        width: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
    }
})