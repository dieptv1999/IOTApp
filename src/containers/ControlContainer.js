import { connect } from 'react-redux';
import ControlScreen from '../components/ControlScreen';
import { changeStateDevice } from '../actions'

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStateDevice: (json, callback) => {
            dispatch(changeStateDevice(json, callback))
        }
    };
}
const ControlContainer = connect(mapStateToProps, mapDispatchToProps)(ControlScreen);
export default ControlContainer;