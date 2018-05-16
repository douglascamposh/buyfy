import { Mongo } from 'meteor/mongo';
import { Address } from './address.js';
import { check } from 'meteor/check';
const Orders = new Mongo.Collection('orders');
Orders.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});
ShipTo = new SimpleSchema(Address);
ShipFrom = new SimpleSchema(Address);
OrderPickup = new SimpleSchema(Address);

ShippingMethod = new SimpleSchema({
    name: {
      type: String
    },
    carrier: {
      type: String
    },
    price: {
      type: Number
    },
    saleTax: {
      type: Number,
      optional: true
    },
    cost: {
      type: Number
    },
    expectedDelivery: {
      type: Date,
      optional: true
    }
});

Shipment = new SimpleSchema({
  shipTo: {
    type: ShipTo
  },
  shipFrom: {
    type: ShipFrom
  },
  shippingMethod: {
    type: ShippingMethod
  }
});

LineItem = new SimpleSchema({
  productId: {
    type: String
  },
  name: {
    type: String
  },
  quantity: {
    type: Number
  },
  unitPrice: {
    type: Number
  },
  unitDiscount: {
    type: Number,
    optional: true
  },
  unitCost: {
    type: Number
  },
  saleTax: {
    type: Number,
    optional: true
  }
});

Payment = new SimpleSchema({
  method: {
    type: String,
    optional: true
  },
  creditCardId: {
    type: String,
    optional: true
  },
  maximumCharge: {
    type: Number,
    optional: true
  }
});

OrderSchema = new SimpleSchema({
  orderNumber: {
    type: Number
  },
  products: {
      type: [LineItem]
  },
  total: {
    type: Number
  },
  shipment: {
    type: Shipment
  },
  userId: {
    type: String,
    autoValue: function() {
        return this.userId;
    }
  },
  orderPickups: {
    type: [OrderPickup],
    optional: true
  },
  orderPayments:{
    type: Payment,
    optional: true
  },
  currencyCode: {
    type: String
  },
  shippedAt: {
    type: Date,
    optional: true
  },
  customerIP: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  }
});

Orders.attachSchema(OrderSchema);
export {Orders};

Meteor.methods({
  'order.insert'(order) {
    check(order, Object);
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    order.orderNumber = order.orderNumber || Math.floor(Math.random()*10000); //replace this should be sequencial
    const done = Orders.update(
      { userId: Meteor.userId(), orderNumber: order.orderNumber },
      {
        $set: {
          products: order.products
          ,total: order.total
          ,shipment: order.shipment
          ,orderPickups: order.orderPickups
          ,orderPayments: order.orderPayments
          ,currencyCode: order.currencyCode
          ,shippedAt: order.shippedAt
          ,customerIP: order.customerIP
          ,updatedAt: new Date()
        },
        $setOnInsert: {
          orderNumber: order.orderNumber
          ,products: order.products
          ,total: order.total
          ,shipment: order.shipment
          ,orderPickups: order.orderPickups
          ,orderPayments: order.orderPayments
          ,currencyCode: order.currencyCode
          ,shippedAt: order.shippedAt
          ,customerIP: order.customerIP
          ,createdAt: new Date()
          ,updatedAt: new Date()
          ,userId: Meteor.userId()
        }
      },
      { upsert: true, validate: false }
    );
    return done;
  },
});
