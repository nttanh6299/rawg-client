import { UserSettings } from '../components';
import { connect } from 'react-redux';
import { getUser } from '../selectors/CommonSelectors';

const mapStateToProps = state => {
  return {
    ...getUser(state)
  };
};

export default connect(mapStateToProps)(UserSettings);
