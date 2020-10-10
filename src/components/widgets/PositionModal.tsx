import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import Icon from 'react-native-vector-icons/Octicons';


let containerCount = 0;

interface ICellProps {
    active: boolean,
    data: any
}
interface ICellStates { }

class CellContainer extends React.Component<ICellProps, ICellStates> {
    _containerId: number
    constructor(args) {
        super(args);
        this._containerId = containerCount++;
    }
    render() {
        return <View {...this.props} style={stylesCell.container}>
            <Image source={require('../../../assets/tree.jpg')} resizeMode='cover' style={{
                width: '100%', height: 185, borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }} />
            <View style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column', flex: 1 }}>
                <View style={{ padding: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Định Công, Hoàng Mai, Hà Nội</Text>
                    <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)' }}>101.234532 - 1.457213</Text>
                    <Text>Module số :{this.props.data}</Text>
                </View>
                <View style={{ padding: 8, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        name='primitive-dot'
                        size={18}
                        color={this.props.active ? '#00FF00' : 'black'}
                        style={{ padding: 8 }} />
                    <Text style={{ fontSize: 15 }}>Active</Text>
                </View>
            </View>
        </View>;
    }
}

interface IProps {
    componentId: string
}
interface IStates {
    dataProvider: any
}

export default class PositionModal extends Component<IProps, IStates>{
    _layoutProvider: any

    constructor(args) {
        super(args);

        let { width } = Dimensions.get("window");

        //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        this._layoutProvider = new LayoutProvider(
            index => index,
            (type, dim) => {
                dim.width = width;
                dim.height = 320;
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        //Since component should always render once data has changed, make data provider part of the state
        this.state = {
            dataProvider: dataProvider.cloneWithRows(this._generateArray(300))
        };
    }

    _generateArray(n) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = i;
        }
        return arr;
    }

    //Given type and data return the view component
    _rowRenderer(type, data) {
        return (
            <CellContainer active={true} data={data}>
            </CellContainer>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select Module</Text>
                    </View>
                    <View style={{ flex: 1, width: '100%', }}>
                        <RecyclerListView
                            layoutProvider={this._layoutProvider}
                            dataProvider={this.state.dataProvider}
                            rowRenderer={this._rowRenderer}
                            showsVerticalScrollIndicator={false} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    content: {
        height: '90%',
        width: '100%',
        backgroundColor: '#E0ECDE',
        alignSelf: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    title: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listLocation: {

    }
})

const stylesCell = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    }
})