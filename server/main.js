import '../imports/api/products.js';

WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});
