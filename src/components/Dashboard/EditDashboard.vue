<template>
	<div>
  <v-container>
  	<v-layout row>
  		<v-flex xs12>
  			<h4>Edit an esisting Dashboard</h4>
  		</v-flex>
  	</v-layout>
    <v-layout row>
    	<v-flex xs12>
    		<form @submit.prevent="onCreateDashboard">
    			<v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                name="dashTitle"
                label="Name this Dashboard"
                id="dashTitle"
                v-model="dashTitle"
                :messages="['Give it a name so you know what it\'s for']"
                required
                >
              </v-text-field>
            </v-flex>
          </v-layout>
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
                id="location"
                v-model="location"
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
                                :key="slotLeft1"
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
                                :key="slotLeft2"
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
                                :key="slotLeft3"
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
                                :key="slotCenter1"
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
                                :key="slotCenter2"
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
                                :key="slotCenter3"
													      cache-items
													      class="mx-3"
													      flat
													      hide-no-data
													      hide-details
													      label="Search"
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
                                :key="slotRight1"
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
                                :key="slotRight2"
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
                                :key="slotRight3"
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
                                :key="slotFooter"
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
          <div>
            <h2 v-if="this.dashTitle !== ''" style="text-align: center;">Preview for {{ this.dashTitle }}</h2>
            <h2 v-else style="text-align: center;">Preview for {{ this.dashTitle }}</h2>
            <div class="picture-frame">
            <div class="matte">
              <v-layout row>
                <v-flex xs12 class="pictureFrameData">
                    <v-layout row class="pictureFrameMain">
                      <v-flex xs3 class="leftBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft1"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft2"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft3"></component></div>
                        </div>
                      </v-flex>
                      <v-flex xs8 class="centerBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter1"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter2"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter3"></component></div>
                        </div>
                      </v-flex>
                      <v-flex xs3 class="rightBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchRight1"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchRight2"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchRight3"></component></div>
                        </div>
                      </v-flex>
                    </v-layout>
                    <v-layout row class="pictureFrameFooter">
                      <v-flex xs12 class="dashedBorder footerBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchFooter"></component></div>
                        </div>
                      </v-flex>
                    </v-layout>
                </v-flex>
              </v-layout>
            </div>
          </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
</div>
</template>


<script>
import BBCNews from '../Widgets/BBCNews'
import CNNWorldNews from '../Widgets/CNNWorldNews'
import RTENews from '../Widgets/RTENews'
import Clock from '../Widgets/Clock'
import CryptoTicker from '../Widgets/CryptoTicker'
import CurrencyTicker from '../Widgets/CurrencyTicker'
import DublinBus from '../Widgets/DublinBus'
import Quotes from '../Widgets/Quotes'
import Weather from '../Widgets/Weather'
import WelcomeMessage from '../Widgets/WelcomeMessage'
export default {
  data () {
    return {
      loading: false,
      items: [],
      dashTitle: '',
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
      created: '',
      updated: '',
      widgets: [
        'BBC News',
        'CNN World News',
        'Clock Digital',
        'Crypto Rates',
        'Currency Rates',
        'Dublin Bus',
        'RTE News',
        'Weather',
        'Inspire Quotes',
        'Welcome Message'
      ]
    }
  },
  components: {
    'BBC News': BBCNews,
    'CNN World News': CNNWorldNews,
    'Clock Digital': Clock,
    'Crypto Rates': CryptoTicker,
    'Currency Rates': CurrencyTicker,
    'RTE News': RTENews,
    'Dublin Bus': DublinBus,
    'Inspire Quotes': Quotes,
    'Weather': Weather,
    'Welcome Message': WelcomeMessage
  },
  watch: {
    searchLeft1 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchLeft2 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchLeft3 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchCenter1 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchCenter2 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchCenter3 (val) {
      val && val !== this.select && this.querySelections(val)
    },
    searchRight1 (val) {
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
      return this.deviceId !== '' && this.location !== '' && this.dashTitle !== ''
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
    onEditDashboard () {
      if (!this.formIsValid) {
        return
      }
      const dateNow = new Date()
      const dashboardData = {
        dashTitle: this.dashTitle,
        deviceId: this.deviceId,
        location: this.location,
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
        created: dateNow.toISOString(),
        updated: dateNow.toISOString()
      }
      this.$store.dispatch('editDashboard', dashboardData)
      this.$router.push('/dashboards')
    }
  }
}
</script>




<style>
  .pictureFrameData {
    background: url(../../assets/img/frameBg1.jpg);
    background-size: cover;
  }
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
  .pictureFrameData {
    min-height: 800px;
  }
  .pictureFrameMain {
    height: 90%;
  }
  .pictureFrameFooter {
    height: 10%;
  }
  .picture-frame {
  background-color:black;
  border:black solid 40px;
  -webkit-box-shadow: 4px 13px 59px 8px rgba(0,0,0,0.75);
-moz-box-shadow: 4px 13px 59px 8px rgba(0,0,0,0.75);
box-shadow: 4px 13px 59px 8px rgba(0,0,0,0.75);
  margin:40px;
  min-height: 800px;
}
.matte {
  background-color:#000;
  height:100%;
  -webkit-box-shadow: inset 10px 10px 37px 0px rgba(0,0,0,0.75);
-moz-box-shadow: inset 10px 10px 37px 0px rgba(0,0,0,0.75);
box-shadow: inset 10px 10px 37px 0px rgba(0,0,0,0.75);
}

.art {
  width:80%;
  margin:10% 10% 10% 10%;
}
</style>