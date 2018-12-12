<template>
	
	<div v-if="!loading">
    <v-container fluid>
  	  <v-layout row>
  		  <v-flex xs12>
  			  <h4>Dashboard Wizzard</h4>
  		  </v-flex>
  	  </v-layout>
  	  <div v-if="this.dashboardTitle == ''">
  	  	<h3>Something went wrong - please start again</h3>
  	  </div>
  	  <div v-else>
	      <v-layout row>
	    	  <v-flex xs12>
	    	  	<p>Welcome to the dashboard wizzard {{ this.dashboardTitle }}</p>
	    	  	<v-stepper v-model="e1">
					    <v-stepper-header>
					      <v-stepper-step :complete="e1 > 1" step="1">Dashboard Details</v-stepper-step>

					      <v-divider></v-divider>

					      <v-stepper-step :complete="e1 > 2" step="2">Layout</v-stepper-step>

					      <v-divider></v-divider>

					      <v-stepper-step :complete="e1 > 3" step="3">Choose Widgets</v-stepper-step>

					      <v-divider></v-divider>

					      <v-stepper-step step="4">Widget Settings</v-stepper-step>
					    </v-stepper-header>

					    <v-stepper-items>
					    	<form @submit.prevent="onWizzardSave">
<!-- CONTENT FOR STEP 1 -->
					      <v-stepper-content step="1">
					        <v-card
					          class="mb-5"
					        >
						      <h3>Dashboard Details</h3>
									<v-layout>
										<v-flex xs3></v-flex>
                      <v-flex xs4>
                        <v-card-text>
                          <v-text-field
                            name="dashboardTitle"
                            label="Name this Dashboard"
                            id="dashboardTitle"
                            v-model="dashboardTitle"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field
                            name="dashboardId"
                            label="Your Dashboard ID"
                            id="dashboardId"
                            disabled
                            v-model="dashboardId"
                            :messages="['(You cannot change this)']"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field
                            name="dashboardLocation"
                            label="Where is your dashboard located?"
                            id="dashboardLocation"
                            v-model="dashboardLocation"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field
                            name="longitude"
                            label="Where is your dashboard located?"
                            id="longitude"
                            v-model="longitude"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field
                            name="latitude"
                            label="Where is your dashboard located?"
                            id="latitude"
                            v-model="latitude"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
										</v-flex>
									</v-layout>

					        </v-card>

					        <v-btn
					          color="primary"
					          @click="e1 = 2"
					        >
					          Continue
					        </v-btn>

					        <v-btn flat>Cancel</v-btn>
					      </v-stepper-content>
