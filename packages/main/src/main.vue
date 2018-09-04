<template>
  <section class="cs-main">
    <slot></slot>
  </section>
</template>
<script>
  export default {
    name: 'CsMain',
  };
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../common.less";
  .cs-main{
    flex: 1 0 auto;
    padding: 20px;
  }
</style>
