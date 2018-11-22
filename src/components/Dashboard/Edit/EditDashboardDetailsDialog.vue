<template>
  <v-dialog persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-card-title>Edit Dashboard</v-card-title>
          </v-flex>
        </v-layout>

<!-- START TABS -->
        <v-layout>
          <v-flex xs12>
             <v-tabs
              centered
              color="black"
              dark
              icons-and-text
            >
              <v-tabs-slider color="white"></v-tabs-slider>

              <v-tab href="#tab-1">
                Details
                <v-icon>info</v-icon>
              </v-tab>

              <v-tab href="#tab-2">
                Layout &amp; Device
                <v-icon>line_style</v-icon>
              </v-tab>

              <v-tab href="#tab-3">
                Widgets
                <v-icon>art_track</v-icon>
              </v-tab>

              <!-- DETAILS TAB -->
              <v-tab-item id="tab-1" key="1">
                <v-card flat>
                  <v-card-text>

                    <v-layout row>
                      <v-flex xs2></v-flex>
                      <v-flex xs4>
                        <v-card-text>
                          <v-text-field
                            name="editedDashTitle"
                            label="Name this Dashboard"
                            id="editedDashTitle"
                            v-model="editedDashTitle"
                            :messages="['Give it a name so you know what it\'s for']"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field
                            name="editedDeviceId"
                            label="Enter your Device ID"
                            id="editedDeviceId"
                            v-model="editedDeviceId"
                            :messages="['You can find this on a sticker on your device.']"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field
                            name="editedDeviceLocation"
                            label="Where is your device located"
                            id="editedDeviceLocation"
                            v-model="editedDeviceLocation"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
                      </v-flex>
                      <v-flex xs4>
                        <p>This is where the layout chooser will go</p>
                      </v-flex>
                      <v-flex xs2></v-flex>
                    </v-layout>

                  </v-card-text>
                </v-card>
              </v-tab-item>
<!-- END DETAILS TAB -->


<v-tab-item id="tab-2" key="2">
                <v-card flat>
                  <v-card-text>
                    <v-layout row>
                      <v-flex xs3>
                        <p>{{this.deviceType}}</p>
                        <v-radio-group v-model="deviceType" column>
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
<!-- TABLET LAYOUTS -->
                      <v-flex xs9 v-if="deviceType === 'tablet'">
                        <p>TABLET LAYOUTS</p>
                        <v-radio-group v-model="deviceLayout" column>
                          <v-radio value="l3m3r3b1">
                            <div slot="label">3/3/3/1</strong></div>
                          </v-radio>
                          <v-radio value="l3m3b1">
                            <div slot="label">3/3/1</div>
                          </v-radio>
                        </v-radio-group>
                      </v-flex>
<!-- END TABLET LAYOUTS -->

<!-- MONITOR LAYOUTS -->
                      <v-flex xs9 v-if="deviceType === 'monitor'">
                        <p>MONITOR LAYOUTS</p>
                        <v-radio-group v-model="deviceLayout" column>
                          <v-radio value="l3m3r3b1">
                            <div slot="label">3/3/3/1</strong></div>
                          </v-radio>
                          <v-radio value="l3m3b1">
                            <div slot="label">2/2/1</div>
                          </v-radio>
                        </v-radio-group>
                      </v-flex>
<!-- END MONITOR LAYOUTS -->

<!-- KIOSK LAYOUTS -->
                      <v-flex xs9 v-if="deviceType === 'kiosk'">
                        <p>KIOSK LAYOUTS</p>
                        <v-radio-group v-model="deviceLayout" column>
                          <v-radio value="l3m3r3b1">
                            <div slot="label">3/3/3/1</strong></div>
                          </v-radio>
                          <v-radio value="l3m3b1">
                            <div slot="label">3/3/1</div>
                          </v-radio>
                        </v-radio-group>
                      </v-flex>
<!-- END KIOSK LAYOUTS -->

<!-- MIRROR LAYOUTS -->
                      <v-flex xs9 v-if="deviceType === 'mirror'">
                        <p>MIRROR LAYOUTS</p>
                        <v-radio-group v-model="deviceLayout" column>
                          <v-radio value="l3m3r3b1">
                            <div slot="label">3/3/3/1</strong></div>
                          </v-radio>
                          <v-radio value="l3m3b1">
                            <div slot="label">3/3/1</div>
                          </v-radio>
                        </v-radio-group>
                      </v-flex>
<!-- END MIRROR LAYOUTS -->
                    </v-layout>

                  </v-card-text>
                </v-card>
              </v-tab-item>
<!-- END LAYOUT TAB -->


