"use strict";
let config = {};
config.username = "lisnote";
config = {
  ...config,
  clientID: "",
  clientSecret: "",
  token: "",
  root: `https://${config.username}.github.io/`,
};

module.exports = function (obj) {
  if (obj != null) {
    config = {
      ...config,
      ...obj,
    };
  }
  return config;
};