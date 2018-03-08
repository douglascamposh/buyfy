FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('homeLayout');
  }
});
//login route
FlowRouter.route('/register', {
  name: 'register',
  action() {
    BlazeLayout.render('mainLayout', {main: 'register'});
  }
});

FlowRouter.route('/login', {
  name: 'register',
  action() {
    BlazeLayout.render('mainLayout', {main: 'login'});
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
