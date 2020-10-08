import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Image } from 'react-native';

interface IProps {
    avatar: string,
    content: string[],
    itsMe: boolean,
}

interface IStates { }

export default class Message extends Component<IProps, IStates> {
    idx: number
    constructor(props: any) {
        super(props)
        this._renderMessage = this._renderMessage.bind(this)
        this.idx = 0
    }

    _renderMessage() {
        return this.props.content.map((item) => {
            return (
                <TouchableWithoutFeedback key={this.idx++}>
                    <View style={{
                        backgroundColor: this.props.itsMe ? '#1CA7EC' : 'rgba(0,0,0,0.05)',
                        padding: 8,
                        borderRadius: 15,
                        margin: 1,
                    }}>
                        <Text style={{ color: this.props.itsMe ? 'white' : 'black', fontSize: 16 }}>{item}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        });
    }

    render() {
        if (this.props.itsMe) {
            return (
                <View style={[styles.container]}>
                    <View style={{ maxWidth: '75%', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        {this._renderMessage()}
                    </View>
                </View>
            );
        } else {

            return (
                <View style={[styles.container, { flexDirection: 'row' }]}>
                    <Image source={require("../../../assets/rank.jpg")} style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        alignSelf: 'flex-end',
                        marginRight: 10,
                    }} />
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        maxWidth: '75%',
                    }}>
                        <Text style={{
                            color: 'rgba(0,0,0,0.3)',
                            fontSize: 11,
                        }}>Trần Văn</Text>
                        {this._renderMessage()}
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 10,
    }
})