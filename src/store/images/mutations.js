export function SET_IMAGES(state, images) {
  state.images = images;
}

export function SET_MAX_PAGES(state, pages) {
  state.maxPages = pages;
}

export function SET_ARRAY_LENGTH(state, length) {
  state.arrayLength = length;
}

export function SET_IMAGE(state, image) {
  state.imageDetails = image;
}

export function IMAGE_LOADED(state, payload) {
  state.imageLoaded = payload;
}
