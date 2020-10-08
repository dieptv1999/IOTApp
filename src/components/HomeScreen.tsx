import ViewPager from '@react-native-community/viewpager';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import InfoItem from './widgets/InfoItem';


interface IProps {
    componentId: any,
}

interface IStates {
}
export default class HomeScreen extends Component<IProps, IStates>{
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Theo dõi thông số</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon
                            name='cloud'
                            size={70}
                        />
                        <Text style={{ fontSize: 50, fontWeight: 'bold' }}>31.9</Text>
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
                            }}>

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
                            }}>

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
                    <ViewPager style={{ height: 200, width: 200 }} initialPage={0}>
                        <View key="1">
                            <Text>First page</Text>
                        </View>
                        <View key="2">
                            <Text>Second page</Text>
                        </View>
                    </ViewPager>
                    <View style={{ marginBottom: 80 }}>
                        <LineChart
                            data={{
                                labels: ["January", "February", "March", "April", "May", "June"],
                                datasets: [
                                    {
                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100
                                        ]
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                    <View style={styles.bottomBar}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5, height: '100%', marginLeft: 15 }}>
                            <Icon
                                name='home'
                                size={26}
                                color='rgba(0,0,0,0.5)'
                                style={{ padding: 4 }} />
                            <Text style={{ fontSize: 15, color: 'rgba(0,0,0,0.5)', fontWeight: 'bold' }}>Home</Text>
                        </View>
                        <View style={{ height: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 15, padding: 5 }}>
                            <Icon
                                name='setting'
                                size={26}
                                color='rgba(0,0,0,0.5)'
                                style={{ padding: 4 }} />
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
    }
})