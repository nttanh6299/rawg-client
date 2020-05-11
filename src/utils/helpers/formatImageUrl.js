const LIGHTWEIGHT_IMAGE_URL = {
  VIDEO: 'https://media.rawg.io/media/crop/600/400/',
  NO_VIDEO: 'https://media.rawg.io/media/resize/640/-/'
};

export function formatImageUrl(url, clipExists = true) {
  const urlReplaced = clipExists
    ? LIGHTWEIGHT_IMAGE_URL.VIDEO
    : LIGHTWEIGHT_IMAGE_URL.NO_VIDEO;

  return url.replace('https://media.rawg.io/media/', urlReplaced);
}
