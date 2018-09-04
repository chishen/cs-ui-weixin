/* eslint-disable space-before-blocks */
export default {
  name: 'CsCol',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    }
  },

  computed: {
    gutter () {
      let parent = this.$parent
      while (parent && parent.$options && parent.$options._componentTag && parent.$options._componentTag !== 'cs-row') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    }
  },
  render: function (createElement) {
    let style = {}
    let className = []
    if (this.gutter){
      style.paddingLeft = style.paddingRight = `${this.gutter / 2}px`
    }
    className.push(`cs-col-${this.span}`)
    className.push(`cs-col-offset-${this.offset}`)
    return createElement(this.tag, {
      'class': ['cs-col', ...className],
      'style': style
    }, this.$slots.default)
  }
}
