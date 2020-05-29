import { lazy } from 'react';
import { PublicLayout } from './layouts';
import {
  INDEX_PATH,
  GAMES_PATH,
  GAME_PATH,
  USER_PATH
} from './constants/urlApi';

const GamesContainer = lazy(() => import('./containers/GamesContainer'));
const GameContainer = lazy(() => import('./containers/GameContainer'));
const LoginContainer = lazy(() => import('./containers/LoginContainer'));
const SignupContainer = lazy(() => import('./containers/SignupContainer'));
const UserContainer = lazy(() => import('./containers/UserContainer'));
const UserSettingsContainer = lazy(() =>
  import('./containers/UserSettingsContainer')
);
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
    path: USER_PATH,
    exact: true,
    layout: PublicLayout,
    component: UserContainer
  },
  {
    path: '/settings',
    exact: true,
    layout: PublicLayout,
    component: UserSettingsContainer
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
