import { UserSettings } from '../components';
import { connect } from 'react-redux';
import { getUser } from '../selectors/CommonSelectors';
import { updateUser, changePassword } from '../actions/UserActions';

const mapStateToProps = state => {
  return {
    ...getUser(state)
  };
};

export default connect(mapStateToProps, { updateUser, changePassword })(
  UserSettings
);
