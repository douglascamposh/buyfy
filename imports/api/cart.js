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
  }
});

CartSchema = new SimpleSchema({
  product: {
    type: ProductRef
  },
  total: {
    type: Number
  },
  userId: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updateAt: {
    type: Date
  }
});

Cart.attachSchema(CartSchema);
export {Cart};

Meteor.methods({
  'cart.insert'(product) {
    check(product, Object);
    // Make sure the user is logged in before inserting a cart
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Cart.update(
      { userId: Meteor.userId(), 'product.productId': product.productId },
      {
        $set: {
          product,
          updateAt: new Date()
        },
        $setOnInsert: {
          total: 1,
          createdAt: new Date(),
          userId: Meteor.userId()
        }
      },
      { upsert: true }
    );
  },
});
