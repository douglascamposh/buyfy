import { Template } from 'meteor/templating';
import { Products } from '../api/products.js';
import './products.html';

Template.body.helpers({
  products() {
    return Products.find({});
  },
});
