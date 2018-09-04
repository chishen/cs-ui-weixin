<template>
  <cs-container>
    <cs-header class="cs_header">
      <div class="header_div">
        <div class="logo_div"><router-link to="/" style="height: 40px;">mini program</router-link></div>
        <div class="flex">
          <ul>
            <li>
              <router-link :class="{'active':$route.params.type === 'baseComponent'}" :to="'/baseComponent'">基础组件</router-link>
            </li>
            <li>
              <router-link :class="{'active':$route.params.type === 'workComponent'}" :to="'/workComponent'">业务组件</router-link>
            </li>
          </ul>
          <div v-if="isLogin" class="userName" v-text="userName"></div>
          <div v-if="!isLogin" class="userLogo"><img @click="dialogLoginVisible = true;loginForm = {}" src="../assets/user_logo.png" /></div>
        </div>
      </div>
    </cs-header>
    <el-dialog title="管理员登录" :visible.sync="dialogLoginVisible" width="400px" center>
      <el-form :model="loginForm">
        <el-form-item label="用户：" :label-width="formLabelWidth">
          <el-input v-model="loginForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth" style="margin-bottom: 0;">
          <el-input v-model="loginForm.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLoginVisible = false">取 消</el-button>
        <el-button type="primary" @click="login(loginForm)">确 定</el-button>
      </div>
    </el-dialog>
    <cs-container class="cs_container">
      <cs-aside class="cs_aside" width="240px">
        <ul>
          <li
            v-for="(item, index) in showList"
            :key="index"
            :class="{'active': $route.params.name === item.en_name}"
          >
            <router-link
              :to="'/' + $route.params.type + '/' + item.en_name"
              v-text="item.en_name + ' ' + item.cn_name"
            ></router-link>
          </li>
        </ul>
        <el-button v-if="isLogin" @click="dialogAddComponentVisible = true;componentForm = {}" class="customButton" type="primary">新增组件</el-button>
      </cs-aside>
      <el-dialog title="新增组件" :visible.sync="dialogAddComponentVisible" width="400px" center>
        <el-form :model="componentForm">
          <el-form-item label="英文：" :label-width="formLabelWidth">
            <el-input v-model="componentForm.enName" auto-complete="off" placeholder="例如：Loading"></el-input>
          </el-form-item>
          <el-form-item label="中文：" :label-width="formLabelWidth">
            <el-input v-model="componentForm.cnName" auto-complete="off" placeholder="例如：加载"></el-input>
          </el-form-item>
          <el-form-item label="类别：" :label-width="formLabelWidth">
            <el-select v-model="componentForm.type" placeholder="请选择类别" style="width: 100%;">
              <el-option label="基础组件" value="baseComponent"></el-option>
              <el-option label="业务组件" value="workComponent"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="概述：" :label-width="formLabelWidth">
            <el-input v-model="componentForm.des" auto-complete="off" placeholder="请输入概述" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-form>
        <el-alert
          title="以上几项创建之后不可修改"
          type="warning"
          :closable="false"
          show-icon>
        </el-alert>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddComponentVisible = false">取 消</el-button>
          <el-button type="primary" @click="addComponent(componentForm)">确 定</el-button>
        </div>
      </el-dialog>
      <cs-main class="cs_main">
        <router-view :isLogin="isLogin" :headers="headers"/>
      </cs-main>
    </cs-container>
    <!--<cs-footer></cs-footer>-->
  </cs-container>
