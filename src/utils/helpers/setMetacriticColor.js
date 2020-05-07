export function setMetacriticColor(num) {
  if (num < 0) return '';

  let color = '-metacritic-';
  if (num >= 75) {
    color += 'red';
  } else if (num >= 50) {
    color += 'yellow';
  } else if (num >= 25) {
    color += 'blue';
  } else {
    color += 'green';
  }

  return color;
}
