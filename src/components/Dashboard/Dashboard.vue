<template>
  <v-container fluid fill-height>
      <v-layout row v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <div>
            <h2 v-if="dashboard.dashTitle === ''" style="text-align: center;">Preview</h2>
            <h2 v-else style="text-align: center;">Preview for {{ dashboard.dashTitle }}<br> {{ dashboard.deviceLocation}}</h2>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-dashboard-details-dialog :dashboard="dashboard"></app-edit-dashboard-details-dialog>
            </template>
            <div class="picture-frame">
            <div class="matte">
              <v-layout row>
                <v-flex xs12 class="pictureFrameData">
                    <v-layout row class="pictureFrameMain">
                      <v-flex xs3 class="leftBlock">
                        <div>
                          <div class="innerDotted">
                            <component v-bind:is="dashboard.slotLeft1" v-on="listeners" v-bind="attributes.listOfAttrs"></component>
                          </div>
                          <div class="innerDotted">
                            <component v-bind:is="dashboard.slotLeft2" v-on="listeners" v-bind="attributes.listOfAttrs"></component>
                          </div>
                          <div class="innerDotted">
                            <component v-bind:is="dashboard.slotLeft3" v-on="listeners" v-bind="attributes.listOfAttrs"></component></div>
                        </div>
                      </v-flex>
                      <v-flex xs8 class="centerBlock">
                        <div>
                          <div class="innerDotted">
                            <!-- <component v-bind:is="dashboard.slotCenter1" v-bind:allProps="dashboard.slotCenter1"></component> -->
                            <component :is="dashboard.slotCenter1" v-on="listeners" v-bind="attributes.listOfAttrs"></component>
                          </div>
                          <div class="innerDotted">
                            <component v-bind:is="dashboard.slotCenter2" v-on="listeners" v-bind="attributes.listOfAttrs"></component>
                          </div>
                          <div class="innerDotted">
                            <component v-bind:is="dashboard.slotCenter3" v-on="listeners" v-bind="attributes.listOfAttrs"></component>
                          </div>
                        </div>
                      </v-flex>
                      <v-flex xs3 class="rightBlock">
                        <div>
                          <div>
                            <!-- <div class="innerDotted"><component v-bind:is="dashboard.slotRight1"></component></div> -->
                            <component :is="dashboard.slotRight1" v-on="listeners" v-bind="attributes.listOfAttrs"></component>
                          </div>
                          <div class="innerDotted">
                            <component v-bind:is="dashboard.slotRight2" v-on="listeners" v-bind="attributes.listOfAttrs"></component>
                          </div>
                          <div class="innerDotted">
                            <component v-bind:is="dashboard.slotRight3" v-on="listeners" v-bind="attributes.listOfAttrs"></component>
                          </div>
                        </div>
                      </v-flex>
                    </v-layout>
                    <v-layout row class="pictureFrameFooter">
                      <v-flex xs12 class="dashedBorder footerBlock">
                        <div>
                          <div class="innerDotted"><component v-bind:is="dashboard.slotFooter"></component></div>
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
  props: ['id'],
  data () {
    return {
      dashTitle: '',
      deviceLocation: '',
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
      slotFooter: null
    }
  },
  computed: {
    dashboard () {
      return this.$store.getters.loadedDashboard(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.dashboard.creatorId
    },
    loading () {
      return this.$store.getters.loading
    },
    listeners () {
      return {
        'updateMessage': this.handleWelcomeMessageEvent,
        'updateCrypto': this.handleCryptoRatesEvent,
        'updateDublinBus': this.handleDublinBusEvent
      }
    },
    attributes () {
      console.log('ALL PROPS ARE : ', this.dashboard.allProps)
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
      }
      return {
        listOfAttrs
      }
    }
  },
  mounted () {
    console.log('inside mounted')
  },
  methods: {
    handleWelcomeMessageEvent (newData) {
      console.log('This is the welcome message Event')
      console.log(newData)
      console.log('from dashboard: ', this.dashboard.allProps)
      const newWelcome = Object.assign(this.dashboard.allProps, {welcomeMessage: newData})
      this.$store.dispatch('updateDashboardData', {
        id: this.dashboard.id,
        allProps: newWelcome
      })
    },
    handleCryptoRatesEvent () {
      console.log('The Crypto event was fired')
    },
    handleDublinBusEvent (busData) {
      console.log('The Dublin Bus event was fired')
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
  }
}
</script>
<style>
  .pictureFrameData {
    background: url(../../assets/img/bedroom1.jpg);
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