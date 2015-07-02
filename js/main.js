var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "cameras/page/:page"	: "list",
        "cameras/add"         : "addCamera",
        "cameras/:id"         : "cameraDetails"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var cameraList = new CameraCollection();
        cameraList.fetch({success: function(){
            $("#content").html(new CameraListView({model: cameraList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    cameraDetails: function (id) {
        var camera = new Camera({id: id});
        camera.fetch({success: function(){
            $("#content").html(new CameraView({model: camera}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addCamera: function() {
        var camera = new Camera();
        $('#content').html(new CameraView({model: camera}).el);
        this.headerView.selectMenuItem('add-menu');
	},

});

utils.loadTemplate(['HeaderView', 'CameraView', 'CameraListItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});