<!-- WIDGET TAB -->
              <v-tab-item id="tab-3" key="3">
                <v-card flat>
                  <v-card-text>
                    <v-layout row>
                      <v-flex xs3 class="dashedBorder leftBlock">
                        <div>
                          <div class="innerDotted">
                            <v-autocomplete
                              :loading="loading"
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
                              :loading="loading"
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
                              :loading="loading"
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
                              :loading="loading"
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
                              :loading="loading"
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
                              :loading="loading"
                              :items="items"
                              :search-input.sync="searchCenter3"
                              v-model="editedSlotCenter3"
                              :key="editedSlotCenter3"
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
                              :loading="loading"
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
                              :loading="loading"
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
                              :loading="loading"
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
                              :loading="loading"
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
              </v-tab-item>

<!-- END WIDGET TAB -->
            </v-tabs>
          </v-flex>
        </v-layout>

<!-- END TABS -->

        <v-layout row wrap>
        <v-flex xs12>
          <div>
            <h2 style="text-align: center;">Preview for {{ this.editedDashTitle }}</h2>
            <div class="picture-frame">
            <div class="matte">
              <v-layout row>
                <v-flex xs12 class="pictureFrameData">
                    <v-layout row class="pictureFrameMain">
                      <v-flex xs3 class="leftBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft1" v-bind="attributes.listOfAttrs"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft2" v-bind="attributes.listOfAttrs"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft3" v-bind="attributes.listOfAttrs"></component></div>
                        </div>
                      </v-flex>
                      <v-flex xs8 class="centerBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter1" v-bind="attributes.listOfAttrs"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter2" v-bind="attributes.listOfAttrs"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter3" v-bind="attributes.listOfAttrs"></component></div>
                        </div>
                      </v-flex>
                      <v-flex xs3 class="rightBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchRight1" v-bind="attributes.listOfAttrs"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchRight2" v-bind="attributes.listOfAttrs"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchRight3" v-bind="attributes.listOfAttrs"></component></div>
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
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat color="red" @click="editDialog = false">Cancel</v-btn>
              <v-btn flat color="orange" @click="onSaveChanges">Update</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import BBCNews from '../../Widgets/BBCNews'
import CNNWorldNews from '../../Widgets/CNNWorldNews'
import RTENews from '../../Widgets/RTENews'
import Clock from '../../Widgets/Clock'
import CryptoTicker from '../../Widgets/CryptoTicker'
import CurrencyTicker from '../../Widgets/CurrencyTicker'
import DublinBus from '../../Widgets/DublinBus'
import Quotes from '../../Widgets/Quotes'
import CurrentWeather from '../../Widgets/CurrentWeather'
import WelcomeMessage from '../../Widgets/WelcomeMessage'
export default {
  props: ['dashboard'],
  data () {
    return {
      editDialog: false,
      loading: false,
      items: [],
      editedDashTitle: this.dashboard.dashTitle,
      editedDeviceId: this.dashboard.deviceId,
      editedDeviceLocation: this.dashboard.deviceLocation,
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
      editedSlotLeft1: this.dashboard.slotLeft1,
      editedSlotLeft2: this.dashboard.slotLeft2,
      editedSlotLeft3: this.dashboard.slotLeft3,
      editedSlotCenter1: this.dashboard.slotCenter1,
      editedSlotCenter2: this.dashboard.slotCenter2,
      editedSlotCenter3: this.dashboard.slotCenter3,
      editedSlotRight1: this.dashboard.slotRight1,
      editedSlotRight2: this.dashboard.slotRight2,
      editedSlotRight3: this.dashboard.slotRight3,
      editedSlotFooter: this.dashboard.slotFooter,
      updated: null,
      deviceType: this.dashboard.deviceType,
      deviceLayout: this.dashboard.deviceLayout,
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
        'WelcomeMessage'
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
    'WelcomeMessage': WelcomeMessage
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
    onSaveChanges () {
      if (this.editedDashTitle.trim() === '' || this.editedDeviceId.trim() === '' || this.editedDeviceId.trim() === '') {
      }
      this.editDialog = false
      const dateNow = new Date()
      this.$store.dispatch('updateDashboardData', {
        id: this.dashboard.id,
        dashTitle: this.editedDashTitle,
        deviceId: this.editedDeviceId,
        deviceLocation: this.editedDeviceLocation,
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
        deviceType: this.deviceType,
        deviceLayout: this.deviceLayout,
        updated: dateNow.toISOString()
      })
    }
  },
  mounted () {
    console.log('called by: ', this.$parent.$vnode.tag)
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
    this.deviceType = this.dashboard.deviceType
    this.deviceLayout = this.dashboard.deviceLayout
  },
  computed: {
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
        console.log('THIS IS THE ATTRs: ', listOfAttrs)
      }
      return {
        listOfAttrs
      }
    }
  }
}
</script>
