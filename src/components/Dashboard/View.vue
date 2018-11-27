<template>
  <v-container fluid fill-height class="theContainer">
      <v-layout row v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row v-else>
        
        <v-flex xs12 class="pictureFrameData">
            <v-layout row class="pictureFrameMain">
              <v-flex xs3 class="leftBlock">
                <div>
                  <div>
                    <component v-bind:is="dashboard.slotLeft1" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
                  </div>
                  <div>
                    <component v-bind:is="dashboard.slotLeft2" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
                  </div>
                  <div>
                    <component v-bind:is="dashboard.slotLeft3" v-bind="attributes.listOfAttrs" :theId="this.id"></component></div>
                </div>
              </v-flex>
              <v-flex xs8 class="centerBlock">
                <div>
                  <div>
                    <component v-bind:is="dashboard.slotCenter1" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
                  </div>
                  <div>
                    <component v-bind:is="dashboard.slotCenter2" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
                  </div>
                  <div>
                    <component v-bind:is="dashboard.slotCenter3" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
                  </div>
                </div>
              </v-flex>
              <v-flex xs3 class="rightBlock">
                <div>
                  <div>
                    <component :is="dashboard.slotRight1" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
                  </div>
                  <div>
                    <component v-bind:is="dashboard.slotRight2" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
                  </div>
                  <div>
                    <component v-bind:is="dashboard.slotRight3" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
                  </div>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row class="pictureFrameFooter">
              <v-flex xs12 class="dashedBorder footerBlock">
                <div>
                  <div><component v-bind:is="dashboard.slotFooter" v-bind="attributes.listOfAttrs" :theId="this.id"></component></div>
                </div>
              </v-flex>
            </v-layout>
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
import CurrentWeather from '../Widgets/CurrentWeather'
import WelcomeMessage from '../Widgets/WelcomeMessage'
import Uber from '../Widgets/Uber'
export default {
  props: ['id'],
  data () {
    return {
      dashTitle: '',
      deviceLocation: ''
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
        console.log('THIS IS THE ATTRs: ', listOfAttrs)
      }
      return {
        listOfAttrs
      }
    }
  },
  beforeCreate: function () {
    document.body.className = 'viewPage'
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
    'Uber': Uber
  }
}
</script>
<style>
.theContainer {

}
  .pictureFrameData {
    background: url(../../assets/img/field.jpg);
    background-size: cover;
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
</style>