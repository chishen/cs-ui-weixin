import CsContainer from './src/container.vue'

CsContainer.install = function (Vue) {
  Vue.component(CsContainer.name, CsContainer)
}

export default CsContainer
