import { pathToRegexp, compile } from 'path-to-regexp';

const compileOptions = options => {
  return Object.keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&');
};

const getPathMatch = (paths, pathname) => {
  return paths
    .map(path => {
      const keys = [];
      const regexp = pathToRegexp(path, keys);
      return { path, regexp, keys };
    })
    .find(path => path.regexp.test(pathname));
};

const parseRouteKeys = (pathname, result) => {
  const { keys, regexp } = result;
  const regexpResult = regexp.exec(pathname);

  return keys.reduce(
    (obj, key, i) => ({
      ...obj,
      [key.name]: i + 1 < regexpResult.length ? regexpResult[i + 1] : ''
    }),
    {}
  );
};

const parseRouteOptions = search => {
  return search
    .split('&')
    .map(pair => pair.split('='))
    .filter(keyValuePair => keyValuePair.length === 2 && keyValuePair[0] !== '')
    .reduce(
      (obj, keyValuePair) => ({ ...obj, [keyValuePair[0]]: keyValuePair[1] }),
      {}
    );
};

export const parseRoute = (paths, pathname, search) => {
  const pathMatch = getPathMatch(paths, pathname);
  const path = pathMatch ? pathMatch.path : pathname;
  const keys = pathMatch ? parseRouteKeys(pathname, pathMatch) : [];
  const options = search ? parseRouteOptions(search) : {};

  return { path, keys, options };
};

export const compileRoute = ({ path, keys, options }) => {
  const toPath = compile(path, { encode: encodeURIComponent });
  const query = compileOptions(options);
  return `${toPath(keys)}${query.trim() !== '' ? `?${query}` : ''}`;
};
