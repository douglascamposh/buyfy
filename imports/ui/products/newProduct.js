import { Products } from '../../api/products.js';
import './newProduct.html';

Template.registerHelper('Products', Products);//fix to use with autoform
