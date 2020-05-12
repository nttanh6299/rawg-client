import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  gamesNextUrl: PropTypes.string,
  games: PropTypes.array,
  fetchGamesNext: PropTypes.func.isRequired,
  collectionKey: PropTypes.string
};

const defaultProps = {
  className: ''
};

const withInfiniteScroll = (InnerComponent, debounce = 0) => {
  const InfiniteScroll = ({
    fetchGamesNext,
    gamesNextUrl,
    collectionKey,
    className,
    ...props
  }) => {
    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200
        ) {
          setTimeout(
            () => fetchGamesNext(collectionKey, gamesNextUrl),
            debounce
          );
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [fetchGamesNext, collectionKey, gamesNextUrl]);

    return (
      <div className={className}>
        <InnerComponent collectionKey={collectionKey} {...props} />
      </div>
    );
  };

  return InfiniteScroll;
};

withInfiniteScroll.propTypes = propTypes;
withInfiniteScroll.defaultProps = defaultProps;

export default withInfiniteScroll;
