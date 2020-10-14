import axios from "axios";

//API_KEY is defined in quasar.conf.js, quasar gives you the possibility of declaring env variables in build: { env: {}} in the quasar config
export function GetBearerToken({ commit }) {
  const url = "http://interview.agileengine.com/auth";
  return axios
    .post(url, { apiKey: process.env.API_KEY })
    .then(result => {
      commit("SET_BEARER_TOKEN", result.data);
    })
    .catch(err => {
      console.log(err);
    });
}
