import { TextureLoader } from "three";

export const loadTextures = (textureUrls) => {
  return new Promise((resolve, reject) => {
    const loader = new TextureLoader();
    const loadedTextures = {};
    let loadedCount = 0;

    textureUrls.forEach((url) => {
      loader.load(
        url,
        (texture) => {
          loadedTextures[url] = texture;
          loadedCount += 1;
          if (loadedCount === textureUrls.length) {
            resolve(loadedTextures);
          }
        },
        undefined,
        (err) => {
          reject(err);
        }
      );
    });
  });
};
