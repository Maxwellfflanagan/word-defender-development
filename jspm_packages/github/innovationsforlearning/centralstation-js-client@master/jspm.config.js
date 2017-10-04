System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "whatwg-fetch": "npm:whatwg-fetch@1.0.0"
  }
});
