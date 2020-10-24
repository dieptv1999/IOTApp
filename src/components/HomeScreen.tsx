import React, { Component, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, Dimensions, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Octicons';
import { CONTROL, LOGIN, POSITION } from '../containers';
import Animated, { Easing, Extrapolate } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

const {
    Clock,
    Value,
    set,
    cond,
    startClock,
    clockRunning,
    timing,
    debug,
    stopClock,
    block,
    interpolate,
    useCode,
} = Animated;

function runTiming(clock, from, to) {
    const state = {
        finished: new Value(0),
        position: new Value(from),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 100,
        toValue: new Value(to),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(
            clockRunning(clock),
            [],
            startClock(clock),
        ),
        // we run the step here that is going to update position
        timing(clock, state, config),
        // if the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        // we made the block return the updated position
        state.position,
    ]);
}

async function _removeData() {
    try {
        await AsyncStorage.setItem("selected", 'true');
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("pwd");
    } catch (e) {
        console.log("don't remove remember")
    }
};

const HomeScreen = (props) => {
    const { onPress, children } = props;
    const [pressed, setPressed] = useState(false);
    const { clock, scale } = useMemo(() => ({
        clock: new Clock(),
        scale: new Value(1),
    }), [])

    useCode(
        () => block([
            pressed ? set(scale, runTiming(clock, 0, 1)) : set(scale, runTiming(clock, 1, 0))
        ]), [pressed]
    );

    const scaling = interpolate(scale, {
        inputRange: [0, 1],
        outputRange: [1, 0.90],
        extrapolate: Extrapolate.CLAMP
    });


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
                    <Text style={{ fontSize: 50, fontWeight: 'bold' }}>31.9</Text>
                    <Text style={{ color: 'rgba(0,0,0,0.3)' }}>Đống đa, Hà Nội</Text>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{ marginHorizontal: 20 }} >
                    {/* one */}
                    <TouchableWithoutFeedback onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)}>
                        <Animated.View style={[styles.card, { backgroundColor: '#F88A55', transform: [{ scaleX: scaling }, { scaleY: scaling }] }]}>
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
                        </Animated.View>
                    </TouchableWithoutFeedback>
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
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Nhiệt độ</Text>
                <View style={{ marginBottom: 80 }}>
                    <LineChart
                        data={{
                            labels: ["03:10", "03:12", "03:14", "03:16", "03:18", "03:20"],
                            datasets: [
                                {
                                    data: [
                                        32,
                                        32,
                                        32.3,
                                        32.1,
                                        32,
                                        32.5,
                                    ],
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        // yAxisLabel="$"
                        // yAxisSuffix="k"
                        renderDotContent={({ x, y, index }) => {
                            return (
                                <Text style={{ position: 'absolute', top: y - 20, left: x - 8, fontSize: 10 }}>32.1</Text>

                            );
                        }}
                        withInnerLines={false}
                        withOuterLines={false}
                        horizontalLabelRotation={-30}
                        withHorizontalLabels={false}
                        chartConfig={{
                            backgroundColor: "white",
                            backgroundGradientFrom: "white",
                            backgroundGradientTo: "white",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 0.3) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 0.3) => `rgba(0, 0, 0, ${opacity})`,
                            barPercentage: 0.1,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726",

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
                            Navigation.push(props.componentId, {
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
    }
})

export { HomeScreen };