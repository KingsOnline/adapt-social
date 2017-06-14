define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');

  var moodleView = Backbone.View.extend({

    className: "moodle",

    initialize: function(blockModel) {
      this.listenTo(Adapt, 'remove', this.remove);
      this.render(blockModel);
    },

    events: {
      'click button.social-open-button': 'launchButton'
    },

    launchButton: function(event) {
      if ($(event.target).hasClass('open')) {
        Adapt.trigger("sideView:close");
        this.hideSocial();
      } else {
        $(event.target).addClass('open');
        Adapt.trigger("sideView:open");
        this.showSocial();
      }
    },

    showSocial: function(event) {
      $('.social').removeClass('hidden');
      $('.social').siblings().addClass('hidden');
      this.scrollToBlock();
      $('.iframe-controls-title').text(this.attributes._moodle.buttonLabel);
      // prevents reloading if iframe is currently loaded
      if(document.getElementById('social-iframe').src != this.attributes._moodle._link){
        Adapt.trigger('sideView:loadIframe', "social", this.attributes._moodle._type, this.attributes._moodle._link)
        Adapt.trigger('sideView:removeLoading');
      }
    },

    scrollToBlock: function() {
      var $firstChild = '.' + this.attributes._children.models[0].attributes._id;
      Adapt.scrollTo($($firstChild), {duration: 700});
    },

    hideSocial: function(event) {
      if (event && event.preventDefault)
        event.preventDefault();
      $('.moodle-view').removeClass('open').addClass('close');
      $('.social-open-button.open').removeClass('open');
      $('body').removeClass('moodle-open').addClass('moodle-close');
    },

    setButtonName: function() {
      if (this.attributes._moodle.buttonLabel == undefined || this.attributes._moodle.buttonLabel == "") {
        this.attributes._moodle.buttonLabel = this.attributes._moodle._type;
      }
    },

    render: function(blockModel) {
      // // Convert model data into JSON
      this.setButtonName();
      var data = blockModel.toJSON();
      data = data._moodle;
      var template = Handlebars.templates["moodle"];
      var $selector = $('.' + blockModel.attributes._id + '>:first');
      this.$el.html(template(data)).appendTo($selector);
      return this;
    }
  });

  // Return moodleView so it can be required
  return moodleView;
});
