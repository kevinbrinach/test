import axios from "axios";

export function GetBearerToken({ commit }) {
  const url = "http://interview.agileengine.com/auth";
  const apiKey = "23567b218376f79d9415";
  return axios
    .post(url, { apiKey })
    .then(result => {
      commit("SET_BEARER_TOKEN", result.data);
    })
    .catch(err => {
      console.log(err);
    });
}
