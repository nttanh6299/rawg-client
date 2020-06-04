import { UserSettings } from '../components';
import { connect } from 'react-redux';
import { getUser } from '../selectors/CommonSelectors';
import { updateUser } from '../actions/UserActions';

const mapStateToProps = state => {
  return {
    ...getUser(state)
  };
};

export default connect(mapStateToProps, { updateUser })(UserSettings);
