'use strict';

var VisualMarkdown = require('./src/vue-visual-markdown/vue-visual-markdown.vue')

global.fontawesome = require('@fortawesome/fontawesome');
fontawesome.library.add(require('@fortawesome/fontawesome-free-solid/faBold.js'));
fontawesome.library.add(require('@fortawesome/fontawesome-free-solid/faHeading.js'));


VisualMarkdown.components = {
  'vue-visual-autocomplete': require('./src/vue-visual-autocomplete/vue-visual-autocomplete.vue'),
  'vue-visual-dropdown': require('./src/vue-visual-dropdown/vue-visual-dropdown.vue'),
  'vue-visual-inline': require('./src/vue-visual-inline/vue-visual-inline.vue'),
  'vue-visual-input': require('./src/vue-visual-input/vue-visual-input.vue'),
  'vue-visual-wrap': require('./src/vue-visual-wrap/vue-visual-wrap.vue'),
}

var MarkdownEditor = {
  install: function (Vue) {
      if (Vue._visual_markdown_editor) {
          return;
      }

      Vue._visual_markdown_editor = true;

      Vue.component('vue-visual-markdown', VisualMarkdown);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MarkdownEditor);
}

module.exports = MarkdownEditor
