<template>
  <section class="cs-container" :class="{'column': isColumn}">
    <slot></slot>
  </section>
</template>
<script>
  export default {
    name: 'CsContainer',
    props: {
      direction: String
    },
    computed: {
      isColumn(){
        if(this.direction === 'row'){
          return false
        }else if(this.direction === 'column'){
          return true
        }
        if(this.$slots && this.$slots.default){
          return this.$slots.default.some(VNode => {
            const tag = VNode.componentOptions && VNode.componentOptions.tag;
            return tag === 'cs-header' || tag === 'cs-footer';
          })
        }else{
          return false
        }
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../common.less";
  .cs-container{
    display: flex;
    flex: 1;
    flex-basis: auto;
    height: 100%;
    width: 100%;
  }
</style>
