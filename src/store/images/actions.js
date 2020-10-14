//Axios is only available in SFC files through this.$axios, when it comes to actions/mutations or other not *.vue files axios must be imported.
//https://quasar.dev/quasar-cli/ajax-requests#Introduction
//There's a workaround to this, passing the vue instance (this) to the actions that use axios but according to quasar forums is better to import axios
//https://forum.quasar-framework.org/topic/4135/this-axios-in-action/4
import axios from "axios";

export function GetImages({ commit }, { page }) {
  const url = `http://interview.agileengine.com/images?page=${page}`;
  commit("SET_IMAGES", null);
  commit("SET_ARRAY_LENGTH", null);
  return axios
    .get(url)
    .then(result => {
      commit("SET_IMAGES", result.data.pictures);
      commit("SET_MAX_PAGES", result.data.pageCount);
      commit("SET_ARRAY_LENGTH", result.data.pictures.length);
    })
    .catch(err => {
      console.log(err);
    });
}

export function GetImage({ commit }, { imageId }) {
  const url = `http://interview.agileengine.com/images/${imageId}`;
  commit("SET_IMAGE", null);
  commit("IMAGE_LOADED", false);
  return axios
    .get(url)
    .then(result => {
      commit("SET_IMAGE", result.data);
      commit("IMAGE_LOADED", true);
    })
    .catch(err => {
      console.log(err);
    });
}
