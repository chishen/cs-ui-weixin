<template>
  <div class="cs-button-group">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'CsButtonGroup'
  };
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../common.less";
  .cs-button-group{
    position: relative;
    &::after{
      content: '';
      display: block;
      clear: both;
    }
    .cs-button{
      float: left;
      border-radius: 0;
      position: relative;
      z-index: 1;
      margin-left: -1px;
      &:hover{
        z-index: 2;
      }
      &.cs-button-primary{
        background: @color;
        border-left-color: #40a9ff;
      }
    }
    & div:first-of-type .cs-button{
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      margin-left: 0;
    }
    & div:last-of-type .cs-button{
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
</style>
