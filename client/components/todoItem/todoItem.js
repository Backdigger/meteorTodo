
Template.todoItem.events({
    'click .delete-todo': function(event){
        event.preventDefault();
        var documentId = this._id;
        var confirm = window.confirm("Delete this task?");
        if(confirm){
            Meteor.call('removeListItem', documentId);
            // Todos.remove({ _id: documentId });
        }

    },
    'keyup [name=todoItemName]': function(event) {
        if(event.which == 13 || event.which == 27) {
            $(event.target).blur();
        } else {
            var documentId = this._id;
            var todoItemName = $(event.target).val();
            Meteor.call('updateListItemName', documentId, todoItemName);
            // Todos.update({ _id: documentId }, {$set: { name: todoItemName }});
        }


    },
    'keyup [name=todoItemDescription]': function(event) {
        if(event.which == 13 || event.which == 27) {
            $(event.target).blur();
        } else {
            var documentId = this._id;
            var todoItemDescription = $(event.target).val();
            Meteor.call('updateListItemDescription', documentId, todoItemDescription);
            // Todos.update({_id: documentId}, {$set: {description: todoItemDescription}});
        }
    },
    'change [type=checkbox]': function(){
        var documentId = this._id;
        var isCompleted = this.completed;
        if(isCompleted){
            Meteor.call('changeItemStatus', documentId, false);
            // Todos.update({ _id: documentId }, {$set: { completed: false }});
        } else {
            // Todos.update({ _id: documentId }, {$set: { completed: true }});
            Meteor.call('changeItemStatus', documentId, true);
        }
    }

});

Template.todoItem.helpers({
    'checked': function(){
        var isCompleted = this.completed;
        if(isCompleted){
            return "checked";
        } else {
            return "";
        }
    }
});
