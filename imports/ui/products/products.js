import { Products } from '../../api/products.js';
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
    if(costs) {
      const cost = costs.pop();
      return cost ? cost.price : "";
    }
    return "";
  }
});