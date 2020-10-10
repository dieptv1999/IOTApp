import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


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
                        <Image source={require("../../assets/light.jpg")} style={{ height: 50, width: 50 }} resizeMode='cover' />
                    </View>);
            default:
                break;
        }
    }

    render() {
        return (
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
        );
    }
}

interface IProps { }
interface IStates { }

export default class ControlScreen extends Component<IProps, IStates>{
    width: number
    constructor(props: any) {
        super(props)
        this.width = Dimensions.get('window').width;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{ padding: 15 }}>
                        <Text style={{ color: 'white', fontSize: 23 }}>Chào buổi sáng</Text>
                        <Text style={{ color: 'white', fontSize: 18 }}>Loại thiết bị</Text>
                        <Text style={{ color: 'white' }}>5 loại thiết bị</Text>
                    </View>
                    <View style={{ height: 130, width: '100%' }}>
                        <ScrollView style={{ height: 130, width: '100%' }} showsHorizontalScrollIndicator={false} horizontal={true}>
                            {/* one */}
                            <CellContainer device='LIGHT' />
                            {/* two */}
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

                            </View>
                            {/* three */}
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

                            </View>
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
                </View>
                <LinearGradient colors={['#471dfe', '#4447ff', '#397fff']} start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }} style={[styles.background, { marginLeft: -Dimensions.get("window").width, elevation: -1, zIndex: -1 }]}>
                </LinearGradient>
            </View>
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
        // borderBottomEndRadius: 100,
        // borderBottomStartRadius: 100,
        // transform: [{ scaleX: 3 }],
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