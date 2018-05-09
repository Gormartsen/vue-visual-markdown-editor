
<template src="vue-visual-autocomplete.html"></template>
<script>
module.exports = {
  data: function(){
    return {
      isopen: false,
      autocomplete: '',
      inputElement: false,
      items: [],
    }
  },
  props: ['button', 'mode', 'config'],
  mounted: function(){
    var self = this;
    if (self.button.init) {
      self.button.init(self);
    }
    this.inputElement = this.$el.querySelector('.autocomplete');
    this.inputElement.onkeyup = function(event) {
      if (event.keyCode === 13){
        return self.emitClicked(true);
      }
      if (event.keyCode === 27) {
        return self.emitClicked(false);
      }
      self.button.source(self.inputElement.value, function(newArray){
        self.items.splice(0, self.items.length);
        for (var i in newArray) {
          self.items.push(newArray[i]);
        }
      });
    }
  },
  computed: {
    liveItems: function() {
      return this.items;
    }
  },
  methods: {
    switchOpen: function(){
      this.isopen = !this.isopen;
      var self = this;
      if (this.isopen) {
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
        }, 0);
        this.$emit('marktext');
        setTimeout(function(){
          self.inputElement.focus();
        }, 100);
      } else {
        self.emitClicked(false);
      }
    },
    preview: function(item){
      if (this.button.preview) {
        return this.button.preview(item);
      }
      return item;
    },
    emitClicked: function(clickType){
      var text = this.autocomplete;
      if (this.button.render) {
        text = this.button.render(text, this.mode);
      }
      var button = {
        type: 'autocomplete',
        text: text,
        click: clickType,
      }
      this.$emit('replacetext', button);
      this.autocomplete = '';
      this.isopen = false;
    },
    select: function(event, line) {
      event.preventDefault();
      event.stopPropagation();
      var text = this.autocomplete;
      if (this.button.render) {
        text = this.button.render(line, this.mode);
      }
      var button = {
        type: 'autocomplete',
        text: text,
        click: true,
      }
      this.$emit('replacetext', button);
      this.autocomplete = '';
      this.isopen = false;
    }
  }
}
</script>
