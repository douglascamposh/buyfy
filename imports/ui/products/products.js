import { Meteor } from 'meteor/meteor';
import { Products } from '../../api/products.js';
import { Cart } from '../../api/cart.js';
import { Template } from 'meteor/templating';
import './products.html';

Template.products.onCreated(function() {
  Meteor.subscribe('products');
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
  }
});

Template.product.events({
  'click .add-cart'() {
    Meteor.call('cart.insert', [{productId: this._id, name: this.name, price: this.costs[this.costs.length - 1].price, discount: this.costs[this.costs.length - 1].discount, quantity: this.quantity}]);
  }
});
