import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { CommonObject } from './common.js';

const Favorites = new Mongo.Collection('favorites');
Favorites.allow({
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

FavoriteSchema = new SimpleSchema({
  product: {
      type: ProductRef
  },
  userId: {
    type: String
  },
  visible: {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  updateAt: {
    type: Date
  }
});

Favorites.attachSchema(FavoriteSchema);
export {Favorites};

Meteor.methods({
  'favorite.insert'(product) {
    check(product, Object);
    // Make sure the user is logged in before inserting a favorite
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Favorites.update(
      { userId: Meteor.userId(), 'product.productId': product.productId },
      {
        $set: {
          product,
          visible: true,
          updateAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date(),
          userId: Meteor.userId()
        }
      },
      { upsert: true }
    );
  },
  'favorite.remove'(productId) {
    check(productId, String);
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Favorites.update(
      { userId: Meteor.userId(), 'product.productId': productId },
      {
        $set: {
          visible: false,
          updateAt: new Date()
        }
      }
    );
  }
});
