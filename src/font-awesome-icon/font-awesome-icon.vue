<template>
  <svg
    v-if="isSvg"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    :viewBox="viewBox"
    class="fa-icon">
    <path :d="svgData[4]" />
  </svg>
</template>
<style scoped>
.fa-icon {
  width: 1em;
  height: 1em;
}
</style>
<script>

module.exports = {
  data: function(){
    return {
      isSvg: false,
      svgData: false,
    };
  },
  props: ['icon'],
  created: function(){
    var icon = _VVME_preLoaderdIcons[this.icon];
    if(icon) {
      if(icon.icon) {
        this.svgData = icon.icon;
        this.isSvg = true;
      }
    }
  },
  computed: {
    viewBox: function(){
      return '0 0 ' + this.svgData[0] + ' ' + this.svgData[1];
    },
  }
}
</script>
