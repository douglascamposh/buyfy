import { Cart } from '../../api/cart.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './cart.html';

Template.cart.onCreated(function() {
  Meteor.subscribe('carts');
  Meteor.subscribe('products');//should be subscribe only to products belongs to cart
});

Template.cart.helpers({
  carts: () => Cart.find({})
});

Template.cartDetail.helpers({
  getLastCost: (costs) => {
    if(costs && costs.length) {
      const cost = costs[costs.length -1];
      return cost ? cost.price : "";
    }
    return "";
  }
});
