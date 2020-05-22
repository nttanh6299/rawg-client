import { IMAGE_URL, LIGHTWEIGHT_IMAGE_URL } from '../../constants/urlApi';

export function formatImageUrl(url, clipExists = true) {
  const urlReplaced = clipExists
    ? LIGHTWEIGHT_IMAGE_URL.VIDEO
    : LIGHTWEIGHT_IMAGE_URL.NO_VIDEO;

  return !!url ? url.replace(IMAGE_URL, urlReplaced) : '';
}
