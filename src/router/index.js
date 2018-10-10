import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import About from '@/components/About'
import Dashboards from '@/components/Dashboard/Dashboards'
import Dashboard from '@/components/Dashboard/Dashboard'
import CreateDashboard from '@/components/Dashboard/CreateDashboard'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/dashboards',
      name: 'Dashboards',
      component: Dashboards
    },
    {
      path: '/dashboard/new',
      name: 'CreateDashboard',
      component: CreateDashboard
    },
    {
      path: '/dashboard/:id',
      name: 'Dashboard',
      props: true,
      component: Dashboard
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
