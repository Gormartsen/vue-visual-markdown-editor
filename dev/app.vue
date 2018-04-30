<template>
  <div>
    <vue-visual-markdown :config="config" v-model="text"></vue-visual-markdown>
    Text: {{text}}
  </div>
</template>
<script>
module.exports = {
  data: function() {
    return {
      text: '#test',
      config: global.VueConfig,
    }
  }
}
</script>