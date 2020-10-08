import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import ConversationBottomBar from './widgets/ConversationBottomBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Navigation } from 'react-native-navigation';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import Message from './widgets/Message';

interface IProps {
    isGroup: boolean,
    componentId: any,
}
interface IStates {
    dataProvider: any,
}


export default class ConversationScreen extends Component<IProps, IStates> {
    _layoutProvider: any
    _dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    });
    constructor(props: any) {
        super(props)
        let { width } = Dimensions.get("window");

        this._rowRenderer = this._rowRenderer.bind(this)
        this._layoutProvider = new LayoutProvider(
            index => {
                return 0
            },
            (type, dim) => {
                switch (type) {
                    default:
                        dim.width = width;
                        dim.height = 0;
                }
            }
        );
        this.state = {
            dataProvider: this._dataProvider.cloneWithRows([true, false, true, true, false, true, true, false, true, true, false, true])
        }
    }

    _rowRenderer(type: any, data: any) {
        //You can return any view here, CellContainer has no special significance
        switch (type) {
            default:
                return (
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ width: '100%' }}>
                            <Message avatar='"../../assets/ranks' itsMe={data} content={["Since the functionality is already present I'll be closing this.", "b", "Since the functionality is already present I'll be closing this.", "b"]} />
                        </View>
                    </TouchableWithoutFeedback>
                );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableWithoutFeedback onPress={() => {
                        Navigation.pop(this.props.componentId);
                    }}>
                        <View>
                            <Icon
                                name='chevron-left'
                                size={26}
                                color='#1CA7EC'
                                style={{ paddingHorizontal: 15 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flex: 1,
                        paddingRight: 60,
                    }}>
                        {this.props.isGroup ?
                            <View style={[styles.avatar, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
                                <Image source={require("../../assets/rank.jpg")} style={[styles.avatarGroup, { marginBottom: -15, marginRight: -10, zIndex: 2 }]} />
                                <Image source={require("../../assets/rank.jpg")} style={[styles.avatarGroup, { marginTop: -15, marginLeft: -10, zIndex: 1 }]} />
                                <View style={{
                                    height: 8,
                                    width: 8,
                                    borderRadius: 4,
                                    backgroundColor: '#00FF3F',
                                    alignSelf: 'flex-end',
                                    marginBottom: 10,
                                    marginLeft: -8
                                }} />
                            </View>
                            : <View style={styles.avatar}>
                                <Image source={require("../../assets/rank.jpg")} style={styles.avatarPersonal} />
                            </View>
                        }
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 17, fontWeight: '900' }}>Công ty công nghệ Sonek</Text>
                    </View>
                    <View style={styles.actionMore}>
                        <Icon
                            name='video'
                            size={24}
                            color='#1CA7EC'
                            style={{ padding: 8 }}
                        />
                        <Icon
                            name='info-circle'
                            size={24}
                            color='#1CA7EC'
                            style={{ padding: 8 }}
                        />
                    </View>
                </View>
                <View style={styles.conversation}>
                    <RecyclerListView
                        layoutProvider={this._layoutProvider}
                        rowRenderer={this._rowRenderer}
                        dataProvider={this.state.dataProvider}
                        showsVerticalScrollIndicator={false}
                        forceNonDeterministicRendering={true} />
                </View>
                <ConversationBottomBar />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    conversation: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        paddingBottom: 60,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    avatar: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPersonal: {
        height: 46,
        width: 46,
        borderRadius: 23,
    },
    avatarGroup: {
        height: 34,
        width: 34,
        borderRadius: 17,
        borderWidth: 3,
        borderColor: 'white',
    },
    actionMore: {
        height: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingRight: 8,
    }
})