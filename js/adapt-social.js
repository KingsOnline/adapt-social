define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');
  var socialView = require('extensions/adapt-social/js/adapt-socialView');


  Adapt.once('sideView:loaded', function() {
    createSocial();
  });

  Adapt.on('sideView:pageReady', function() {
      console.log(Adapt.location);
      loopBlocksInPage(Adapt.contentObjects._byAdaptID[Adapt.location._currentId]);
  });

  function loopBlocksInPage(currentPage) {
    var articles = currentPage[0].attributes._children;
    for (var i = 0; i < articles.length; i++) { // loop through all the articles in the page
      var blocks = articles.models[i].attributes._children;
      for (var v = 0; v < blocks.models.length; v++) {
        var block = blocks.models[v];
        checkForMoodleAttr(block);
      }
    }
  }

  function checkForMoodleAttr(blockModel) {
    var context = this;
    if (typeof blockModel.attributes._social != "undefined") {
      if (blockModel.attributes._social._isEnabled != false) {
        new socialView(blockModel);
      }
    }
  }

  function createSocial() {
    $('.sideview-iframe-holder').append("<div class='social hidden'><iframe name='socialIframe' id='social-iframe' src='' class='social-iframe'></iframe></div>");
  }
});
