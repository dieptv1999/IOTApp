import { connect } from 'react-redux';
import ConversationScreen from '../components/ConversationScreen';

const mapStateToProps = (state: any) => {
    return {
        times: state.homeReducers ? state.homeReducers : ""
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
}
const ConversationContainer = connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);
export default ConversationContainer;