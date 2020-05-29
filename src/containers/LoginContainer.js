import { Login } from '../components';
import { connect } from 'react-redux';
import { login } from '../actions/UserActions';
import { getUser } from '../selectors/CommonSelectors';

const mapStateToProps = state => {
  return {
    ...getUser(state),
    login
  };
};

export default connect(mapStateToProps)(Login);
