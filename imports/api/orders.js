import { Mongo } from 'meteor/mongo';
const Orders = new Mongo.Collection('orders');
Orders.allow({
  insert: function(userId, doc) {
    return !userId;
  }
});

ProductRef = new SimpleSchema({
  productId: {
    type: String,
    label: "Id",
    autoform: {
      type: "hidden"
    }
  },
  name: {
    type: String,
    label: "Name"
  },
  price: {
    type: Number,
    label: "Price"
  },
  discount: {
    type: Number,
    label: "Discount"
  },
  quantity: {
    type: Number,
    label: "Quantity"
  }
});

OrderSchema = new SimpleSchema({
  Products: {
      type: [ProductRef]
  },
  total: {
    type: Number,
    label: "Total",
    autoform: {
        type: "hidden"
    }
  },
  user: {
      type: String,
      label: "User",
      autoValue: function() {
          return this.userId
      },
      autoform: {
          type: "hidden"
      }
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

Orders.attachSchema(OrderSchema);
export {Orders};