</template>
<script>
import { init, getList, postLogin, postAddComponent } from '@/api/getData'
export default {
  name: 'Components',
  data () {
    return {
      headers: {
        'x-csrf-token': ''
      }, // 获取token
      isLogin: sessionStorage.isLogin === '1', // 是否登录
      userName: sessionStorage.userName || '', // 用户名
      List: [], // 左边列表
      showList: [], // 左边显示列表
      dialogAddComponentVisible: false, // 新增组件弹窗隐藏
      dialogLoginVisible: false, // 登录弹窗隐藏
      formLabelWidth: '60px', // 表单宽度
      loginForm: {
        userName: '', // 用户名
        password: '' // 密码
      },
      componentForm: {
        enName: '', // 英文名
        cnName: '', // 中文名
        type: '', // 类别
        des: '' // 概述
      }
    }
  },
  created () {
    this.init()
    this.getList()
  },
  watch: {
    '$route' (to, from) {
      this.getList()
    }
  },
  methods: {
    // 初始化获取token
    async init () {
      const res = await init()
      this.headers['x-csrf-token'] = res.data
    },
    // 获取组件列表
    async getList () {
      const res = await getList()
      const List = res.data
      this.List = List
      const type = this.$route.params.type
      this.showList = List.filter(item => {
        if (item.type === type) {
          return item
        }
      })
      let name = this.$route.params.name
      if (!name && this.showList.length) {
        this.$router.push({
          path: '/' + type + '/' + this.showList[0].en_name
        })
      }
    },
    async login (form) {
      let data = {
        name: form.userName,
        password: form.password
      }
      let nameError = (data.name ? '' : '用户不能为空')
      let passwordError = (data.password ? '' : '密码不能为空')
      if (!nameError && !passwordError) {
        const res = await postLogin(data, this.headers)
        if (res.data.code === '0000') {
          this.dialogLoginVisible = false
          sessionStorage.isLogin = '1'
          sessionStorage.userName = res.data.userName
          this.userName = res.data.userName
          this.isLogin = true
          this.$message({
            message: '登录成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.msg)
        }
      } else {
        this.$message.error(nameError || passwordError)
      }
    },
    async addComponent (form) {
      let data = {
        cn_name: form.cnName,
        en_name: form.enName,
        type: form.type,
        des: form.des
      }
      let cnNameError = (form.cnName ? '' : '英文名不能为空')
      let enNameError = (form.enName ? '' : '中文名不能为空')
      let typeError = (form.type ? '' : '请选择类别')
      let desError = (form.des ? '' : '概述不能为空')
      if (!cnNameError && !enNameError && !typeError && !desError) {
        const res = await postAddComponent(data, this.headers)
        if (res.data.code === '0000') {
          this.dialogAddComponentVisible = false
          this.getList()
          this.$message({
            message: '新增组件成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.msg)
        }
      } else {
        this.$message.error(cnNameError || enNameError || typeError || desError)
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import '../css/common.less';
  .cs_header{
    background: #fff !important;
    transition: all .4s;
    border-bottom: 1px solid #eee;
    position: fixed;
    z-index: 9;
    width: 100%;
    .header_div{
      display: flex;
      align-items: center;
      .flex{
        display: flex;
        height: 100%;
        width: calc(100% - 240px);
        justify-content: space-between;
      }
      .userName{
        line-height: 64px;
        color: @color_text;
      }
      .userLogo{
        height: 32px;
        width: 32px;
        align-self: center;
        cursor: pointer;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .logo_div{
        width: 240px;
        display: flex;
        a{
          text-decoration: none;
          font-size: 30px;
          color: #fff;
          padding: 0 16px;
          border-radius: 6px;
          background: linear-gradient(-45deg, @color, @color_green);
        }
      }
      .wh(1200px, 100%);
      .mlmr;
      ul{
        height: 100%;
        display: flex;
        li{
          .wh(100px, 100%);
          text-align: left;
          a{
            color: @color_text;
            cursor: pointer;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            &.active{
              color: @color;
              box-shadow: 0 -2px 0 @color inset;
            }
          }
        }
      }
    }
  }
  #app .cs_container{
    width: 1200px;
    padding-top: 64px;
    .mlmr;
    .cs_aside{
      width: 240px;
      background: #fff;
      border-right: 1px solid #eee;
      position: fixed;
      z-index: 9;
      height: calc(100% - 64px);
      transition: all .4s;
      .customButton{
        height: 36px;
        width: 160px;
        line-height: 36px;
        padding: 0;
        margin-left: 40px;
        margin-top: 16px;
      }
      ul{
        li{
          display: block;
          height: 40px;
          line-height: 40px;
          margin-top: 4px;
          margin-bottom: 8px;
          padding-left: 40px;
          padding-right: 16px;
          font-size: 14px;
          &.active{
             background-color: @color_1;
             border-right: 3px solid @color;
             a{
               color: @color;
             }
           }
          a{
            display: block;
            text-decoration: none;
            color: #333;
            &:hover{
               color: @color;
             }
          }
        }
      }
    }
  .cs_main{
    background: #fff;
    width: 960px;
    position: relative;
    left: 240px;
    flex: none;
  }
  }
  @media screen and (min-width: 1600px) {
    .cs_header{
      .header_div{
        width: 1600px;
      }
    }
    #app .cs_container{
      width: 1600px;
      .cs_main{
        width: 1360px;
      }
    }
  }
</style>
