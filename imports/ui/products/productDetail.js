import { Products } from '../../api/products.js';
import { Template } from 'meteor/templating';
import './productDetail.html';

Template.productDetail.onCreated(function() {
  const id = FlowRouter.getParam('id');
  Meteor.subscribe('product', id);
});

Template.productDetail.helpers({
  product: () => {
    const id = FlowRouter.getParam('id');
    return Products.findOne({_id: id});
  }
});
