import { Categories } from '../../api/categories.js';
import './newCategory.html';

Template.registerHelper('Categories', Categories);//fix to use with autoform
