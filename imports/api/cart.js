import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
const Cart = new Mongo.Collection('cart');
Cart.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

ProductRef = new SimpleSchema({
  productId: {
    type: String
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
  discount: {
    type: Number
  },
  quantity: {
    type: Number
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  }
});

CartSchema = new SimpleSchema({
  products: {
      type: [ProductRef]
  },
  total: {
    type: Number
  },
  userId: {
    type: String
  },
  username: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

Cart.attachSchema(CartSchema);
export {Cart};

Meteor.methods({
  'cart.insert'(products) {
    check(products, [Object]);
    // Make sure the user is logged in before inserting a cart
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Cart.insert({
      products,
      total: 1,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username,
    });
  }
});
