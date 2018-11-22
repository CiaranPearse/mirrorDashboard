import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import About from '@/components/About'
import Profile from '@/components/User/Profile'
import Dashboards from '@/components/Dashboard/Dashboards'
import Dashboard from '@/components/Dashboard/Dashboard'
import DashboardView from '@/components/Dashboard/View'
import Wizzard from '@/components/Dashboard/Wizzard'
import CreateDashboard from '@/components/Dashboard/CreateDashboard'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import AuthGuard from './auth-guard'

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
      component: CreateDashboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/dashboard/:id',
      name: 'Dashboard',
      props: true,
      component: Dashboard
    },
    {
      path: '/view/:id',
      name: 'DashboardView',
      props: true,
      component: DashboardView
    },
    {
      path: '/wizzard/:id',
      name: 'Wizzard',
      props: true,
      component: Wizzard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
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
