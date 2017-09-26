import { Mongo } from 'meteor/mongo';
import { CommonObject } from './common.js';

const Categories = new Mongo.Collection('categories');
Categories.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});
CategoryObject = {
  name: {
    type: String,
    label: "Name"
  },
  description: {
    type: String,
    label: "Description"
  }
};

Object.assign(CategoryObject, CommonObject);
CategorySchema = new SimpleSchema(CategoryObject);

Categories.attachSchema(CategorySchema);
export {Categories};
