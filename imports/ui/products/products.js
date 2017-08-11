import { Products } from '../../api/products.js';
import { Template } from 'meteor/templating';
import './products.html';

Template.products.onCreated(function() {
  Meteor.subscribe('products');
});

Template.products.helpers({
  products: () => Products.find({})
});
