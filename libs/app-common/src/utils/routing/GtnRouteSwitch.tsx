import React from 'react';
import { Route as ReactRoute } from 'react-router';
import { Switch } from 'react-router-dom';
import { GtnRoute } from './GtnRoute';

const PublicRoute = ReactRoute;
const PrivateRoute = (props: any) => <ReactRoute {...props} />;

export interface GtnRouteSwitchProps {
  routes: GtnRoute[];
  render(route: GtnRoute): React.ReactNode;
}

export const GtnRouteSwitch = (props: GtnRouteSwitchProps) => (
  <Switch>
    {props.routes.map((route, index) => {
      const Route =
        route.requireLogin || route.requireLogin === undefined
          ? PrivateRoute
          : PublicRoute;
      if (!route.blocked) {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={() => props.render(route)}
          />
        );
      }
      return <></>;
    })}
  </Switch>
);
