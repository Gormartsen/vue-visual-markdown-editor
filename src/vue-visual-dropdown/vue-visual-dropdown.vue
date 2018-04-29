<template src="vue-visual-dropdown.html"></template>
<script>
module.exports = {
  data: function(){
    return {
      isopen: false,
    }
  },
  props: ['button'],
  mounted: function(){
    var self = this;
    if(self.button.init) {
      self.button.init(self);
    }
  },
  methods: {
    select: function(event, line) {
      event.preventDefault();
      event.stopPropagation();
      if(!line.handlerText && this.button.handlerText) {
        line.handlerText = this.button.handlerText;
      }
      if(!line.handlerHtml && this.button.handlerHtml) {
        line.handlerHtml = this.button.handlerHtml;
      }
      this.isopen = false;
      this.$emit('clicked', line);
    }
  }
  
}
</script>
