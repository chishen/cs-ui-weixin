<template>
  <footer class="cs-footer" :style="{height}">
    <slot></slot>
  </footer>
</template>
<script>
  export default {
    name: 'CsFooter',
    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../common.less";
  .cs-footer{
    flex: 0 0 auto;
    background: @background;
  }
</style>
