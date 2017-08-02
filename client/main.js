import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Todos = new Mongo.Collection('todos');
Lists = new Meteor.Collection('lists');

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/register');
Router.route('/login');
Router.route('/', {
    name: 'home',
    template: 'home'
});
Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function() {
        var currentList = this.params._id;
        var currentUser = Meteor.userId();
        return Lists.findOne({ _id: currentList, createdBy: currentUser });
    },
    onBeforeAction: function() {
        var currentUser = Meteor.userId();
        if(currentUser) {
            this.next();
        } else {
            this.render('login');
        }
    },
    subscriptions: function() {
        return Meteor.subscribe('todos');
    }
});


if(Meteor.isClient){
    $.validator.setDefaults({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            messages: {
                email: {
                    required: "You must enter an email address.",
                    email: "You've entered an invalid email address."
                },
                password: {
                    required: "You must enter a password.",
                    minlength: "Your password must be at least {0} characters."
                }
            }
        }
    });
}

if(Meteor.isServer){
   
}
