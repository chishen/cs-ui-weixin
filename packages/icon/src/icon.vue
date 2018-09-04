<template>
  <i class="cs-icon anticon" :class="'anticon-' + type"></i>
</template>

<script>
  export default {
    name: 'CsIcon',
    props: {
      type: String
    }
  };
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../common.less";
</style>
