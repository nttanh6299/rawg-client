export function compileOptions(options) {
  return Object.keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&');
}
