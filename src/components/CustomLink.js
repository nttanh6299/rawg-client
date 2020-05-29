import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { preventClick } from '../utils/helpers';
import { compileRoute } from '../utils/RouterUtils';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
  path: PropTypes.string,
  options: PropTypes.object,
  keys: PropTypes.object,
  changeRoute: PropTypes.func.isRequired,
  onClick: PropTypes.func
};

const defaultProps = {
  active: false,
  className: '',
  onClick: () => {},
  path: '',
  keys: {},
  options: {}
};

const CustomLink = ({
  children,
  className,
  active,
  path,
  options,
  keys,
  changeRoute,
  onClick,
  style,
  ...props
}) => {
  const route = { path, keys, options };

  const handleClick = () => {
    onClick();
    changeRoute(route);
  };

  return (
    <Link
      style={{ ...style, textDecoration: 'none' }}
      {...props}
      to={compileRoute(route)}
      onClick={!active ? handleClick : preventClick}
      className={className}
    >
      {children}
    </Link>
  );
};

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default React.memo(CustomLink);
