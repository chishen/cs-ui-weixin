<template>
  <div class="container">
    <div class="background">
      <header>
        <ul>
          <!-- <li><router-link :to="{path: '/', query: {index: '123'}}">起步</router-link></li> -->
          <!-- <li><router-link to="/baseComponent/Loading">组件</router-link></li> -->
        </ul>
      </header>
      <div class="vm title">mini program</div>
      <div class="vm button"><router-link to="/workComponent">快速开始</router-link></div>
    </div>
    <div class="content">
      <h1>使用文档</h1>
      <h6>非登录状态</h6>
      <p>1、只可查看组件的代码及对应的Api</p>
      <p>2、可通过点击查看组件源码来切换查看模式</p>
      <h6>登录状态</h6>
      <p>1、可对组件进行新增和删除操作，可对代码进行编辑操作，可对Api进行新增、编辑和删除操作</p>
      <p>2、登录后当前页面会保持登录状态，想要切回非登录状态需重新开页面</p>
      <h6>代码规范</h6>
      <p>1、所有文件代码默认缩进2个空格</p>
      <p>2、json代码和wxml代码统一双引号，js代码统一单引号</p>
      <p>3、基础组件引入时以z开头，业务组件引入时以zy开头，如下：</p>
      <code>"z-loading": "../../components/loading/loading" // 一个Loading基础组件</code>
      <code>"zy-loading": "../../workComponents/loading/loading" // 一个Loading业务组件</code>
      <p style="display: inline-block;">4、新增组件或者编辑、新增Api时所有字段都不能为空，Api字段若无请填</p>
      <code style="margin-left: 0;">—</code>
      <p>5、编辑代码时请逐个编辑完后保存</p>
      <p>6、组件中如用到图片请将图片转成base64格式</p>
      <!-- <h6>后期计划</h6> -->
      <p>1、将上传的组件源码生成对应的组件包上传到npm</p>
      <p>2、新增基础方法和业务方法模块</p>
      <p>3、新增效果图功能，管理员可上传组件示例的效果图</p>
      <p>4、设置权限功能，只有上传组件的人或是其指定的人员能够编辑该组件</p>
      <p>5、查看历史代码提交记录功能，当前代码与历史代码比对功能</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import '../css/common.less';
  .container{
    min-height: 100%;
    position: relative;
    background: #eee;
  }
  .background{
    height: 500px;
    position: relative;
    background: linear-gradient(-45deg, @color, @color_green);
    header{
      height: 64px;
      background: transparent;
      text-align: right;
      padding-left: 24px;
      padding-right: 24px;
      ul{
        li{
          width: 80px;
          height: 100%;
          line-height: 64px;
          text-align: center;
          display: inline-block;
          a{
            text-decoration: none;
            color: #fff;
            font-size: 16px;
            padding-bottom: 8px;
            transition: all 0.4s;
            &:hover{
               color: #000;
               border-bottom: 2px solid #000;
            }
          }
        }
      }
    }
    .title{
      font-size: 54px;
      top: 150px;
    }
    .button{
      top: 240px;
      a{
        display: block;
        .wh(200px, 40px);
        background: @color;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
        text-decoration: none;
        color: #fff;
      }
    }
  }
  .content{
    .wh(1200px, auto);
    .mlmr();
    padding: 30px;
    position: relative;
    z-index: 2;
    top: -100px;
    border-radius: 6px;
    background: #fff;
    h6{
      padding-bottom: 8px;
      padding-top: 16px;
    }
    code{
      background: #f2f4f5;
      padding: .2em .4em;
      border-radius: 3px;
      font-size: .9em;
      border: 1px solid #eee;
      display: inline-block;
      margin-left: 2em;
    }
    p{
      line-height: 1.8;
      text-indent: 2em;
    }
  }
</style>
