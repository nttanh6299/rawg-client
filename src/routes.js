import { lazy } from 'react';
import { PublicLayout } from './layouts';

const GamesContainer = lazy(() => import('./containers/GamesContainer'));
const NotFound = lazy(() => import('./containers/NotFound'));

export const routes = [
  {
    path: '/',
    exact: true,
    layout: PublicLayout,
    component: GamesContainer
  },
  {
    path: '/games',
    exact: true,
    layout: PublicLayout,
    component: GamesContainer
  },
  {
    path: '*',
    layout: PublicLayout,
    component: NotFound
  }
];
