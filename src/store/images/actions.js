//Axios is only available in SFC files through this.$axios, when it comes to actions/mutations or other not *.vue files axios must be imported.
//https://quasar.dev/quasar-cli/ajax-requests#Introduction
//There's a workaround to this, passing the vue instance (this) to the actions that use axios but according to quasar forums is better to import axios
//https://forum.quasar-framework.org/topic/4135/this-axios-in-action/4
import axios from "axios";

export function GetImages({ commit }, { page }) {
  const url = `http://interview.agileengine.com/images?page=${page}`;
  commit("SET_IMAGES", null);
  commit("ERROR_GETTING_IMAGES_LIST", null);
  commit("SET_ARRAY_LENGTH", null);
  return axios
    .get(url)
    .then(result => {
      commit("ERROR_GETTING_IMAGES_LIST", false);
      commit("SET_IMAGES", result.data.pictures);
      commit("SET_MAX_PAGES", result.data.pageCount);
      commit("SET_ARRAY_LENGTH", result.data.pictures.length);
    })
    .catch(err => {
      commit("ERROR_GETTING_IMAGES_LIST", true);
      console.log(err);
    });
}

export function GetImage({ commit }, { imageId }) {
  const url = `http://interview.agileengine.com/images/${imageId}`;
  commit("SET_IMAGE", null);
  commit("IMAGE_LOADED", false);
  commit("ERROR_GETTING_IMAGE", null);
  return axios
    .get(url)
    .then(result => {
      commit("SET_IMAGE", result.data);
      commit("IMAGE_LOADED", true);
      commit("ERROR_GETTING_IMAGE", false);
    })
    .catch(err => {
      commit("ERROR_GETTING_IMAGE", true);
      console.log(err);
    });
}
