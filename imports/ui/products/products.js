import { Meteor } from 'meteor/meteor';
import { Products } from '../../api/products.js';
import { Cart } from '../../api/cart.js';
import { Favorites } from '../../api/favorites.js';
import { Template } from 'meteor/templating';
import './products.html';

Template.products.onCreated(function() {
  Meteor.subscribe('products');
  Meteor.subscribe('favorites');
});

Template.products.helpers({
  products: () => Products.find({})
});

Template.product.helpers({
  getLastCost: (costs) => {
    if(costs && costs.length) {
      const cost = costs[costs.length -1];
      return cost ? cost.price : "";
    }
    return "";
  },
  isFavorite: (productId) => {
    return Favorites.findOne({ userId: Meteor.userId(), 'product.productId': productId }) ? 'favorite' : ''
  }
});

Template.product.events({
  'click .add-cart'() {
    Meteor.call('cart.insert', {productId: this._id, name: this.name, price: this.costs[this.costs.length - 1].price, discount: this.costs[this.costs.length - 1].discount, quantity: this.quantity});
  },
  'click .add-favorite'() {
    const element = $('.add-favorite');
    element.removeClass('add-favorite');
    element.addClass('remove-favorite');
    Meteor.call('favorite.insert', {productId: this._id, name: this.name, price: this.costs[this.costs.length - 1].price, discount: this.costs[this.costs.length - 1].discount, quantity: this.quantity});
  },
  'click .remove-favorite'() {
    const element = $('.remove-favorite');
    element.removeClass('remove-favorite');
    element.addClass('add-favorite');
    Meteor.call('favorite.remove', this._id);
  }
});
