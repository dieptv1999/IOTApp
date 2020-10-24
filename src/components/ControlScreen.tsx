import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, Image, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import { LIGHTCONTROL } from '../containers';
import Icon from 'react-native-vector-icons/AntDesign';


interface ICellProps {
    device: string
}
interface ICellStates { }

class CellContainer extends Component<ICellProps, ICellStates> {
    constructor(args) {
        super(args);
        this._getContent = this._getContent.bind(this)
    }

    _getContent() {
        switch (this.props.device) {
            case 'LIGHT':
                return (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require("../../assets/light.png")} style={{ height: 50, width: 50 }} resizeMode='cover' />
                        <Text>Đèn</Text>
                    </View>);
            case 'PUMP':
                return (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require("../../assets/pump.png")} style={{ height: 40, width: 40 }} resizeMode='cover' />
                        <Text>Máy bơm</Text>
                    </View>);
            case 'FAN':
                return (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require("../../assets/cooling-fan.png")} style={{ height: 40, width: 40 }} resizeMode='cover' />
                        <Text>Quạt</Text>
                    </View>);
            default:
                break;
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Navigation.showModal({
                    stack: {
                        children: [
                            {
                                component: {
                                    name: LIGHTCONTROL,
                                    options: {
                                        screenBackgroundColor: 'transparent',
                                        modalPresentationStyle: 'overCurrentContext',
                                        topBar: {
                                            visible: false,
                                            animate: true,
                                        },
                                    },
                                    passProps: {
                                        device: this.props.device,
                                    }
                                },
                            },
                        ],
                    },
                })
            }}>
                <View style={{
                    height: 100, width: 100,
                    backgroundColor: 'white',
                    margin: 15,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,
                }}>
                    {this._getContent()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

interface IProps {
    componentId: string
}
interface IStates { }

export default class ControlScreen extends Component<IProps, IStates>{
    width: number
    constructor(props: any) {
        super(props)
        this.width = Dimensions.get('window').width;
    }
    render() {
        return (
            <SafeAreaView>
                <LinearGradient colors={['#471dfe', '#4447ff', '#397fff']} start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }} style={[styles.background, { zIndex: -1, elevation: -1, }]}>
                </LinearGradient>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={{ padding: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Icon
                                    onPress={() => {
                                        Navigation.pop(this.props.componentId);
                                    }}
                                    name='left'
                                    size={26}
                                    color='white'
                                    style={{ paddingRight: 8 }} />
                                <Text style={{ color: 'white', fontSize: 23 }}>Chào buổi sáng</Text>
                            </View>
                            <Text style={{ color: 'white', fontSize: 18 }}>Loại thiết bị</Text>
                            <Text style={{ color: 'white' }}>5 loại thiết bị</Text>
                        </View>
                        <View style={{ height: 130, width: '100%', zIndex: 1, elevation: 1 }}>
                            <ScrollView style={{ height: 130, width: '100%' }} showsHorizontalScrollIndicator={false} horizontal={true}>
                                {/* one */}
                                <CellContainer device='LIGHT' />
                                {/* two */}
                                <CellContainer device='PUMP' />
                                {/* three */}
                                <CellContainer device='FAN' />
                                {/* four */}
                                <View style={{
                                    height: 100, width: 100,
                                    backgroundColor: 'white',
                                    margin: 15,
                                    borderRadius: 10,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.32,
                                    shadowRadius: 5.46,

                                    elevation: 9,
                                }}></View>
                            </ScrollView>
                        </View>
                        <View style={styles.devicActive}>
                            <Text style={{
                                marginHorizontal: 15,
                                fontSize: 17,
                                fontWeight: 'bold',
                            }}>Thiết bị đang hoạt động</Text>
                            <Text style={{ color: 'rgba(0,0,0,0.4)', marginHorizontal: 15, }}>3 thiết bị</Text>
                            <ScrollView >
                                {/* one */}
                                <CellContainer device='LIGHT' />
                            </ScrollView>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    background: {
        height: 170,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'blue',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    content: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    devicActive: {

    }
})