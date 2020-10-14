//Axios is only available in SFC files through this.$axios, when it comes to actions/mutations or other not *.vue files axios must be imported.
//https://quasar.dev/quasar-cli/ajax-requests#Introduction
//There's a workaround to this, passing the vue instance (this) to the actions that use axios but according to quasar forums is better to import axios
//https://forum.quasar-framework.org/topic/4135/this-axios-in-action/4
import axios from "axios";

export function SET_BEARER_TOKEN(state, result) {
  state.bearerToken = result.token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`;
}

export function SET_ERROR_GETTING_TOKEN(state, payload) {
  state.errorGettingToken = payload;
}
