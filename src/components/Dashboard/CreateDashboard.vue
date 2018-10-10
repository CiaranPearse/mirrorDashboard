<template>
	<div>
  <v-container>
  	<v-layout row>
  		<v-flex xs12>
  			<h4>Create a new Dashboard</h4>
  		</v-flex>
  	</v-layout>
    <v-layout row>
    	<v-flex xs12>
    		<form @submit.prevent="onCreateDashboard">
    			<v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                name="deviceId"
                label="Enter your Device ID"
                id="deviceId"
                v-model="deviceId"
                :messages="['You can find this on a sticker on your device.']"
                required
                >
              </v-text-field>
            </v-flex>
    			</v-layout>
    			<v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                name="Dashboard Location"
                label="Where is your device located"
                id="deviceLocation"
                v-model="deviceLocation"
                required
                >
              </v-text-field>
            </v-flex>
    			</v-layout>
    			<v-layout row wrap>
            <v-flex xs12>
              <v-container fluid fill-height>
						    <v-layout row>
						    	<v-flex xs12>
						    	  <h3>Design your Dashboard</h3>
						    	  	<v-layout row>
						    	  		<v-flex xs3 class="dashedBorder leftBlock">
						    	  			<div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchLeft1"
													      v-model="slotLeft1"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchLeft2"
													      v-model="slotLeft2"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchLeft3"
													      v-model="slotLeft3"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  			</div>
						    	  		</v-flex>
						    	  		<v-flex xs8 class="dashedBorder centerBlock">
						    	  			<div>
						    	  				<div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchCenter1"
													      v-model="slotCenter1"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchCenter2"
													      v-model="slotCenter2"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchCenter3"
													      v-model="slotCenter3"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  			</div>
						    	  			</div>
						    	  		</v-flex>
						    	  		<v-flex xs3 class="dashedBorder rightBlock">
						    	  			<div>
						    	  				<div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchRight1"
													      v-model="slotRight1"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchRight2"
													      v-model="slotRight2"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchRight3"
													      v-model="slotRight3"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  			</div>
						    	  			</div>
						    	  		</v-flex>
						    	  	</v-layout>
						    	  	<v-layout row>
						    	  		<v-flex xs12 class="dashedBorder footerBlock">
						    	  			<div>
						    	  				<div class="innerDotted">
						    	  					<v-autocomplete
													      :loading="loading"
													      :items="items"
													      :search-input.sync="searchFooter"
													      v-model="slotFooter"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
													      solo-inverted
													    ></v-autocomplete>
						    	  				</div>
						    	  			</div>
						    	  		</v-flex>
						    	  	</v-layout>
						      </v-flex>
						    </v-layout>
						  </v-container>
            </v-flex>
    			</v-layout>
    			<v-layout row>
    				<v-flex xs3 offset-xs9>
    					<v-btn :disabled="!formIsValid" type="submit">Create Dashboard</v-btn>
    				</v-flex>
    			</v-layout>
    		</form>
    	</v-flex>
    </v-layout>
    </v-container>
    <v-container fluid fill-height>
    <v-layout row>
    	<v-flex xs12>
    	  <p>PREVIEW</p>
    	  	<v-layout row>
    	  		<v-flex xs3 class="dashedBorder leftBlock">
    	  			<div>
    	  				<div class="innerDotted">{{ this.searchLeft1 }}</div>
    	  				<div class="innerDotted">{{ this.searchLeft2 }}</div>
    	  				<div class="innerDotted">{{ this.searchLeft3 }}</div>
    	  			</div>
    	  		</v-flex>
    	  		<v-flex xs8 class="dashedBorder centerBlock">
    	  			<div>
    	  				<div class="innerDotted">{{ this.searchCenter1 }}</div>
    	  				<div class="innerDotted">{{ this.searchCenter2 }}</div>
    	  				<div class="innerDotted">{{ this.searchCenter3 }}</div>
    	  			</div>
    	  		</v-flex>
    	  		<v-flex xs3 class="dashedBorder rightBlock">
    	  			<div>
    	  				<div class="innerDotted">{{ this.searchRight1 }}</div>
    	  				<div class="innerDotted">{{ this.searchRight2 }}</div>
    	  				<div class="innerDotted">{{ this.searchRight3 }}</div>
    	  			</div>
    	  		</v-flex>
    	  	</v-layout>
    	  	<v-layout row>
    	  		<v-flex xs12 class="dashedBorder footerBlock">
    	  			<div>
    	  				<div class="innerDotted">{{ this.searchFooter }}</div>
    	  			</div>
    	  		</v-flex>
    	  	</v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>


<script>
export default {
  data () {
    return {
      loading: false,
      items: [],
      deviceId: '',
      location: '',
      searchLeft1: null,
      searchLeft2: null,
      searchLeft3: null,
      searchCenter1: null,
      searchCenter2: null,
      searchCenter3: null,
      searchRight1: null,
      searchRight2: null,
      searchRight3: null,
      searchFooter: null,
      slotLeft1: null,
      slotLeft2: null,
      slotLeft3: null,
      slotCenter1: null,
      slotCenter2: null,
      slotCenter3: null,
      slotRight1: null,
      slotRight2: null,
      slotRight3: null,
      slotFooter: null,
      widgets: [
        'Clock',
        'Weather 1 Day',
        'Weather 3 Day',
        'Weather 5 Day',
        'Ireland: Dublin Bus',
        'Ireland: News Headlines',
        'Quotes: Beer',
        'Quotes: Inspiration',
        'Stocks: NYSE',
        'Stocks: Crypto'
      ]
    }
  },
  watch: {
    searchLeft1 (val) {
      console.log(val)
      val && val !== this.select && this.querySelections(val)
    },
    searchLeft2 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchLeft3 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchCenter1 (val) {
      console.log(val)
      val && val !== this.select && this.querySelections(val)
    },
    searchCenter2 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchCenter3 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchRight1 (val) {
      console.log(val)
      val && val !== this.select && this.querySelections(val)
    },
    searchRight2 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchRight3 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchFooter (val) {
      val && val !== this.select && this.querySelections(val)
    }
  },
  computed: {
    formIsValid () {
      return this.deviceId !== '' && this.deviceLocation !== ''
    }
  },
  methods: {
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.widgets.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
    onCreateDashboard () {
      if (!this.formIsValid) {
        return
      }
      const dashboardData = {
        deviceId: this.deviceId,
        deviceLocation: this.deviceLocation,
        slotLeft1: this.slotLeft1,
        slotLeft2: this.slotLeft2,
        slotLeft3: this.slotLeft3,
        slotCenter1: this.slotCenter1,
        slotCenter2: this.slotCenter2,
        slotCenter3: this.slotCenter3,
        slotRight1: this.slotRight1,
        slotRight2: this.slotRight2,
        slotRight3: this.slotRight3,
        slotFooter: this.slotFooter,
        createdOn: new Date()
      }
      console.log(dashboardData)
      this.$store.dispatch('createDashboard', dashboardData)
      this.$router.push('/dashboards')
    }
  }
}
</script>




<style>
  .dashedBorder {
  	border: 1px #fff dashed;
  }
  .leftBlock {
  	text-align: center;
  }
  .centerBlock {
  	text-align: center;
  }
  .rightBlock {
  	text-align: center;
  }
  .footerBlock {
  	text-align: center;
  }
  .innerDotted {
  	border: 1px gray dotted;
  	margin: 4px;
  	padding: 10px;
  }
</style>