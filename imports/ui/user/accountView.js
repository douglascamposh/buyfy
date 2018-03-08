import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './accountView.html';

Template.register.events({
  'submit .register-form': function (event) {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      const firstname = event.target.firstname.value;
      const lastname = event.target.lastname.value;

      const user = {'email':email, password: password, profile:{name: firstname +" "+lastname}};
      Accounts.createUser(user,function(err){
        if(!err) {
          FlowRouter.go('/');
        }
      });
  }
});

Template.login.events({
  'submit .login-form': function (event) {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;

      Meteor.loginWithPassword(email, password,function(err){
        if(!err) {
            FlowRouter.go('/');
        }
      });
  }
});
