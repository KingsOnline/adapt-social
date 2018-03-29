adapt-social
===============

Adapt-social is an extension for the Adapt Framework. It attaches a button to an Adapt block which when clicked loads an iFrame launched inside the [SideView extension](https://github.com/KingsOnline/adapt-sideView). The learner can interact with this external platform whilst they are using the Adapt course to engage in social interactions with other learners.

[![Youtube video](http://img.youtube.com/vi/ph-BK7Bgv7g/0.jpg)](http://www.youtube.com/watch?v=ph-BK7Bgv7g)


## Possible uses of social

Some of the ways we've used the Social extension include:

*  A discussion thread that allows learners to discuss the content in the current block.
*  A poll that allows students to vote on something.

We use the activities from our LMS and use CSS to modify what they would look like if loaded directly from the URL.

## Attributes

**_isEnabled** (boolean): set to true to enable the extension in your project. Default: false

**_type** (string): Provides a list of types of activities. When the iframe loads it also loads to corresponding _css_ file that is located at `asssets/adapt-[_type]`. Provided options are discussion and choice. You may wish to fork this extension to add more.

**_link** (string): A link to the iframe content that is being loaded.

**_buttonLabel** (string): The label on the button. If left blank this will default to match **type**.

## Limitations

*  Poor Accessibility support. Not really sure how to support navigation between two windows.

----------------------------
**Version number:**  0.0.1   <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a>
**Framework versions:** 2.0 +   
**Author / maintainer:** [Simon Date](mailto:simon.date@kcl.ac.uk), [contributors](https://github.com/kingsonline/adapt-sideView/graphs/contributors)  
**Accessibility support:** No   
**RTL support:** No  
**Cross-platform coverage:** Chrome, Firefox (ESR + latest version), Edge 12, IE 11, IE10, IE Mobile 11, Safari for iPhone (iOS 8+9), Safari for iPad (iOS 8+9), Safari 8     
