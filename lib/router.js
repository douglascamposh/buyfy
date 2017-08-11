FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('homeLayout');
  }
});

FlowRouter.route('/products', {
  name: 'products',
  action() {
    BlazeLayout.render('mainLayout', {main: 'products'});
  }
});

FlowRouter.route('/products/:id', {
  name: 'productDetail',
  action() {
    BlazeLayout.render('mainLayout', {main: 'productDetail'});
  }
});
