/* eslint-disable gutter-before-blocks */
export default {
  name: 'CsRow',
  componentName: 'CsRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: {
      type: String,
      default: 'flex'
    },
    justify: {
      type: String,
      default: 'flex-start'
    },
    align: {
      type: String,
      default: 'flex-start'
    }
  },

  computed: {
    style () {
      const sty = {}
      this.gutter && (sty.marginRight = sty.marginLeft = `-${this.gutter / 2}px`)
      if (this.type === 'flex') {
        sty.display = 'flex'
        sty.justifyContent = this.justify
        sty.alignItems = this.align
      } else {
        sty.display = this.type
      }
      return sty
    }
  },
  render: function (createElement) {
    return createElement(this.tag, {
      'class': 'cs-row',
      'style': this.style
    }, this.$slots.default)
  }
}
