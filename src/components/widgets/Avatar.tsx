import React, { Component } from 'react';
import { TouchableWithoutFeedbackComponent, Image, View } from 'react-native';

export default class Avatar extends Component {

    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <View style={{ height: 34, width: 34, borderRadius: 17 }}>
                <Image source={require('../../../assets/rank.jpg')} style={{ height: 46, width: 46, borderRadius: 23 }} />
            </View>
        );
    }
}