<!-- END CONTENT FOR STEP 1 -->					      
<!-- CONTENT FOR STEP 2 -->
					      <v-stepper-content step="2">
					        <v-card
					        >

										<v-layout>
											<v-flex xs1></v-flex>
											<v-flex xs3>
												<h3>Device</h3>
												<v-radio-group v-model="dashboardDevice" column>
                          <v-radio value="tablet">
                            <div slot="label">Tablet</strong></div>
                          </v-radio>
                          <v-radio value="monitor">
                            <div slot="label">Monitor</div>
                          </v-radio>
                          <v-radio value="kiosk">
                            <div slot="label">Kiosk</div>
                          </v-radio>
                          <v-radio value="mirror">
                            <div slot="label">Mirror</div>
                          </v-radio>
                        </v-radio-group>
											</v-flex>

											<v-flex xs5>
												<h3>Layout</h3>
												<v-radio-group v-model="dashboardLayout" row>
													<v-radio value="pleasing" v-if="dashboardDevice == 'monitor' || dashboardDevice == 'kiosk' || dashboardDevice == 'mirror'">
														<div slot="label">
															<img src="../../assets/img/layouts/layout1.png" class="layoutImg">
														</div>	
													</v-radio>
													<v-radio value="l3m3r3b1" v-if="dashboardDevice == 'monitor' || dashboardDevice == 'kiosk' || dashboardDevice == 'mirror'">
														<div slot="label">
													 		<img src="../../assets/img/layouts/layout2.png" class="layoutImg">
													 	</div>
													</v-radio>
													<v-radio value="bliss">
														<div slot="label">
													 		<img src="../../assets/img/layouts/layout3.png" class="layoutImg">
													 	</div>
													</v-radio>
												</v-radio-group>
												
											</v-flex>

                      <v-flex xs3>
                        <h3>Background</h3>
                        <v-radio-group v-model="backgroundType" column>
                          <div v-if="dashboardDevice === 'mirror'">
                            <v-radio value="MirrorBg">
                              <div slot="label">Mirror Background</div>
                            </v-radio>
                          </div>
                          <div v-else>
                            <v-radio value="solid">
                              <div slot="label">Black</div>
                            </v-radio>
                            <!-- <v-radio value="flickr">
                              <div slot="label">Flickr</div>
                            </v-radio>
                            <v-radio value="dropbox">
                              <div slot="label">Dropbox</div>
                            </v-radio> -->
                            <v-radio value="earthporn">
                              <div slot="label">Reddit EarthPorn</div>
                            </v-radio>
                          </div>
                        </v-radio-group>
                      </v-flex>
                      <!-- <v-flex xs3>
                        <h3>Background Source</h3>
                        <div v-if="dashboardDevice === 'mirror'">
                          <v-radio value="Black">
                            <div slot="label">Black</div>
                          </v-radio>
                        </div>
                        <div v-else>
                          <div v-if="backgroundType === 'solid'">
                            <v-radio-group v-model="backgroundSource" column>
                              <v-radio value="Black" selected>
                                <div slot="label">Black</div>
                              </v-radio>
                              <v-radio value="White">
                                <div slot="label">White</div>
                              </v-radio>
                              <v-radio value="Red">
                                <div slot="label">Red</div>
                              </v-radio>
                            </v-radio-group>
                          </div>
                          <div v-else-if="backgroundType === 'earthporn'">
                            <v-text-field
                              name="backgroundSource"
                              id="backgroundSource"
                              v-model="backgroundSource"
                              required
                              value="reddit.com/r/earthPorn"
                              hidden
                              >
                            </v-text-field>
                            <p>We'll fetch the top images from reddit.com/earthPorn</p>
                          </div>
                          <div v-else>
                              <v-text-field
                              name="backgroundSource"
                              label="Whats the URL of the source"
                              id="backgroundSource"
                              v-model="backgroundSource"
                              required
                              >
                            </v-text-field>
                          </div>
                        </div>
                      </v-flex> -->
										</v-layout>
    

					        	
					        </v-card>

					        <v-btn
					          outline
					          color="primary"
					          @click="e1 = 1"
					        >
					          Back
					        </v-btn>
					        <v-btn
					          color="primary"
					          @click="e1 = 3"
					        >
					          Continue
					        </v-btn>

					        <v-btn 
					          flat
					          color="red">Cancel</v-btn>
					      </v-stepper-content>
<!-- END CONTENT FOR STEP 2 -->
<!-- CONTENT FOR STEP 3 -->
					      <v-stepper-content step="3">
					        <v-card
					          class="mb-5"
					          height="200px"
					        >
                    <v-layout row>
                      <v-flex xs3 class="dashedBorder leftBlock">
                        <div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchLeft1"
                              v-model="editedSlotLeft1"
                              :key="editedSlotLeft1"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchLeft2"
                              v-model="editedSlotLeft2"
                              :key="editedSlotLeft2"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchLeft3"
                              v-model="editedSlotLeft3"
                              :key="editedSlotLeft3"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                        </div>
                      </v-flex>
                      <v-flex xs8 class="dashedBorder centerBlock">
                        <div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchCenter1"
                              v-model="editedSlotCenter1"
                              :key="editedSlotCenter1"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchCenter2"
                              v-model="editedSlotCenter2"
                              :key="editedSlotCenter2"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchCenter3"
                              v-model="editedSlotCenter3"
                              :key="editedSlotCenter3"
                              :value="editedSlotCenter3"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                        </div>
                      </v-flex>
                      <v-flex xs3 class="dashedBorder rightBlock">
                        <div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchRight1"
                              v-model="editedSlotRight1"
                              :key="editedSlotRight1"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchRight2"
                              v-model="editedSlotRight2"
                              :key="editedSlotRight2"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchRight3"
                              v-model="editedSlotRight3"
                              :key="editedSlotRight3"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                        </div>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 class="dashedBorder footerBlock">
                        <div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="selectLoading"
                              :items="items"
                              :search-input.sync="searchFooter"
                              v-model="editedSlotFooter"
                              :key="editedSlotFooter"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="Search"
                              solo-inverted
                              clearable
                            ></v-autocomplete>
                          </div>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>

					        <p>You must save your changes here before you can modify your widgets</p>
					        <v-btn
					          outline
					          color="primary"
					          @click="e1 = 2"
					        >
					          Back
					        </v-btn>
					        <v-btn
					          color="primary"
					          @click="e1 = 4"
					          type="submit"
					        >
					          Save &amp; Continue
					        </v-btn>

					        <v-btn flat>Cancel</v-btn>
					      </v-stepper-content>
