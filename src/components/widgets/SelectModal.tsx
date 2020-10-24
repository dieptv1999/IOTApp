import React, { Component } from 'react';
import {
	View, Text, Dimensions,
	TouchableOpacity, PickerIOS, Platform
} from 'react-native';
import propTypes from 'prop-types';
import { map } from 'lodash';
import PickerAndroid from './PickerAndroid';
import PickerParameter from './PickerParameter';

// base on ClockModalView
let Picker = Platform.OS === 'ios' ? PickerIOS : PickerParameter;

class SelectModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedValue: 2000,
		}
	}

	renderPickerItems() {
		const items = [{ label: '1', value: 1999 }, { label: '2', value: 2000 }, { label: '2', value: 2000 }, { label: '2', value: 2000 }]
		return map(items, ({ label, value }) => {
			return <Picker.Item label={label} value={value} />
		})
	}

	render() {
		return (
			<View style={{
				backgroundColor: 'white',
				height: 250, borderTopLeftRadius: 10, borderTopRightRadius: 10
			}}>
				<View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
					<View style={{ width: 70, flexDirection: 'row' }}>
						<TouchableOpacity onPress={() => {
							this.props.onCancel()
						}}>
							<Text allowFontScaling={false} style={{
								fontSize: 18, marginLeft: 10, color: 'blue'
							}}>Cancel</Text>
						</TouchableOpacity>
					</View>

					<View style={{ flex: 1, alignItems: 'center' }}>
						<Text allowFontScaling={false} style={{
							fontWeight: 'bold', fontSize: 18
						}}>{`${this.props.title || ''}`}</Text>
					</View>
					<View style={{ width: 70, flexDirection: 'row-reverse' }}>
						<TouchableOpacity onPress={() => {
							this.props.onSave(this.state.selectedValue)
						}}>
							<Text allowFontScaling={false} style={{
								fontSize: 18,
								marginRight: 10, color: 'blue'
							}}>DONE</Text>
						</TouchableOpacity>
					</View>

				</View>
				<View style={{
					flex: 1,
				}}>
					<Picker
						style={{ flex: 1 }}
						selectedValue={this.state.selectedValue}
						onValueChange={(value) => {
							this.setState({ selectedValue: value })
						}}
						mode="dropdown"
					>
						{this.renderPickerItems()}
					</Picker>
				</View>
			</View>
		)
	}
}

SelectModal.propTypes = {
	onCancel: propTypes.func,
	onSave: propTypes.func,//propTypes.object,
	selectedValue: propTypes.string,
	items: propTypes.array,
	title: propTypes.string,
};
export default SelectModal;
