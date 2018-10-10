<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list dense>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          router
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed app class="blue-grey darken-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          MirrorDash
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn 
          flat 
          v-for="item in menuItems" 
          :key="item.title"
          router
          :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon> {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>     
            <router-view></router-view>
    </v-content>
    <v-footer app>
      <p class="text-center">&copy; 2018 illmagination. All rights reserved.</p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      menuItems: [
        {icon: 'home', title: 'Home', link: '/'},
        {icon: 'widgets', title: 'Products', link: '/products'},
        {icon: 'remove_from_queue', title: 'Dashboards', link: '/dashboards'},
        {icon: 'face', title: 'About', link: '/about'},
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign in', link: 'signin'}
      ]
    }
  },
  methods: {
    onLoadDashboard (id) {
      this.$router.push('/dashboard/' + id)
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/main.scss'
</style>
