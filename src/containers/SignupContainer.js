import { Signup } from '../components';
import { connect } from 'react-redux';
import { signUp } from '../actions/UserActions';
import { getUser } from '../selectors/CommonSelectors';

const mapDispatchToProps = state => {
  return {
    ...getUser(state)
  };
};

export default connect(mapDispatchToProps, { signUp })(Signup);
