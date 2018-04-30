'use strict';

var VisualMarkdown = require('./src/vue-visual-markdown/vue-visual-markdown.vue')

if (!global._VVMEPreLoaderdIcons){
  global._VVMEPreLoaderdIcons = {}
}

global._VVMEPreLoaderdIcons.bold = require('@fortawesome/fontawesome-free-solid/faBold.js');
global._VVMEPreLoaderdIcons.heading = require('@fortawesome/fontawesome-free-solid/faHeading.js');
global._VVMEPreLoaderdIcons.italic = require('@fortawesome/fontawesome-free-solid/faItalic.js');
global._VVMEPreLoaderdIcons.link = require('@fortawesome/fontawesome-free-solid/faLink.js');
global._VVMEPreLoaderdIcons.image = require('@fortawesome/fontawesome-free-solid/faImage.js');
global._VVMEPreLoaderdIcons['quote-left'] = require(
  '@fortawesome/fontawesome-free-solid/faQuoteLeft.js');
global._VVMEPreLoaderdIcons.code = require('@fortawesome/fontawesome-free-solid/faCode.js');
global._VVMEPreLoaderdIcons.list = require('@fortawesome/fontawesome-free-solid/faList.js');
global._VVMEPreLoaderdIcons.eye = require('@fortawesome/fontawesome-free-solid/faEye.js');
global._VVMEPreLoaderdIcons['list-ol'] = require('@fortawesome/fontawesome-free-solid/faListOl.js');

VisualMarkdown.components = {
  'vue-visual-autocomplete': require('./src/vue-visual-autocomplete/vue-visual-autocomplete.vue'),
  'vue-visual-dropdown': require('./src/vue-visual-dropdown/vue-visual-dropdown.vue'),
  'vue-visual-inline': require('./src/vue-visual-inline/vue-visual-inline.vue'),
  'vue-visual-input': require('./src/vue-visual-input/vue-visual-input.vue'),
  'vue-visual-wrap': require('./src/vue-visual-wrap/vue-visual-wrap.vue')
}

var FontAwesomeCustom = require('./src/font-awesome-icon/font-awesome-icon.vue');
for (var i in VisualMarkdown.components) {
  if (VisualMarkdown.components[i].components) {
    VisualMarkdown.components[i].components['font-awesome-icon'] = FontAwesomeCustom
  } else {
    VisualMarkdown.components[i].components = {
      'font-awesome-icon': FontAwesomeCustom
    }
  }
}

VisualMarkdown.components['font-awesome-icon'] = FontAwesomeCustom;

var MarkdownEditor = {
  install: function (Vue) {
      if (Vue._visualMarkdownEditor) {
          return;
      }

      Vue._visualMarkdownEditor = true;

      Vue.component('vue-visual-markdown', VisualMarkdown);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MarkdownEditor);
}

module.exports = MarkdownEditor
