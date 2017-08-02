Template.addTodo.events({

        'click .color': function (event) {
            console.log(event.which);
            event.preventDefault();
            var todoColor = event.target;
            todoColor.classList.add('activeColor')

        },
        'submit form': function (event) {

            event.preventDefault();
            var todoName = $('[name="todoName"]').val(),
                todoDescription = $('[name="todoDescription"]').val(),
                todoColorItem = $('.activeColor'),
                todoColor = todoColorItem.css('background-color'),
                currentList = this._id;
            Meteor.call('createListItem', todoName, todoDescription, currentList, todoColor, function(error) {
                if(error){
                    console.log(error.reason);
                } else {
                    $('[name="todoName"]').val('');
                    $('[name="todoDescription"]').val('');
                    todoColorItem.removeClass('activeColor');
                }
            });


        }

    }
);
Template.addTodo.helpers({
    colors: [
        {'color': '#77284D'},
        {'color': '#2745B8'},
        {'color': '#D02AD3'},
        {'color': '#F9E867'},
        {'color': '#67d3f9'}
    ]
});
