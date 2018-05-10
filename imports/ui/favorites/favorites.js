import { Favorites } from '../../api/favorites.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './favorites.html';

Template.favorites.onCreated(function() {
  Meteor.subscribe('favorites');
});

Template.favorites.helpers({
  favorites: () => Favorites.find({})
});

Template.favorite.helpers({
  getLastCost: (costs) => {
    if(costs && costs.length) {
      const cost = costs[costs.length -1];
      return cost ? cost.price : "";
    }
    return "";
  }
});

Template.favorite.events({
  'click .add-cart'() {
    Meteor.call('cart.insert', {productId: this._id, name: this.name, price: this.costs[this.costs.length - 1].price, discount: this.costs[this.costs.length - 1].discount, quantity: this.quantity});
  },
  'click .remove-favorite'() {
      console.log("this.product.productId", this.product.productId);
    Meteor.call('favorite.remove', this.product.productId);
  }
});
