import { connect } from 'react-redux';
import { Header } from '../components';
import { changeRoute } from '../actions/RouterActions';

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { changeRoute })(Header);
