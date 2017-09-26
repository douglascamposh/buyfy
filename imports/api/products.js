import { Mongo } from 'meteor/mongo';
const Products = new Mongo.Collection('products');
Products.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

PriceSchema = new SimpleSchema({
  price: {
    type: Number,
    label: "Price"
  },
  cost: {
    type: Number,
    label: "Cost"
  },
  discount: {
    type: Number,
    label: "Discount"
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
  quantity: {
    type: Number,
    label: "Quantity"
  },
  costs: {
    type: [PriceSchema]
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
  },
  visible: {
    type: Boolean,
    autoValue: function() {
      return true;
    },
    autoform: {
      type: "hidden"
    }
  }
});

Products.attachSchema(ProductSchema);
export {Products};
