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
        <v-list-tile 
          v-if="userIsAuthenticated" 
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
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
      <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout

        </v-btn>
    </v-toolbar>
    <v-content>     
            <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {icon: 'supervisor_account', title: 'My Dashboards', link: '/dashboards'},
          {icon: 'room', title: 'New', link: '/dashboard/new'},
          {icon: 'person', title: 'Profile', link: '/profile'}
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,400|Roboto+Condensed:300,400');
  @import 'assets/main.scss'
</style>
