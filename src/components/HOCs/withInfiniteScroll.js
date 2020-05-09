import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  nextUrl: PropTypes.string,
  games: PropTypes.array,
  fetchGamesNext: PropTypes.func.isRequired
};

const defaultProps = {};

const withInfiniteScroll = (InnerComponent, debounce = 0) => {
  const InfiniteScroll = ({ fetchGamesNext, nextUrl, className, ...props }) => {
    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200
        ) {
          setTimeout(() => fetchGamesNext(nextUrl), debounce);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [fetchGamesNext, nextUrl]);

    return (
      <div className={className}>
        <InnerComponent {...props} />
      </div>
    );
  };

  return InfiniteScroll;
};

withInfiniteScroll.propTypes = propTypes;
withInfiniteScroll.defaultProps = defaultProps;

export default withInfiniteScroll;
