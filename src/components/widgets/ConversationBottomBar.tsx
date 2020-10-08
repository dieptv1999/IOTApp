import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class ConversationBottomBar extends Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name='grid'
                    size={26}
                    color='#1CA7EC'
                    style={styles.icon} />
                <Icon
                    name='camera'
                    size={26}
                    color='#1CA7EC'
                    style={styles.icon} />
                <Icon
                    name='images'
                    size={26}
                    color='#1CA7EC'
                    style={styles.icon} />
                <View style={styles.search}>
                    <TextInput
                        multiline={true}
                        style={{
                            width: '100%',
                            fontSize: 18,
                            marginBottom: -4,
                            paddingLeft: 12,
                            paddingRight: 28,
                        }}
                        placeholder="Aa" />
                    <Icon
                        name='emoji-happy'
                        style={{
                            width: 28,
                            fontSize: 24,
                            marginLeft: -28,
                            color: '#1CA7EC'
                        }} />
                </View>
                <Icon
                    name='heart'
                    size={26}
                    color='#1CA7EC'
                    style={styles.icon} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 54,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
    },
    icon: {
        marginHorizontal: 5,
    },
    search: {
        margin: 3,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.07)',
        borderRadius: 20,
    },
})