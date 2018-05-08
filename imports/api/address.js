Address = {
  name: {
    type: String
  },
  line1: {
    type: String
  },
  line2: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  phoneExtn: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  },
  updateAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  }
};

export {Address};
