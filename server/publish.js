import { Products } from '../imports/api/products.js';
Meteor.publish('products', function() {
  return Products.find({});
});

Meteor.publish('product', function(id) {
  return Products.find({_id: id});
});
