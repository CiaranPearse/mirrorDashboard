<template>
	<v-container>
      <v-layout v-for="dashboard in dashboards" 
          :key="dashboard.id" 
          class="mb-2">
        <v-flex xs12>
          <v-card>
            <v-img
              :src="dashboard.imageUrl"
              aspect-ratio="2.75"
              height="200px" left
            ></v-img>

            <v-card-title primary-title right>
              <div>
                <h3 class="headline mb-0 mb5">{{ dashboard.dashTitle }}</h3>
                <p><strong>Device ID:</strong> {{ dashboard.deviceId}}
                <p>{{ dashboard.location }} <br>Created on: {{ dashboard.created | date }}<br>Updated on: {{ dashboard.updated | date }}<br><strong>Belongs to:</strong> {{ dashboard.creatorId}}</p>
              </div>
            </v-card-title>

            <v-card-actions>
                <v-btn flat :to="'/dashboard/' + dashboard.id">
                <v-icon left>view_compact</v-icon>View Dashboard
              </v-btn>
              <v-btn flat :to="'/dashboard/' + dashboard.id">
                <v-icon left>edit</v-icon> Edit Dashboard
              </v-btn>
              <v-btn flat>
                <v-icon left>screen_share</v-icon> Change Screen
              </v-btn>
              <v-btn flat to="/dashboard/new">
                <v-icon left>add_circle_outline</v-icon> Add new Dashboard
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>


    </v-container>
</template>

<script>
  export default {
    computed: {
      dashboards () {
        return this.$store.getters.loadedDashboards
      }
    }
  }
</script>