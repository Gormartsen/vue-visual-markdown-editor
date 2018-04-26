<template>
  <vue-visual-markdown :config="config" v-model="text"></vue-visual-markdown>
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