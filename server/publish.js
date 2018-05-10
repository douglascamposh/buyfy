import { Products } from '../imports/api/products.js';
import { Categories } from '../imports/api/categories.js';
import { Cart } from '../imports/api/cart.js';
import { Favorites } from '../imports/api/favorites.js';
import { Orders } from '../imports/api/orders.js';
Meteor.publish('products', function() {
  return Products.find({});
});

Meteor.publish('product', function(id) {
  return Products.find({_id: id});
});

Meteor.publish('categories', function() {
  return Categories.find({});
});

Meteor.publish('favorites', function() {
  return Favorites.find({userId: Meteor.userId(), visible: true});
});

Meteor.publish('orders', function() {
  return Orders.find({userId: Meteor.userId()});
});

Meteor.publish('carts', function() {
  return Cart.find({userId: Meteor.userId()});
});

Meteor.publish('cart', function(id) {
  return Cart.find({_id: id});
});
