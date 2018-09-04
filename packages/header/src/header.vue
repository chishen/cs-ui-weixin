<template>
  <header class="cs-header" :style="{height}">
    <slot></slot>
  </header>
</template>
<script>
  export default {
    name: 'CsHeader',
    props: {
      height: {
        type: String,
        default: '64px'
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../common.less";
  .cs-header{
    flex: 0 0 auto;
    background: @background;
  }
</style>
