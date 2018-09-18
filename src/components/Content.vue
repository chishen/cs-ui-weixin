<template>
  <div style="background: #fff;height: 100%;">
    <div class="type">
      <div><h1>{{componentName}} {{componentCnName}}</h1><p v-text="componentDes"></p></div>
      <el-button class="customButton" type="primary" @click="isDemo = !isDemo" v-text="isDemo?'查看组件源码':'查看示例代码'"></el-button>
    </div>
    <div style="padding-bottom: 40px;">
      <h2 v-if="!(!isLogin && !fileList.length)" class="title">效果图</h2>
      <div v-if="!isLogin" class="rendering">
        <ul>
          <li v-for="(item, index) in fileList" :key="index">
            <img :src="item.url">
            <p v-text="item.name"></p>
          </li>
        </ul>
      </div>
      <el-upload
        v-if="isLogin"
        action="/api/weixin/uploadImage"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :data="{componentId: componentId}"
        :on-success="handleSuccess"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog
        v-if="isLogin"
        :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        <p v-text="dialogImageName" style="text-align: center;"></p>
      </el-dialog>
    </div>
    <div v-if="isDemo">
      <h2 class="title">使用指南</h2>
      <div v-for="(x, index) in codeDemoList" :key="index">
        <div class="flex"><h6 class="des" v-text="x.title"></h6>
          <div v-if="isLogin && !x.edit"><a @click="editCode(x)">编辑</a></div>
          <div v-if="isLogin && x.edit">
            <a @click="cancelCode(x)" class="red">取消</a>
            <a @click="saveCodeDialog = true;saveCodeItem = x" style="padding-left: 16px;">保存</a>
          </div>
        </div>
        <codemirror v-model="x.code" :options="x.option"></codemirror>
      </div>
    </div>
    <div v-else>
      <h2 class="title">组件源码</h2>
      <div v-for="(x, index) in codeList" :key="index">
        <div class="flex"><h6 class="des" v-text="x.title"></h6>
          <div v-if="isLogin && !x.edit"><a @click="editCode(x)">编辑</a></div>
          <div v-if="isLogin && x.edit">
            <a @click="cancelCode(x)" class="red">取消</a>
            <a @click="saveCodeDialog = true;saveCodeItem = x" style="padding-left: 16px;">保存</a>
          </div>
        </div>
        <codemirror v-model="x.code" :options="x.option"></codemirror>
      </div>
    </div>
    <div class="type" style="padding-bottom: 24px;padding-top: 80px;"><h1 v-if="!(!isLogin && !dataSource.attr.length && !dataSource.event.length)">API</h1></div>
    <cs-api v-if="dataSource.attr.length || isLogin" :isLogin="isLogin" :name="componentName" type="attr"
    :deleteApiDialog="deleteApiDialog" :saveApiDialog="saveApiDialog"
    @hideDeleteApiDialog="hideDeleteApiDialog" @showDeleteApiDialog="showDeleteApiDialog"
    @hideSaveApiDialog="hideSaveApiDialog" @showSaveApiDialog="showSaveApiDialog"
    :dataSource="dataSource.attr" @deleteApi="deleteApi" @saveApi="saveApi" @addApi="addApi"></cs-api>
    <cs-api v-if="dataSource.event.length || isLogin" :isLogin="isLogin" :name="componentName" type="event"
    :deleteApiDialog="deleteApiDialog" :saveApiDialog="saveApiDialog"
    @hideDeleteApiDialog="hideDeleteApiDialog" @showDeleteApiDialog="showDeleteApiDialog"
    @hideSaveApiDialog="hideSaveApiDialog" @showSaveApiDialog="showSaveApiDialog"
    :dataSource="dataSource.event" @deleteApi="deleteApi" @saveApi="saveApi" @addApi="addApi"></cs-api>
    <div v-if="isLogin" class="customDelete"><el-button @click="deleteComponentDialog = true" class="customButton" type="danger">删除组件</el-button></div>
    <el-dialog title="提示" :visible.sync="saveCodeDialog" width="400px" center>
      <span>确定保存该代码</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveCodeDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveCode(saveCodeItem)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="deleteComponentDialog" width="400px" center>
      <span>删除该组件后相应的API数据也会删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteComponentDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteComponent()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import '../plugins/codemirror.js'
