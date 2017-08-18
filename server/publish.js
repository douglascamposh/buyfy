import { Products } from '../imports/api/products.js';
import { Categories } from '../imports/api/categories.js';
Meteor.publish('products', function() {
  return Products.find({});
});

Meteor.publish('product', function(id) {
  return Products.find({_id: id});
});

Meteor.publish('categories', function() {
  return Categories.find({});
});
