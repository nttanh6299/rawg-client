import { connect } from 'react-redux';
import { Header } from '../components';
import { changeRoute } from '../actions/RouterActions';
import { logOut } from '../actions/UserActions';

const mapStateToProps = state => {
  return {
    ...state.user,
    logOut
  };
};

export default connect(mapStateToProps, { changeRoute })(Header);
