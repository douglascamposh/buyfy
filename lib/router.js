FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('homeLayout');
  }
});
//products route
FlowRouter.route('/products', {
  name: 'products',
  action() {
    BlazeLayout.render('mainLayout', {main: 'products'});
  }
});

FlowRouter.route('/products/new', {
  name: 'newProduct',
  action() {
    BlazeLayout.render('mainLayout', {main: 'newProduct'});
  }
});

FlowRouter.route('/products/:id', {
  name: 'productDetail',
  action() {
    BlazeLayout.render('mainLayout', {main: 'productDetail'});
  }
});

//categories route
FlowRouter.route('/categories', {
  name: 'categories',
  action() {
    BlazeLayout.render('mainLayout', {main: 'categories'});
  }
});

//favorites route
FlowRouter.route('/favorites', {
  name: 'favorites',
  action() {
    BlazeLayout.render('mainLayout', {main: 'favorites'});
  }
});
