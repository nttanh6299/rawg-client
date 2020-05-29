import { connect } from 'react-redux';
import { Header } from '../components';
import { changeRoute } from '../actions/RouterActions';
import { logOut } from '../actions/UserActions';
import { getUser } from '../selectors/CommonSelectors';

const mapStateToProps = state => {
  return {
    ...getUser(state),
    logOut
  };
};

export default connect(mapStateToProps, { changeRoute })(Header);
