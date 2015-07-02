window.Camera = Backbone.Model.extend({

    urlRoot: "api/cameras",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a model name"};
        };

        this.validators.make = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a camera make"};
        };

        this.validators.price = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a RRP"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        id: null,
        name: "",
        make: "",
        price: "0.00",
        description: "",
        picture: null
    }
});

window.CameraCollection = Backbone.Collection.extend({

    model: Camera,

    url: "api/cameras"

});