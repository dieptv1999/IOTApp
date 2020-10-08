import { connect } from 'react-redux';
import { uploadFile } from '../actions';
import HomeScreen from '../components/HomeScreen';

const mapStateToProps = (state: any) => {
    return {
        times: state.homeReducers ? state.homeReducers : ""
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        uploadFile: (uri: string, type: string, name: string, size: number, callback: any) => {
            dispatch(uploadFile(uri, type, name, size, callback))
        }
    };
}
const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default HomeContainer;