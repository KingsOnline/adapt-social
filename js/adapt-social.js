define(function(require) {

  var Adapt = require('coreJS/adapt');
  var socialView = require('extensions/adapt-social/js/adapt-socialView');

  Adapt.once('sideView:loaded', function() {
    createIframe();
  });

  Adapt.on('sideView:pageReady', function() {
      setupSocial(Adapt.contentObjects._byAdaptID[Adapt.location._currentId][0]);
  });

  function setupSocial(currentPage) {
    this._socialBlocks = currentPage.findDescendants('blocks').filter(function(model) {
      return model.get("_social");
    });
    _.each(this._socialBlocks, function(blockModel) {
      if (typeof blockModel.attributes._social != "undefined") {
        if (blockModel.attributes._social._isEnabled != false) {
          new socialView(blockModel);
        }
      }
    });
  }

  function createIframe() {
    var template = Handlebars.templates.socialIframe;
    $('.sideview-iframe-holder').append(template());
  }
});
