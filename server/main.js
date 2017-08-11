import '../imports/api/products.js';
Meteor.startup(function () {
  /*WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', 'http://10.31.176.29:3000');
    res.header('Access-Control-Allow-Origin', 'http://10.31.176.29');
    res.header('Access-Control-Allow-Origin', 'http://localhost:12744');
    res.header('Access-Control-Allow-Origin', 'http://10.31.176.29:12744');
    res.header('Access-Control-Allow-Origin', 'http://meteor.local');
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");
    return next();
  });*/
});
