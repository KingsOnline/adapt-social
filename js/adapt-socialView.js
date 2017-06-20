define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');

  var socialView = Backbone.View.extend({

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
      $('.sideview-controls-title').text(this.attributes._social.buttonLabel);
      // prevents reloading if iframe is currently loaded
      if(document.getElementById('social-iframe').src != this.attributes._social._link) {
        Adapt.trigger('sideView:loadIframe', "social", this.attributes._social._type, this.attributes._social._link);
      }

      var context = this;
      Adapt.on('sideView:close', function() {
          context.hideSocial();
      });
    },

    scrollToBlock: function() {
      var $firstChild = '.' + this.attributes._children.models[0].attributes._id;
      Adapt.scrollTo($($firstChild), {duration: 700});
    },

    hideSocial: function(event) {
      if (event && event.preventDefault)
        event.preventDefault();
      $('.sideview').removeClass('open').addClass('close');
      $('.social-open-button.open').removeClass('open');
      $('body').removeClass('moodle-open').addClass('moodle-close');
    },

    setButtonName: function() {
      if (this.attributes._social.buttonLabel == undefined || this.attributes._social.buttonLabel == "") {
        this.attributes._social.buttonLabel = this.attributes._social._type;
      }
    },

    render: function(blockModel) {
      this.setButtonName();

      var data = blockModel.toJSON();
      data = data._social;
      var template = Handlebars.templates.social;
      this.setElement(template(data)).$el.appendTo($('.' + blockModel.attributes._id + '>:first'));
    }
  });

  return socialView;
});
