<template>
  <aside class="cs-aside" :style="{width}">
    <slot></slot>
  </aside>
</template>
<script>
  export default {
    name: 'CsAside',
    props: {
      width: {
        type: String,
        default: '200px'
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../common.less";
  .cs-aside{
    flex: 0 0 auto;
    background: @background;
  }
</style>
