// The in-memory Store. Encapsulates logic to access camera data.
window.store = {

    cameras: {},

    populate: function () {

        this.cameras[1] = {
            id: 1,
            name: "GH4",
            make: "Pansonic",
            price: "$1900",
            region: "Southern Rhone",
            description: "A popular choice for a budget 4K cinema camera, this has won numerous awards.",
            picture: "gh4.jpg"
        };
        this.cameras[2] = {
            id: 2,
            name: "A7S",
            make: "Sony",
            price: "$1450",
            description: "Changing the game with a full mirror camera, this is definitely on the must-consider list.",
            picture: "a7s.jpg"
        };
        this.cameras[3] = {
            id: 3,
            name: "C500",
            make: "Canon",
            price: "$9000",
            description: "Much more expensive but a premium that comes with quality.",
            picture: "c500.gif"
        };
        this.cameras[4] = {
            id: 4,
            name: "Pocket Cinema",
            make: "Blackmagic",
            price: "$699",
            description: "The cheapest camera offering no-compression filmmaking.",
            picture: "bmpc.jpg"
        };

        this.lastId = 54
    },

    find: function (model) {
        return this.cameras[model.id];
    },

    findAll: function () {
        return _.values(this.cameras);
    },

    create: function (model) {
        this.lastId++;
        model.set('id', this.lastId);
        this.cameras[this.lastId] = model;
        return model;
    },

    update: function (model) {
        this.cameras[model.id] = model;
        return model;
    },

    destroy: function (model) {
        delete this.cameras[model.id];
        return model;
    }

};

store.populate();

// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple in-memory approach.
Backbone.sync = function (method, model, options) {

    var resp;

    switch (method) {
        case "read":
            resp = model.id ? store.find(model) : store.findAll();
            break;
        case "create":
            resp = store.create(model);
            break;
        case "update":
            resp = store.update(model);
            break;
        case "delete":
            resp = store.destroy(model);
            break;
    }

    if (resp) {
        options.success(resp);
    } else {
        options.error("Record not found");
    }
};