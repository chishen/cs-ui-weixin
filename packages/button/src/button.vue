<template>
  <div>
    <button class="cs-button"
            :class="[{
            'cs-button-click': click}, {
            'cs-button-primary': type === 'primary'}, {
            'cs-button-dashed': type === 'dashed'}, {
            'cs-button-danger': type === 'danger'}, {
            'cs-button-circle': circle}, {
            'cs-button-ghost': ghost}, {
            'cs-button-disabled': disabled}, {
            'cs-button-sm': size === 'small'}, {
            'cs-button-lg': size === 'large'}]"
            :type="type"
            :circle="circle"
            :ghost="ghost"
            :icon="icon"
            :size="size"
            :disabled="disabled"
            @click="handleClick($event)">
      <i class="cs-icon anticon anticon-spin anticon-loading" v-if="loading"></i>
      <i class="cs-icon anticon" :class="'anticon-'+icon" v-if="icon && !loading"></i>
    <slot></slot>
    </button>
  </div>
</template>
<script>
  export default {
    name: 'CsButton',
    data() {
      return {
        click: false
      }
    },
    props: {
      type: {
        type: String,
        default: ''
      },
      circle: {
        type: Boolean,
        default: false
      },
      ghost: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClick($event) {
        if(!$event.target.className.includes('cs-button-click')){
          this.click = true;
          let that = this;
          setTimeout(function () {
            that.click = false;
          }, 400);
          this.$emit('click', $event);
        }
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../common.less";
  .cs-button{
    line-height: 1.5;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid @borderColor;
    white-space: nowrap;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    height: 32px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all .4s;
    transition: all .4s;
    position: relative;
    color: @fontColor;
    background-color: #fff;
    outline: 0;
    &:hover{
      border-color: @color;
      color: @color;
    }
    &.cs-button-primary{
      border-color: @color;
      background-color: @color;
      color: #fff;
      &:hover{
        opacity: 0.8;
      }
    }
    &.cs-button-dashed{
      border-style: dashed;
      &:hover{
        border-color: @color;
        color: @color;
      }
    }
    &.cs-button-danger{
      color: #f5222d;
      background-color: #f5f5f5;
      &:hover{
        background-color: #ff4d4f;
        border-color: #ff4d4f;
        color: #fff;
      }
    }
    &.cs-button-click:after {
      content: "";
      position: absolute;
      top: -1px;
      left: -1px;
      bottom: -1px;
      right: -1px;
      border-radius: inherit;
      border: 0 solid @color;
      opacity: .4;
      -webkit-animation: buttonEffect .4s;
      animation: buttonEffect .4s;
      display: block;
    }
    &.cs-button-danger.cs-button-click:after {
      border-color: #f5222d
    }
    &.cs-button-disabled{
      color: rgba(0,0,0,.25);
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      cursor: not-allowed;
      &:hover{
        color: rgba(0,0,0,.25);
        border-color: #d9d9d9;
        cursor: not-allowed;
      }
    }
    &.cs-button-ghost{
      background-color: transparent;
      color: #fff;
      border-color: #fff;
      &:hover{
        color: @color;
        border-color: @color;
      }
      &.cs-button-primary{
        border-color: @color;
        color: @color;
        &:hover{
          opacity: 0.8;
        }
      }
      &.cs-button-danger{
        color: #f5222d;
        border-color: #f5222d;
        &:hover{
          background-color: transparent;
        }
      }
      &.cs-button-dashed{
        border-style: dashed;
      }
      &.cs-button-disabled{
        color: rgba(0,0,0,.25);
        border-color: #d9d9d9;
        cursor: not-allowed;
        background-color: transparent;
        &:hover{
          color: rgba(0,0,0,.25);
          border-color: #d9d9d9;
          cursor: not-allowed;
        }
      }
    }
    &.cs-button-circle{
      border-radius: 50%;
      padding: 0 8px;
    }
    &.cs-button-sm{
      height: 24px;
      padding: 0 5px;
      font-size: 12px;
    }
    &.cs-button-lg{
      height: 40px;
      padding: 0 11px;
      font-size: 16px;
    }
  }
  @-webkit-keyframes buttonEffect {
    to {
      opacity: 0;
      top: -6px;
      left: -6px;
      bottom: -6px;
      right: -6px;
      border-width: 6px
    }
  }
  @keyframes buttonEffect {
    to {
      opacity: 0;
      top: -6px;
      left: -6px;
      bottom: -6px;
      right: -6px;
      border-width: 6px
    }
  }
</style>
