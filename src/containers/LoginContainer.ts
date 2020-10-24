import { connect } from 'react-redux';

//Actions
import { loginAction } from '../actions';
import Login from '../components/Login';

const mapStateToProps = (state: any) => {
    return {
        loginData: state.loginReducers ? state.loginReducers : null,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogin: (email: string, password: string, callback: any) => {
            dispatch(loginAction(email, password, callback));
        }
    };
}
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;