import Aside from './aside/index.js'
import Button from './button/index.js'
import ButtonGroup from './button-group/index.js'
import Checkbox from './checkbox/index.js'
import Col from './col/index.js'
import Container from './container/index.js'
import Footer from './footer/index.js'
import Header from './header/index.js'
import Icon from './icon/index.js'
import Input from './input/index.js'
import Main from './main/index.js'
import Radio from './radio/index.js'
import Row from './row/index.js'
import Select from './select/index.js'

const Component = [
  Aside,
  Button,
  ButtonGroup,
  Checkbox,
  Col,
  Container,
  Footer,
  Header,
  Icon,
  Input,
  Main,
  Radio,
  Row,
  Select
]

const install = function (Vue) {
  Component.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const Cs = {
  install,
  Aside,
  Button,
  ButtonGroup,
  Checkbox,
  Col,
  Container,
  Footer,
  Header,
  Icon,
  Input,
  Main,
  Radio,
  Row,
  Select
}

export {
  Aside,
  Button,
  ButtonGroup,
  Checkbox,
  Col,
  Container,
  Footer,
  Header,
  Icon,
  Input,
  Main,
  Radio,
  Row,
  Select
}

export default Cs
