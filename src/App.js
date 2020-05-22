import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import { history } from './utils/helpers';
import { routes } from './routes';
import { PublicRoute } from './layouts';
import { initRouter } from './actions/RouterActions';
import { closeFullVideo } from './actions/VideoActions';
import { getVideoId } from './selectors/CommonSelectors';
import HeaderContainer from './containers/HeaderContainer';
import { INDEX_PATH, GAMES_PATH, GAME_PATH } from './constants/urlApi';
import { FullVideo } from './components';

const paths = [INDEX_PATH, GAMES_PATH, GAME_PATH];

function App({ initRouter, closeFullVideo, videoId }) {
  useEffect(() => {
    initRouter(paths);
  }, [initRouter]);

  const renderRoutes = useCallback(routes => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        const { path, exact, layout, component } = route;

        return (
          <PublicRoute
            key={index}
            path={path}
            exact={exact}
            layout={layout}
            component={component}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  }, []);

  return (
    <Router history={history}>
      <div className="App">
        <HeaderContainer />
        {renderRoutes(routes)}
        <FullVideo onClose={closeFullVideo} videoId={videoId} />
      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    videoId: getVideoId(state)
  };
};

export default connect(mapStateToProps, { initRouter, closeFullVideo })(App);
