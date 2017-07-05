define(function(require) {

  var Adapt = require('coreJS/adapt');
  var socialView = require('extensions/adapt-social/js/adapt-socialView');

  Adapt.once('sideView:loaded', function() {
    renderIframe();
  });

  Adapt.on('sideView:pageReady', function() {
    setupSocial(Adapt.contentObjects._byAdaptID[Adapt.location._currentId][0], createView);
  });

  Adapt.once("sideView:appendRun", function(runNumber) {
    console.log(Adapt.contentObjects);
    _.each(Adapt.contentObjects.models, function(contentObjectModel) {
      setupSocial(contentObjectModel, function(blockModel) {
        appendRun(runNumber, blockModel);
      });
    });
  });

  function setupSocial(contentObjectModel, myFunction) {
    this._socialBlocks = contentObjectModel.findDescendants('blocks').filter(function(model) {
      return model.get("_social");
    });
    _.each(this._socialBlocks, function(blockModel) {
      if (typeof blockModel.get('_social') != "undefined") {
        if (blockModel.get('_social')._isEnabled != false) {
          myFunction(blockModel);
        }
      }
    });
  }

  function appendRun(runNumber, blockModel) {
    blockModel.get('_social')._link += '_' + runNumber;
  }

  function createView(blockModel) {
    new socialView(blockModel);
  }

  function renderIframe() {
    var template = Handlebars.templates.socialIframe;
    $('.sideview-iframe-holder').append(template());
  }
});
