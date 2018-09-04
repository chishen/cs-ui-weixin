exports.install = function (Vue) {
  Vue.prototype.escapeHTML = function (code) {
    code = '' + code
    return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;').replace(/'/g, '&apos;')
  }
}
