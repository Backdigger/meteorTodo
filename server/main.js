import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

Todos = new Mongo.Collection('todos');
Lists = new Meteor.Collection('lists');

Meteor.methods({
    'createNewList': function(listName){
        var currentUser = Meteor.userId();
        check(listName, String);
        if(listName == "") {
            listName = "Untitled";
        }
        var data = {
            name: listName,
            createdBy: currentUser
        };
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        return Lists.insert(data);
    },
    'createListItem': function(todoName, todoDescription, currentList, todoColor) {
        var currentUser = Meteor.userId();
        var currentListCheck = Lists.findOne(currentList);
        if (currentListCheck.createdBy != currentUser) {
            throw new Meteor.Error("invalid-user", "You don't own that list")
        }
        check(todoName, String);
        check(todoDescription, String);
        check(currentList, String);
        var data = {
            name: todoName,
            description: todoDescription,
            createdAt: new Date(),
            createdBy: currentUser,
            color: todoColor,
            completed: false,
            listId: currentList
        };
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        return Todos.insert(data);
    },
    'updateListItemName': function(documentId, todoItemName) {
        // check(todoItemName, String);
        // check(todoItemDescription, String);
        var currentUser = Meteor.userId();
        var data = {
            _id: documentId,
            createdBy: currentUser
        };
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }

        Todos.update(data, {$set: { name: todoItemName }});
        // Todos.update(data, {$set: { name: todoItemName, description: todoItemDescription }});
    },
    'updateListItemDescription': function(documentId, todoItemDescription) {
        // check(todoItemName, String);
        // check(todoItemDescription, String);
        var currentUser = Meteor.userId();
        var data = {
            _id: documentId,
            createdBy: currentUser
        };
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }

        Todos.update(data, {$set: { description: todoItemDescription }});
        // Todos.update(data, {$set: { name: todoItemName, description: todoItemDescription }});
    },
    'deleteList': function(documentId, confirm) {
        var currentUser = Meteor.userId();
        // var confirm = window.confirm("Delete this list?");
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        
        if(confirm){
            Lists.remove({ _id: documentId });
        }
    },
    'changeItemStatus': function(documentId, status) {
        check(status, Boolean);
        var currentUser = Meteor.userId();
        var data = {
            _id: documentId,
            createdBy: currentUser
        };

        Todos.update(data, {$set: { completed: status }});
    },
    'removeListItem': function(documentId) {
        var currentUser = Meteor.userId();
        var data = {
            _id: documentId,
            createdBy: currentUser
        };
        if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        Todos.remove(data);
    }
});