<template>
  <div>
    <vue-visual-markdown :config="config" v-model="text"></vue-visual-markdown>
    Text: {{text}}
    html: <div v-html="html"></div>
  </div>
</template>
<script>
module.exports = {
  data: function() {
    return {
      text: '# test',
      config: global.VueConfig,
      markdown: new global.MarkdownIt()
    }
  },
  computed: {
    html: function(){
      return this.markdown.render(this.text);
    }
  }
}
</script>