import { getDetail, getApi, postEditCode, saveApi, deleteApi, deleteComponent, deleteImage } from '@/api/getData'
export default {
  name: 'Loading',
  components: {
    codemirror
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    headers: {}
  },
  data () {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogImageName: '',
      dialogVisible: false,
      deleteComponentDialog: false, // 删除Component弹窗初始化隐藏
      currentApiItem: {}, // 当前编辑的Api详情
      currentApiIndex: '', // 当前编辑的Api索引
      saveApiDialog: false, // 保存Api弹窗初始化隐藏
      deleteApiDialog: false, // 删除Api弹窗初始化隐藏
      saveCodeDialog: false, // 弹窗默认隐藏
      saveCodeItem: {}, // 保存代码
      codeDemoList: [], // 示例代码列表
      codeList: [], // 组件源码列表
      isDemo: true, // 是否是示例代码
      componentId: '', // 组件Id
      componentName: this.$route.params.name, // 组件名称
      componentCnName: '', // 组件中文名称
      componentDes: '', // 组件概述
      dataSource: {
        attr: [], // 组件属性
        event: [] // 组件事件
      }
    }
  },
  created () {
    let type = this.$route.params.type
    let name = this.$route.params.name
    let data = {
      type,
      name
    }
    this.getApi(data)
  },
  mounted () {
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      let type = to.params.type
      let name = to.params.name
      let data = {
        type,
        name
      }
      this.componentName = name
      this.getApi(data)
    }
  },
  methods: {
    filter (str) {
      if (str == null || str === '') {
        return []
      } else {
        let strArr = str.split(',')
        let list = []
        for (let i = 0; i < strArr.length; i++) {
          if (strArr[i]) {
            list.push({
              name: strArr[i].substr(strArr[i].lastIndexOf('/') + 1),
              url: strArr[i]
            })
          }
        }
        return list
      }
    },
    handleSuccess (res) {
      let list
      if (res.code === '0000') {
        list = res.list
        this.fileList = this.filter(list)
        this.$message({
          message: '图片上传成功',
          type: 'success'
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    async handleRemove (file, fileList) {
      let data = {
        componentId: this.componentId,
        name: file.name
      }
      let res = await deleteImage(data, this.headers)
      let list
      if (res.data.code === '0000') {
        list = res.data.list
        this.fileList = this.filter(list)
        this.$message({
          message: '图片删除成功',
          type: 'success'
        })
      } else {
        this.$message.error(res.msg)
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogImageName = file.name
      this.dialogVisible = true
    },
    async getData (data) {
      const res = await getDetail(data)
      let item = res.data[0]
      let id = item.id
      this.componentCnName = item.cn_name
      this.componentDes = item.des
      this.fileList = this.filter(item.images)
      let option = {
        readOnly: true,
        // indentUnit: 4,
        // mode: 'text/html',
        // styleActiveLine: true, //当前选中行加背景色
        lineNumbers: true,
        cursorBlinkRate: 0,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        // hint.js options
        hintOptions: {
          // 当匹配只有一项的时候是否自动补全
          completeSingle: false
        }, // 快捷键 可提供三种模式 sublime、emacs、vim
        keyMap: 'sublime',
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: 'monokai',
        extraKeys: { 'Ctrl': 'autocomplete' }
      }
      this.codeDemoList = [{
        title: '.json示例代码',
        code: item.demo_json || '无',
        option: {mode: 'application/json', ...option},
        type: 'demo_json',
        edit: false
      }, {
        title: '.wxml示例代码',
        code: item.demo_wxml || '无',
        option: {mode: 'text/html', ...option},
        type: 'demo_wxml',
        edit: false
      }, {
        title: '.js示例代码',
        code: item.demo_js || '无',
        option: {mode: 'text/javascript', ...option},
        type: 'demo_js',
        edit: false
      }, {
        title: '.wxss示例代码',
        code: item.demo_wxss || '无',
        option: {mode: 'text/css', ...option},
        type: 'demo_wxss',
        edit: false
      }]
      this.codeList = [{
        title: '.json代码',
        code: item.code_json || '无',
        option: {mode: 'application/json', ...option},
        type: 'code_json',
        edit: false
      }, {
        title: '.wxml代码',
        code: item.code_wxml || '无',
        option: {mode: 'text/html', ...option},
        type: 'code_wxml',
        edit: false
      }, {
        title: '.js代码',
        code: item.code_js || '无',
        option: {mode: 'text/javascript', ...option},
        type: 'code_js',
        edit: false
      }, {
        title: '.wxss代码',
        code: item.code_wxss || '无',
        option: {mode: 'text/css', ...option},
        type: 'code_wxss',
        edit: false
      }]
      return id
    },
    async getApi (data) {
      const componentId = await this.getData(data)
      this.componentId = componentId
      const res = await getApi({id: componentId})
      const List = res.data
      let attr = List.filter(item => {
        if (item.type === 'attr') {
          item.disabled = true
          return item
        }
      })
      let event = List.filter(item => {
        if (item.type === 'event') {
          item.disabled = true
          return item
        }
      })
      this.dataSource.attr = attr
      this.dataSource.event = event
    },
    // 编辑代码
    editCode (item) {
      item.edit = true
      item.copyCode = item.code
      item.option.readOnly = false
      item.option.styleActiveLine = true
      item.option.cursorBlinkRate = 530
    },
    // 取消代码
    cancelCode (item) {
      item.edit = false
      if (item.copyCode) {
        item.code = item.copyCode
      }
      item.option.readOnly = true
      item.option.styleActiveLine = false
      item.option.cursorBlinkRate = 0
    },
    // 保存代码
    async saveCode (item) {
      let componentId = this.componentId
      let type = item.type
      let code = item.code
      let data = {
        componentId,
        type,
        code
      }
      let res = await postEditCode(data, this.headers)
      this.saveCodeDialog = false
      if (res.data.code === '0000') {
      // item.edit = false
      // item.option.readOnly = true
      // item.option.styleActiveLine = false
      // item.option.cursorBlinkRate = 0
        let type = this.$route.params.type
        let name = this.$route.params.name
        let data = {
          type,
          name
        }
        this.getData(data)
        this.$message({
          message: '代码已更新',
          type: 'success'
        })
      } else {
        this.$message.error(res.data.msg)
      }
    },
    // 删除组件Api
    async deleteApi () {
      let item = this.currentApiItem
      let index = this.currentApiIndex
      let data = {
        id: item.id
      }
      let res = await deleteApi(data, this.headers)
      this.deleteApiDialog = false
      if (res.data.code === '0000') {
        this.dataSource[item.type].splice(index, 1)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } else {
        this.$message.error(res.data.msg)
      }
    },
    // 保存组件Api
    async saveApi () {
      let item = this.currentApiItem
      let isCommon = item.param === item.copyParam && item.des === item.copyDes &&
       item.typeof === item.copyTypeof && item.option === item.copyOption && item.default === item.copyDefault
      if (isCommon) {
        this.saveApiDialog = false
        this.$message.error('数据未修改，请修改数据或点击取消')
      } else {
        let data = {
          id: item.id,
          component_id: item.component_id,
          param: item.param,
          des: item.des,
          typeof: item.typeof,
          option: item.option,
          default: item.default,
          type: item.type
        }
        let paramError = (item.param ? '' : '参数不能为空')
        let desError = (item.des ? '' : '说明不能为空')
        let typeofError = (item.typeof ? '' : '类型不能为空')
        let optionError = (item.option ? '' : '可选值不能为空')
        let defaultError = (item.default ? '' : '默认值不能为空')
        if (!paramError && !desError && !typeofError && !optionError && !defaultError) {
          let res = await saveApi(data, this.headers)
          this.saveApiDialog = false
          if (res.data.code === '0000') {
            let item = this.currentApiItem
            let index = this.currentApiIndex
            this.dataSource[item.type][index].disabled = true
            if (res.data.id) {
              this.dataSource[item.type][index].id = res.data.id
            }
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          this.saveApiDialog = false
          this.$message.error(paramError || desError || typeofError || optionError || defaultError)
        }
      }
    },
    // 新增组件Api
    addApi (type) {
      let item = {
        disabled: false,
        param: '',
        des: '',
        typeof: '',
        option: '',
        default: '',
        copyParam: '',
        copyDes: '',
        copyTypeof: '',
        copyOption: '',
        copyDefault: '',
        type: type,
        component_id: this.componentId
      }
      this.dataSource[type].push(item)
    },
    // 隐藏删除Api弹窗
    hideDeleteApiDialog () {
      this.deleteApiDialog = false
    },
    // 显示删除Api弹窗
    showDeleteApiDialog (item, index) {
      this.deleteApiDialog = true
      this.currentApiItem = item
      this.currentApiIndex = index
    },
    // 隐藏保存Api弹窗
    hideSaveApiDialog () {
      this.saveApiDialog = false
    },
    // 显示保存Api弹窗
    showSaveApiDialog (item, index) {
      this.saveApiDialog = true
      this.currentApiItem = item
      this.currentApiIndex = index
    },
    // 删除组件
    async deleteComponent () {
      let data = {
        id: this.componentId
      }
      let res = await deleteComponent(data, this.headers)
      this.deleteComponentDialog = false
      if (res.data.code === '0000') {
        this.$message({
          message: '组件删除成功',
          type: 'success'
        })
        this.$router.push({
          path: '/' + this.$route.params.type
        })
      } else {
        this.$message.error(res.data.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
@import "../css/common.less";
.rendering{

}
.rendering li{
  display: inline-block;
  width: 230px;
}
.rendering li img{
  width: 220px;
  height: 476px;
  border-radius: 6px;
}
.rendering li p{
  text-align: center;
  width: 220px;
  padding-bottom: 20px;
}
.type{
  display: flex;
  justify-content: space-between;
  .customButton{
    height: 40px;
  }
}
.title{
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 8px;
  margin-top: 8px;
}
.des{
  font-size: 14px;
  color: #333;
}
.flex{
  padding-top: 20px;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  a{
    color: @color;
    cursor: pointer;
    font-size: 14px;
    &.red{
      color: @color_red;
    }
  }
}
.customDelete{
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
</style>
