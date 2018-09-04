import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Components from '@/components/Components'
import Content from '@/components/Content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/:type',
      name: 'Components',
      component: Components,
      children: [
        {
          path: '/:type/:name',
          name: 'Content',
          component: Content
        }
      ]
    }
  ]
})
