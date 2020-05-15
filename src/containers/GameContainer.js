import { connect } from 'react-redux';
import { Game } from '../components';

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {})(Game);
