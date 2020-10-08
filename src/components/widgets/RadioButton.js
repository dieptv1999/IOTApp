import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

class RadioButton extends Component {
    render() {
        return (
            <View style={styles.Row}>
                <TouchableOpacity onPress={this.props.callback}>
                    <View style={[{
                        height: this.props.size,
                        width: this.props.size,
                        borderRadius: this.props.size / 2,
                        borderWidth: 2,
                        borderColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, this.props.style]}>
                        {
                            this.props.selected ?
                                <View style={{
                                    height: this.props.size / 2,
                                    width: this.props.size / 2,
                                    borderRadius: this.props.size / 4,
                                    backgroundColor: '#000',
                                }} />
                                : null
                        }
                    </View>
                </TouchableOpacity>
                <Text>{this.props.content}</Text>
            </View>
        );
    }
}

export default RadioButton;

RadioButton.defaultProps = {
    size: 24,
    selected: false,
    content: "",
}

const styles = StyleSheet.create({
    Row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 40,
    },
});