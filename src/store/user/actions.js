//Axios is only available in SFC files through this.$axios, when it comes to actions/mutations or other not *.vue files axios must be imported.
//https://quasar.dev/quasar-cli/ajax-requests#Introduction
//There's a workaround to this, passing the vue instance (this) to the actions that use axios but according to quasar forums is better to import axios
//https://forum.quasar-framework.org/topic/4135/this-axios-in-action/4
import axios from "axios";

//API_KEY is defined in quasar.conf.js, quasar gives you the possibility of declaring env variables in build: { env: {}} in the quasar config
export function GetBearerToken({ commit }) {
  const url = "http://interview.agileengine.com/auth";
  commit("SET_ERROR_GETTING_TOKEN", null);
  return axios
    .post(url, { apiKey: process.env.API_KEY })
    .then(result => {
      commit("SET_ERROR_GETTING_TOKEN", false);
      commit("SET_BEARER_TOKEN", result.data);
    })
    .catch(err => {
      console.log(err);
      commit("SET_ERROR_GETTING_TOKEN", true);
    });
}
