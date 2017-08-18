import { Categories } from '../../api/categories.js';
import { Template } from 'meteor/templating';
import './categories.html';

Template.categories.onCreated(function() {
  Meteor.subscribe('categories');
});

Template.categories.helpers({
  categories: () => Categories.find({})
});
