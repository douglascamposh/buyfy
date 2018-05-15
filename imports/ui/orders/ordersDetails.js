import { Meteor } from 'meteor/meteor';
import { Products } from '../../api/products.js'; //de aqui deberia obtener las imagenes, o tb puede guardr el thumbnail en lineitem
import { Orders } from '../../api/orders.js';
import { Template } from 'meteor/templating';
import './ordersDetails.html';

Template.ordersDetails.onCreated(function() {
  Meteor.subscribe('orders');
});

Template.ordersDetails.helpers({
  orders: () => Orders.find({})
});
