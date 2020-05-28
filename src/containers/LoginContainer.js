import { Login } from '../components';
import { connect } from 'react-redux';
import { login } from '../actions/UserActions';

const mapDispatchToProps = state => {
  return {
    ...state.user,
    login
  };
};

export default connect(mapDispatchToProps)(Login);
