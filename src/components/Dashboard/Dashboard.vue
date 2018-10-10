<template>
	<v-container fluid fill-height>
		<v-layout row wrap>
            <v-flex xs6>
            	<div>
								<h2>{{ dashboard.title }}</h2>
								<div>{{ dashboard.location }}</div>
                <div>{{ dashboard.createdOn }}</div>
							</div>
            </v-flex>
            <v-flex xs6>
            	<v-img
          :src="dashboard.imageUrl"
          aspect-ratio="2.75"
        ></v-img>
            </v-flex>
            <v-flex xs2 style="border: 1px solid white;">
            	LEFT
            </v-flex>
            <v-flex xs8 style="border: 1px solid white;">
            	CENTER
            </v-flex>
            <v-flex xs2 style="border: 1px solid white;">
            	RIGHT
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
  export default {
    props: ['id'],
    computed: {
      dashboard () {
        return this.$store.getters.loadedDashboard(this.id)
      }
    }
  }
</script>