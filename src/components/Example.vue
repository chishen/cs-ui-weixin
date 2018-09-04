<template>
  <div class="cs-example">
    <cs-row>
      <cs-col class="cs_col" :span="24">
        <div class="showCode">
          <h2 v-text="title"></h2>
          <span @click="showCode" v-text="show_code?'隐藏代码':'显示代码'"></span></div>
        <div v-highlight>
          <div class="code" :class="{'code_active': show_code}"><pre><code v-html="code" :class="type"></code></pre></div>
        </div>
      </cs-col>
    </cs-row>
  </div>
</template>
<script>
import hljs from 'highlight.js'
export default {
  name: 'Example',
  props: {
    title: { // 标题
      type: String,
      required: true
    },
    des: String, // 描述
    code: { // 代码块
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show_code: true
    }
  },
  // mounted() {
  //   hljs.initHighlightingOnLoad()
  // },
  // watch: {
  //   code () {
  //     this.$nextTick(() => {
  //       setTimeout(() => {
  //         hljs.initHighlighting()
  //       });
  //     });
  //   }
  // },
  methods: {
    showCode: function () {
      this.show_code = !this.show_code
    },
  },
  updated () {
    console.log('update')
      hljs.initHighlightingOnLoad()
      hljs.initHighlighting()
  },
}
</script>
<style lang="less" rel="stylesheet/less">
  @import '../css/common.less';
  .cs-example{
  h2{
    color: @color_text;
    font-size: 14px;
  }
  .cs-des{
  code{
    margin: 0 1px;
    background: #f2f4f5;
    padding: .2em .4em;
    border-radius: 3px;
    font-size: .9em;
    border: 1px solid #eee;
    font-family: Consolas,Menlo,Courier,monospace;
  }
  }
  .cs_col{
    border-radius: 4px;
    transition: .4s;
    margin-top: 8px;
    margin-bottom: 40px;
  }
  .showCode{
    color: @color_text;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  span:hover{
    color: @color;
    cursor: pointer;
  }
  }
  .code .hljs{
    height: 0;
    padding: 0 .5em;
    transition: all .4s;
    border-radius: 4px;
    overflow-y: hidden;
  }
  .code.code_active{
  .hljs{
    padding: .5em;
    height: auto;
    // padding-top: 8px;
    // padding-bottom: 8px;
    margin-top: 8px;
  }
  }
  }
</style>
