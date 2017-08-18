import { Mongo } from 'meteor/mongo';
const Categories = new Mongo.Collection('categories');
Categories.allow({
  insert: function(userId, doc) {
    return !userId;
  }
});
CategorySchema = new SimpleSchema({
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

Categories.attachSchema(CategorySchema);
export {Categories};