<!-- END CONTENT FOR STEP 3 -->
<!-- CONTENT FOR STEP 4 -->
					      <v-stepper-content step="4">
					        <v-card
					          class="mb-5"
					        >

									<v-layout row wrap>
        <v-flex xs12>
          <div>
            <div class="picture-frame">
            <div class="matte">
              <v-layout row>
                <v-flex xs12 class="pictureFrameDataField">
                    <v-layout row class="pictureFrameMain">
                      <v-flex xs3 class="leftBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft1" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft2" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft3" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
                        </div>
                      </v-flex>
                      <v-flex xs8 class="centerBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter1" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter2" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter3" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
                        </div>
                      </v-flex>
                      <v-flex xs3 class="rightBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchRight1" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchRight2" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchRight3" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
                        </div>
                      </v-flex>
                    </v-layout>
                    <v-layout row class="pictureFrameFooter">
                      <v-flex xs12 class="dashedBorder footerBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchFooter" v-bind="attributes.listOfAttrs" :theId="this.id" :dashInfo="this.dashInfo"></component></div>
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

					        </v-card>
					        <v-btn
					          outline
					          color="primary"
					          @click="e1 = 1"
					        >
					          Start Over
					        </v-btn>
					        <v-btn
					          color="primary"
					          @click=""
					        >
					          Save Widget Settings
					        </v-btn>

					        <v-btn flat>Cancel</v-btn>
					      </v-stepper-content>
