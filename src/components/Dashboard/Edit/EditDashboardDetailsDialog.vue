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
        <v-layout row>
          <v-flex xs12>
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
                name="Dashboard Location"
                label="Where is your device located"
                id="editedDeviceLocation"
                v-model="editedDeviceLocation"
                required
                >
              </v-text-field>
            </v-card-text>
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
                      <v-layout row>
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
                          <div class="innerDotted"><component v-bind:is="this.searchLeft1"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft2"></component></div>
                          <div class="innerDotted"><component v-bind:is="this.searchLeft3"></component></div>
                        </div>
                      </v-flex>
                      <v-flex xs8 class="centerBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="this.searchCenter1" :pushedStuff="welcomeMessageData"></component></div>
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
import Weather from '../../Widgets/Weather'
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
      welcomeMessageData: [{
        messageTitle: 'Placeholder Title',
        messageSubtitle: 'Placeholder Subtitle'
      }],
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
        updated: dateNow.toISOString()
      })
    }
  },
  mounted () {
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
  }
}
</script>
