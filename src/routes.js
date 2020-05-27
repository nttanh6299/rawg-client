import { lazy } from 'react';
import { PublicLayout } from './layouts';
import { INDEX_PATH, GAMES_PATH, GAME_PATH } from './constants/urlApi';

const GamesContainer = lazy(() => import('./containers/GamesContainer'));
const GameContainer = lazy(() => import('./containers/GameContainer'));
const LoginContainer = lazy(() => import('./containers/LoginContainer'));
const SignupContainer = lazy(() => import('./containers/SignupContainer'));
const NotFound = lazy(() => import('./containers/NotFound'));

export const routes = [
  {
    path: INDEX_PATH,
    exact: true,
    layout: PublicLayout,
    component: GamesContainer
  },
  {
    path: GAMES_PATH,
    exact: true,
    layout: PublicLayout,
    component: GamesContainer
  },
  {
    path: GAME_PATH,
    exact: true,
    layout: PublicLayout,
    component: GameContainer
  },
  {
    path: '/login',
    exact: true,
    layout: PublicLayout,
    component: LoginContainer
  },
  {
    path: '/signup',
    exact: true,
    layout: PublicLayout,
    component: SignupContainer
  },
  {
    path: '*',
    layout: PublicLayout,
    component: NotFound
  }
];
