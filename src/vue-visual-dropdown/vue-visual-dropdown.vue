<template src="vue-visual-dropdown.html"></template>
<script>
module.exports = {
  data: function(){
    return {
      isopen: false
    }
  },
  props: ['button', 'config'],
  mounted: function(){
    var self = this;
    if (self.button.init) {
      self.button.init(self);
    }
  },
  methods: {
    toggle: function(){
      console.log('toggle');
      this.isopen = !this.isopen

      if(this.isopen) {
        var self = this;
        var removeClickEvent = function(){
          document.removeEventListener('click', clickEvent)
        }
        var clickEvent = function(event){
          console.log(event.target)
          removeClickEvent();
          self.isopen = false;
        }
        setTimeout(function(){
          console.log('add click')
          document.addEventListener('click', clickEvent)
        },0);
      }
    },
    select: function(event, line) {
      event.preventDefault();
      event.stopPropagation();
      if (!line.handlerText && this.button.handlerText) {
        line.handlerText = this.button.handlerText;
      }
      if (!line.handlerHtml && this.button.handlerHtml) {
        line.handlerHtml = this.button.handlerHtml;
      }
      this.isopen = false;
      this.$emit('clicked', line);
    }
  }
  
}
</script>