<!-- END CONTENT FOR STEP 4 -->
					      </form>
					    </v-stepper-items>

					  </v-stepper>
	    	  </v-flex>
	      </v-layout>
	    </div>
    </v-container>
  </div>
  <div v-else>
		<h1>PAGE IS LOADING</h1>
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
import CurrentWeather from '../Widgets/CurrentWeather'
import WelcomeMessage from '../Widgets/WelcomeMessage'
import PeopleInSpace from '../Widgets/PeopleInSpace'
import Uber from '../Widgets/Uber'
export default {
  props: ['id'],
  data () {
    return {
      loading: true,
      selectLoading: false,
      edit: false,
      e1: 0,
      items: [],
      theId: this.id,
      dashInfo: {},
      dashboardTitle: '',
      dashboardId: '',
      dashboardLocation: '',
      dashboardLayout: '',
      dashboardDevice: '',
      longitude: '',
      latitude: '',
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
      editedSlotLeft1: '',
      editedSlotLeft2: '',
      editedSlotLeft3: '',
      editedSlotCenter1: '',
      editedSlotCenter2: '',
      editedSlotCenter3: '',
      editedSlotRight1: '',
      editedSlotRight2: '',
      editedSlotRight3: '',
      editedSlotFooter: '',
      updated: null,
      backgroundSource: null,
      backgroundType: 'Solid Color',
      widgets: [
        'BBCNews',
        'CNNWorldNews',
        'ClockDigital',
        'CryptoRates',
        'CurrencyRates',
        'DublinBus',
        'RTENews',
        'CurrentWeather',
        'Quotes',
        'WelcomeMessage',
        'PeopleInSpace',
        'Uber'
      ]
    }
  },
  components: {
    'BBCNews': BBCNews,
    'CNNWorldNews': CNNWorldNews,
    'ClockDigital': Clock,
    'CryptoRates': CryptoTicker,
    'CurrencyRates': CurrencyTicker,
    'RTENews': RTENews,
    'DublinBus': DublinBus,
    'Quotes': Quotes,
    'CurrentWeather': CurrentWeather,
    'WelcomeMessage': WelcomeMessage,
    'PeopleInSpace': PeopleInSpace,
    'Uber': Uber
  },
  computed: {
    dashboard () {
      return this.$store.getters.loadedDashboard(this.id)
    },
    attributes () {
      let listOfAttrs = {'default': 'default'}
      if (this.dashboard.allProps) {
        if ((this.dashboard.allProps.welcomeMessage !== null) || (this.dashboard.allProps.welcomeMessage !== undefined)) {
          var addMessage = {'message': this.dashboard.allProps.welcomeMessage}
          Object.assign(listOfAttrs, addMessage)
        }
        if ((this.dashboard.allProps.cryptoRates !== null) || (this.dashboard.allProps.cryptoRates !== undefined)) {
          var addRates = {'rates': this.dashboard.allProps.cryptoRates}
          Object.assign(listOfAttrs, addRates)
        }
        if ((this.dashboard.allProps.dublinBus !== null) || (this.dashboard.allProps.dublinBus !== undefined)) {
          var addDublinBus = {'dublinBus': this.dashboard.allProps.dublinBus}
          Object.assign(listOfAttrs, addDublinBus)
        }
        if ((this.dashboard.allProps.clock !== null) || (this.dashboard.allProps.clock !== undefined)) {
          var addClock = {'clock': this.dashboard.allProps.clock}
          Object.assign(listOfAttrs, addClock)
        }
        if ((this.dashboard.allProps.quotes !== null) || (this.dashboard.allProps.quotes !== undefined)) {
          var addQuotes = {'quoted': this.dashboard.allProps.quotes}
          Object.assign(listOfAttrs, addQuotes)
        }
        if ((this.dashboard.allProps.weather !== null) || (this.dashboard.allProps.weather !== undefined)) {
          var addWeather = {'weather': this.dashboard.allProps.weather}
          Object.assign(listOfAttrs, addWeather)
        }
        if ((this.dashboard.allProps.uber !== null) || (this.dashboard.allProps.uber !== undefined)) {
          var addUber = {'uber': this.dashboard.allProps.uber}
          Object.assign(listOfAttrs, addUber)
        }
        if ((this.dashboard.allProps.currency !== null) || (this.dashboard.allProps.currency !== undefined)) {
          var addCurrency = {'currency': this.dashboard.allProps.currency}
          Object.assign(listOfAttrs, addCurrency)
        }
        console.log('THIS IS THE ATTRs: ', listOfAttrs)
      }
      return {
        listOfAttrs
      }
    }
  },
  mounted () {
    this.theId = this.dashboard.id
    this.dashboardTitle = this.dashboard.dashTitle
    this.dashboardId = this.dashboard.deviceId
    this.dashboardLocation = this.dashboard.deviceLocation
    this.dashboardLayout = this.dashboard.deviceLayout
    this.longitude = this.dashboard.longitude
    this.latitude = this.dashboard.latitude
    this.dashboardDevice = this.dashboard.deviceType
    if (this.dashboard.backgroundType !== undefined) {
      this.backgroundType = this.dashboard.backgroundType
    }
    this.backgroundSource = this.dashboard.backgroundSource
    this.searchLeft1 = this.dashboard.slotLeft1
    this.searchLeft2 = this.dashboard.slotLeft2
    this.searchLeft3 = this.dashboard.slotLeft3
    this.searchCenter1 = this.dashboard.slotCenter1
    this.searchCenter2 = this.dashboard.slotCenter2
    this.searchCenter3 = this.dashboard.slotCenter3
    this.searchRight1 = this.dashboard.slotRight1
    this.searchRight2 = this.dashboard.slotRight2
    this.searchRight3 = this.dashboard.slotRight3
    this.searchFooter = this.dashboard.slotFooter
    this.editedSlotLeft1 = this.dashboard.slotLeft1
    this.editedSlotLeft2 = this.dashboard.slotLeft2
    this.editedSlotLeft3 = this.dashboard.slotLeft3
    this.editedSlotCenter1 = this.dashboard.slotCenter1
    this.editedSlotCenter2 = this.dashboard.slotCenter2
    this.editedSlotCenter3 = this.dashboard.slotCenter3
    this.editedSlotRight1 = this.dashboard.slotRight1
    this.editedSlotRight2 = this.dashboard.slotRight2
    this.editedSlotRight3 = this.dashboard.slotRight3
    this.editedSlotFooter = this.dashboard.slotFooter
    this.dashInfo = {'dashId': this.id, 'longitude': this.dashboard.longitude, 'latitude': this.dashboard.latitude}
    this.loading = false
  },
  methods: {
    querySelections (v) {
      this.selectLoading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.widgets.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.selectLoading = false
      }, 500)
    },
    onWizzardSave () {
      if (this.dashboardTitle.trim() === '' || this.dashboardLocation.trim() === '' || this.dashboardId.trim() === '') {
      }
      this.editDialog = false
      const dateNow = new Date()
      this.$store.dispatch('updateDashboardData', {
        id: this.dashboard.id,
        dashTitle: this.dashboardTitle,
        deviceId: this.dashboardId,
        deviceLocation: this.dashboardLocation,
        deviceLayout: this.dashboardLayout,
        longitude: this.longitude,
        latitude: this.latitude,
        deviceType: this.dashboardDevice,
        backgroundType: this.backgroundType,
        backgroundSource: this.backgroundSource,
        slotLeft1: this.editedSlotLeft1,
        slotLeft2: this.editedSlotLeft2,
        slotLeft3: this.editedSlotLeft3,
        slotCenter1: this.editedSlotCenter1,
        slotCenter2: this.editedSlotCenter2,
        slotCenter3: this.editedSlotCenter3,
        slotRight1: this.editedSlotRight1,
        slotRight2: this.editedSlotRight2,
        slotRight3: this.editedSlotRight3,
        slotFooter: this.editedSlotFooter,
        updated: dateNow.toISOString()
      })
    }
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
  }
}
</script>

<style>
  .layoutImg {
	  width: 100px;
  }
  .pictureFrameDataField {
    // background: url(../../assets/img/field.jpg);
    // background-size: cover;
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

.editButtons{
  border: 1px solid red;
  position: relative;
  display: block;

  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
.editPane {

}
</style>