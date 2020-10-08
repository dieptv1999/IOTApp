import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

interface IProps {
    isGroup: boolean,
}
interface IStates { }

export default class FriendItem extends Component<IProps, IStates> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    {this.props.isGroup ?
                        <View style={[styles.avatar, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
                            <Image source={require("../../../assets/rank.jpg")} style={[styles.avatarGroup, { marginBottom: -20, marginRight: -12, zIndex: 2 }]} />
                            <Image source={require("../../../assets/rank.jpg")} style={[styles.avatarGroup, { marginTop: -20, marginLeft: -12, zIndex: 1 }]} />
                        </View>
                        : <View style={styles.avatar}>
                            <Image source={require("../../../assets/rank.jpg")} style={styles.avatarPersonal} />
                        </View>
                    }
                    <View style={styles.info}>
                        <Text style={{ fontSize: 20, fontWeight: '900' }}>Tran Van Diep</Text>
                        <Text>Hey, brother</Text>
                    </View>
                </View>
                <View style={styles.active}>
                    <View style={{ backgroundColor: 'blue', height: 10, width: 10, borderRadius: 5 }}></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    avatar: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPersonal: {
        height: 56,
        width: 56,
        borderRadius: 28,
    },
    avatarGroup: {
        height: 46,
        width: 46,
        borderRadius: 23,
        borderWidth: 3,
        borderColor: 'white',
    },
    info: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    active: {
        width: 30,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})