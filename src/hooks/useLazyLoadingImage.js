import { useState, useEffect } from 'react';

export const useLazyLoadingImage = sourceImage => {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = sourceImage;

    imageLoader.onload = () => {
      setSrc(sourceImage);
    };
  }, [sourceImage]);

  return src;
};
