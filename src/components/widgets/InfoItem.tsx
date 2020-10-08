import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


interface IProps { }
interface IStates { }

export default class InfoItem extends Component<IProps, IStates> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.container]}>
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
                    width={Dimensions.get("window").width - 40} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
                        borderRadius: 12
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        margin: 20,
        height: 250,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 12,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})