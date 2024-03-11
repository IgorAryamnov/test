const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/media/upload",
    createProxyMiddleware({
      target: "https://js-test.kitactive.ru",
      changeOrigin: true,
    })
  );
};
