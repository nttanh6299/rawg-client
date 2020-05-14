import React from 'react';
import PropTypes from 'prop-types';
import { history, preventClick, compileOptions } from '../utils/helpers';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  path: PropTypes.string,
  options: PropTypes.object,
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
  changeRoute,
  onClick
}) => {
  console.log('abc');

  const handleClick = () => {
    const compiledOptions = compileOptions(options);
    onClick();
    changeRoute({ path, keys: {}, options });
    history.push(`/${path}?${compiledOptions}`);
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
