Template.login.onDestroyed(function() {
    console.log("The 'login' template was just destroyed");
});
Template.login.onCreated(function() {
    console.log("The 'login' template was just created");
});
Template.login.onRendered(function() {
    var validator = $('.login').validate({
        submitHandler: function(event) {
            var email = $('[name="email"]').val();
            var password = $('[name="password"]').val();
            Meteor.loginWithPassword(email, password, function(error) {
                if (error) {
                    if (error.reason == "User not found") {
                        validator.showErrors({
                            email: error.reason
                        });
                    }
                    if (error.reason == "Incorrect password") {
                        validator.showErrors({
                            password: error.reason
                        })
                    }
                }
                else {
                    var currentRoute = Router.current().route.getName();
                    if (currentRoute == 'login') {
                        Router.go('home');
                    }

                }

            });
        }
    });
});
Template.login.events({
    'submit form': function(event) {
        event.preventDefault();

    }
});
