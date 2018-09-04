import CsMain from './src/main.vue'

CsMain.install = function (Vue) {
  Vue.component(CsMain.name, CsMain)
}

export default CsMain
