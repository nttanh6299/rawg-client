import { Signup } from '../components';
import { connect } from 'react-redux';
import { signUp } from '../actions/UserActions';

const mapDispatchToProps = state => {
  return {
    ...state.user,
    signUp
  };
};

export default connect(mapDispatchToProps)(Signup);
