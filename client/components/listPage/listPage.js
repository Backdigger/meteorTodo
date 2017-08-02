Template.listPage.events({
    'click .delete-list': function(event){
        event.preventDefault();
        var documentId = this._id;
        var confirm = window.confirm("Delete this list?");
        Meteor.call('deleteList', documentId, confirm );
    }
});
