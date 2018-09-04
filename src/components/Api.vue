<template>
  <div class="cs-api">
    <h2>{{name}} {{type === 'attr' ? '属性': '事件'}}</h2>
    <cs-row class="table_row">
      <cs-col :span="24">
        <table>
          <thead>
          <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>可选值</th>
            <th>默认值</th>
            <th v-if="isLogin">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, index) in dataSource" :key="index">
            <td v-if="!x.disabled"><el-input v-model="x.param" :disabled="x.disabled" type="textarea" :rows="2"></el-input></td>
            <td v-if="!x.disabled"><el-input v-model="x.des" :disabled="x.disabled" type="textarea" :rows="2"></el-input></td>
            <td v-if="!x.disabled"><el-input v-model="x.typeof" :disabled="x.disabled" type="textarea" :rows="2"></el-input></td>
            <td v-if="!x.disabled"><el-input v-model="x.option" :disabled="x.disabled" type="textarea" :rows="2"></el-input></td>
            <td v-if="!x.disabled"><el-input v-model="x.default" :disabled="x.disabled" type="textarea" :rows="2"></el-input></td>
            <td v-if="x.disabled" v-text="x.param" class="disabled"></td>
            <td v-if="x.disabled" v-text="x.des" class="disabled"></td>
            <td v-if="x.disabled" v-text="x.typeof" class="disabled"></td>
            <td v-if="x.disabled" v-text="x.option" class="disabled"></td>
            <td v-if="x.disabled" v-text="x.default" class="disabled"></td>
            <td v-if="isLogin" class="operating">
              <a v-if="x.disabled" @click="editApi(x)">编辑</a>
              <a v-if="x.disabled" @click="showDeleteApiDialog(x, index)" class="red">删除</a>
              <a v-if="!x.disabled" @click="showSaveApiDialog(x, index)">保存</a>
              <a v-if="!x.disabled" @click="cancelApi(x)" class="red">取消</a>
            </td>
          </tr>
          <tr v-if="isLogin">
            <td @click="addApi(type)" colspan="6" class="add">+新增</td>
          </tr>
          </tbody>
        </table>
      </cs-col>
    </cs-row>
    <el-dialog title="提示" :visible="saveApiDialog" width="400px" center @close="hideSaveApiDialog()">
      <span>确定保存该条数据</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideSaveApiDialog()">取 消</el-button>
        <el-button type="primary" @click="saveApi()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="deleteApiDialog" width="400px" center @close="hideDeleteApiDialog()">
      <span>确定删除该条数据</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDeleteApiDialog()">取 消</el-button>
        <el-button type="primary" @click="deleteApi()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Api',
  props: {
    dataSource: {
      type: Array,
      default: function () {
        return [{
          disabled: true,
          param: '—',
          des: '—',
          typeof: '—',
          option: '—',
          default: '—'
        }]
      }
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    saveApiDialog: {
      type: Boolean,
      default: false
    },
    deleteApiDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    editApi: function (item) {
      item.disabled = false
      item.copyParam = item.param
      item.copyDes = item.des
      item.copyTypeof = item.typeof
      item.copyOption = item.option
      item.copyDefault = item.default
    },
    cancelApi: function (item) {
      item.disabled = true
      item.param = item.copyParam
      item.des = item.copyDes
      item.typeof = item.copyTypeof
      item.option = item.copyOption
      item.default = item.copyDefault
    },
    deleteApi: function (index) {
      this.$emit('deleteApi', index)
    },
    saveApi: function () {
      this.$emit('saveApi')
    },
    addApi: function (type) {
      this.$emit('addApi', type)
    },
    hideDeleteApiDialog: function () {
      this.$emit('hideDeleteApiDialog')
    },
    showDeleteApiDialog: function (item, index) {
      this.$emit('showDeleteApiDialog', item, index)
    },
    hideSaveApiDialog: function () {
      this.$emit('hideSaveApiDialog')
    },
    showSaveApiDialog: function (item, index) {
      this.$emit('showSaveApiDialog', item, index)
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import '../css/common.less';
  .cs-api{
  h2{
    font-size: 22px;
    font-weight: normal;
    margin-bottom: 8px;
    margin-top: 8px;
  }
  .table_row{
  table{
    /*table-layout:fixed;*/
    width: 100%;
    margin-bottom: 40px;
  tr{
  th{
    border: 1px solid @color_border;
    padding: 16px 24px;
    text-align: left;
    color: #5c6b77;
    background: rgba(0,0,0,.02);
    font-weight: normal;
    font-size: 14px;
    white-space: nowrap;
  }
  td{
    border: 1px solid @color_border;
    margin: 0;
    text-align: left;
    color: @color_text;
    font-weight: normal;
    font-size: 14px;
    box-sizing: border-box;
    .el-textarea__inner{
      border-radius: 0;
    }
    &.disabled{
      padding: 16px 24px;
    }
    &.add{
      padding: 8px;
      text-align: center;
      color: @color;
      cursor: pointer;
    }
    input{
      padding: 16px 8px;
      box-sizing: border-box;
      margin: 0;
      outline: none;
      // outline-color: @color;
      width: 100%;
      height: 100%;
      border: 0px solid @color_border;
    }
    &.operating{
      padding-left: 8px;
      padding-right: 8px;
      a{
        cursor: pointer;
        color: @color;
        &.red{
          padding-left: 16px;
          color: @color_red;
        }
      }
    }
  }
  }
  }
  }
  }
</style>
