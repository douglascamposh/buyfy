import { Mongo } from 'meteor/mongo';
const Products = new Mongo.Collection('products');
Products.allow({
  insert: function(userId, doc) {
    return !userId;
  }
});
ProductSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  description: {
    type: String,
    label: "Description"
  },
  createdAt: {
    type: Date,
    label: "Created at",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
});

Products.attachSchema(ProductSchema);
export {Products};
