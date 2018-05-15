import { Meteor } from 'meteor/meteor';
import { Products } from '../../api/products.js';
import { Orders } from '../../api/orders.js';
import { Cart } from '../../api/cart.js';
import { Template } from 'meteor/templating';
import './orders.html';

Template.orders.onCreated(function() {
  Meteor.subscribe('orders');
  const cartId = FlowRouter.getParam('id');
  cartId ? Meteor.subscribe('cart', cartId) : Meteor.subscribe('carts');
});

Template.orders.helpers({
  cartProducts: () => Cart.find({})
});

Template.address.helpers({
  address: () => {
      if (Meteor.user()) {
        return Meteor.user().profile.address.find(address => address.defaultAddress);
      }
  }
});

Template.addresses.helpers({
  addresses: () => {
      if (Meteor.user()) {
        return Meteor.user().profile.address;
      }
  }
});

Template.orders.events({
  'click .checkout'() {
    const carts = Cart.find({})
    const order = {};
    const userAddress = Meteor.user().profile.address.find(address => address.defaultAddress);
    const products = carts.map(cart => {
      const lineItem = {};
      lineItem.productId = cart.product.productId;
      lineItem.name = cart.product.name;
      lineItem.quantity = cart.product.quantity;
      lineItem.unitPrice = cart.product.price;
      lineItem.unitDiscount = 0//this values should be take from the products
      lineItem.unitCost = 0;
      lineItem.saleTax = 0;
      return lineItem;
    });
    order.products = products;
    order.total = products.reduce((total, product) => { return product.unitPrice + total}, 0); //add sales tax too
    const shipTo = {name: userAddress.name, line1: userAddress.line1 , line2: userAddress.line2, city: userAddress.city, country: userAddress.country, state: userAddress.state, phoneNumber: userAddress.phoneNumber, phoneExtn: userAddress.phoneExtn, createdAt: new Date(), updateAt: new Date()};
    const shipFrom = {name: "Av. simon Lopez", line1: "no se" , line2:"tampoco se", city: "Cochabmba", country: "bolivia", state: "Cochabmba", phoneNumber: "70770785",phoneExtn:"4510673", createdAt: new Date(), updateAt: new Date()};
    const shippingMethod = {name: "Fedex", carrier:"Fedex", price: 5, saleTax:2, cost: 4, expectedDelivery:"2/2/2018"};
    order.shipment = {shipTo, shipFrom, shippingMethod};
    order.orderPickups = [shipTo];
    order.orderPayments = {method: "Paypal", creditCardId:"123456789",maximumCharge: 15 };
    order.currencyCode = "USD";
    order.customerIP = "192.168.1.10"; //check how to get the ip
    order.shippedAt = new Date(); // this should the date of the expected Deliveryd

    Meteor.call('order.insert', order, (err, done) => {
      if (done) {
        FlowRouter.redirect('/ordersDetails');
      } else {
        console.warn("I have to display message error");
      }
    });//redirigir a la pantalla el producto esta siendo procesado para el envio, hacer una pantalla q muestre el estado de los pedidos, crear order details, refactorizar address view
  },
  'click .hidden-address'() {
    const addressList = $('.address-view');
    addressList.slideToggle(250);
  }
});

Template.addAddress.events({
  'click .add-address'() {
    const country = $('input#country')[0].value;
    const name = $('input#name')[0].value;
    const lastname = $('input#lastname')[0].value;
    const line1 = $('input#line1')[0].value;
    const line2 = $('input#line2')[0].value;
    const city = $('input#city')[0].value;
    const state = $('input#state')[0].value;
    const postalCode = $('input#postalCode')[0].value || 0;
    const phoneNumber = $('input#phoneNumber')[0].value;
    const phoneExtn = $('input#phoneExtn')[0].value || "";
    const defaultAddress = $('input#defaultAddress')[0].value || false;
    const createdAt = new Date().getTime();
    const updateAt = new Date().getTime();
    const address = {country, name, lastname, line1, line2, city, state, postalCode, phoneNumber, phoneExtn, defaultAddress, createdAt, updateAt};

    const user = Meteor.user();
    const addresses = user.profile.address || [];
    if(defaultAddress)
      addresses.forEach(address => address.defaultAddress = false);
    addresses.push(address);
    Meteor.users.update({ _id: user._id }, {$set: {"profile.address": addresses}});
    const formAddressView = $('.form-address');
    const addressListView = $('.address-list');
    formAddressView.css("display", "none");
    addressListView.css("display", "block");
  },
  'click .address-cancel'() {
    const formAddressView = $('.form-address');
    const addressListView = $('.address-list');
    formAddressView.css("display", "none");
    addressListView.css("display", "block");
  }
});

Template.addresses.events({
  'click .check-address'(evt) {
    const user = Meteor.user();
    const $target = $(evt.currentTarget);
    const createdAt = Number($target.find( "input[name='createdAt']" ).val());
    const addresses = user.profile.address || [];
    const index = addresses.findIndex(address => address.createdAt === createdAt);
    addresses.forEach(address => address.defaultAddress = false);
    addresses[index].defaultAddress = true;
    addresses[index].updateAt = new Date();
    Meteor.users.update({ _id: user._id }, {$set: {"profile.address": addresses}});
    const addressList = $('.address-view');
    addressList.slideToggle(250);
  },
  'click .address-form'() {
    const formAddressView = $('.form-address');
    const addressListView = $('.address-list');
    formAddressView.css("display", "block");
    addressListView.css("display", "none");
  }
});
