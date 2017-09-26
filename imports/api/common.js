CommonObject = {
  visible: {
    type: Boolean,
    label: "Visible",
    autoValue: function() {
      return true;
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
  },
  updateAt: {
    type: Date,
    label: "Update at",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
};

export {CommonObject};
