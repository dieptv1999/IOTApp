import { connect } from 'react-redux';
import ControlScreen from '../components/ControlScreen';

const mapStateToProps = (state: any) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {

    };
}
const ControlContainer = connect(mapStateToProps, mapDispatchToProps)(ControlScreen);
export default ControlContainer;