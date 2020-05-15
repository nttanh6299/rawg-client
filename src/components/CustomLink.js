import React from 'react';
import PropTypes from 'prop-types';
import { history, preventClick } from '../utils/helpers';
import { compileRoute } from '../utils/RouterUtils';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  path: PropTypes.string,
  options: PropTypes.object,
  keys: PropTypes.object,
  changeRoute: PropTypes.func.isRequired,
  onClick: PropTypes.func
};

const defaultProps = {
  className: '',
  onClick: () => {}
};

const CustomLink = ({
  children,
  className,
  active,
  path,
  options,
  keys,
  changeRoute,
  onClick
}) => {
  const handleClick = () => {
    const route = { path, keys, options };
    onClick();
    changeRoute(route);
    history.push(compileRoute(route));
  };

  const compileClassName = `${className} ${active ? 'link--active' : ''}`;

  return (
    <span
      onClick={!active ? handleClick : preventClick}
      className={`link${compileClassName}`}
    >
      {children}
    </span>
  );
};

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default React.memo(CustomLink);
