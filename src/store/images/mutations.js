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

export function ERROR_GETTING_IMAGES_LIST(state, payload) {
  state.errorGettingImagesList = payload;
}

export function ERROR_GETTING_IMAGE(state, payload) {
  state.errorGettingImage = payload;
}
