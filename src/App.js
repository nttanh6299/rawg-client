import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import { history } from './utils/helpers';
import { routes } from './routes';
import { PublicRoute } from './layouts';
import { initRouter } from './actions/RouterActions';

function App({ initRouter }) {
  useEffect(() => {
    initRouter();
  }, [initRouter]);

  const renderRoutes = routes => {
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
  };

  return (
    <Router history={history}>
      <div className="App">{renderRoutes(routes)}</div>
    </Router>
  );
}

export default connect(undefined, { initRouter })(App);
