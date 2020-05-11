import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  nextUrl: PropTypes.string,
  games: PropTypes.array,
  fetchGamesNext: PropTypes.func.isRequired,
  genre: PropTypes.string
};

const defaultProps = {
  className: ''
};

const withInfiniteScroll = (InnerComponent, debounce = 0) => {
  const InfiniteScroll = ({
    fetchGamesNext,
    nextUrl,
    genre,
    className,
    ...props
  }) => {
    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200
        ) {
          setTimeout(() => fetchGamesNext(genre, nextUrl), debounce);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [fetchGamesNext, genre, nextUrl]);

    return (
      <div className={className}>
        <InnerComponent genre={genre} {...props} />
      </div>
    );
  };

  return InfiniteScroll;
};

withInfiniteScroll.propTypes = propTypes;
withInfiniteScroll.defaultProps = defaultProps;

export default withInfiniteScroll;
