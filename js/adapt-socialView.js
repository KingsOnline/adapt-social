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
      'click button.moodle-launch-button': 'launchButton'
    },

    launchButton: function(event) {
      if ($(event.target).hasClass('open')) {
        Adapt.trigger("sideView:close");
      } else {
        Adapt.trigger("sideView:open");
      }
      $('.moodle').removeClass('hidden');
      $('.moodle').siblings().addClass('hidden');
    },

    openLightbox: function(event) {
      $('.moodle-launch-button.open').removeClass('open'); // closes other instances
      $(event.target).addClass('open');
      $('body').addClass('moodle-open').removeClass('moodle-close');
      $('.moodle-view').removeClass('close').addClass('open');

      var linkToBlock = location.protocol + '//' + location.host + location.pathname + '#/id/' + this.attributes._id;
      if ($('.moodle-iframe').attr('src') != this.attributes._moodle._link) {
        $('.moodle-iframe').remove();
        this.renderIframe(this.attributes._moodle._type, linkToBlock);
      }

      this.scrollToBlock();
      this.setupCloseButton();
    },

    scrollToBlock: function() {
      var $firstChild = '.' + this.attributes._children.models[0].attributes._id;
      Adapt.scrollTo($($firstChild), {
        duration: 700
      });
    },

    setupCloseButton: function() {
      $('.iframe-controls-title').html(this.attributes._moodle.buttonLabel);
    },

    renderIframe: function(type, linkToBlock) {
      $('.moodle-iframe-holder').addClass('loading-iframe');
      $('.moodle-iframe-holder').append("<div class='moodle'><iframe name='moodleIframe' id='moodleIframe' class='moodle-iframe'></iframe></div>");
      $('.moodle-iframe').attr('src', this.attributes._moodle._link);

      $('.moodle-iframe').on('load', function() {
        var adaptCSS = location.protocol + '//' + location.host + location.pathname;
        adaptCSS = adaptCSS.substring(0, adaptCSS.lastIndexOf('/'));
        adaptCSS += "/assets/adapt-moodle-iframe-" + type + ".css"
        $('.moodle-iframe').contents().find("head").append($("<link/>", {
          rel: "stylesheet",
          href: adaptCSS,
          type: "text/css"
        }));

        document.getElementById('moodleIframe').contentWindow.window.onbeforeunload = null; // prevents error message when leaving moodle page when you haven't submitted.

        setTimeout(function() {
          $('.moodle-iframe-holder').removeClass('loading-iframe');
        }, 300);
      });
    },

    closeLightbox: function(event) {
      if (event && event.preventDefault) event.preventDefault();
      $('.moodle-view').removeClass('open').addClass('close');
      $('.moodle-launch-button.open').removeClass('open');
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
