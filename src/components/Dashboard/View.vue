<template>
  <!-- <v-container fluid fill-height class="theContainer" :style="{ backgroundImage: `url('${backgroundImg}')` }"> -->
    <v-container fluid fill-height id="backgroundContainer" class="theContainer" v-bind:style="{ 'background-image': 'url(' + backgroundImg + ')' }">
      <v-layout row v-if="loading">
        <v-flex xs12 class="text-xs-center" align-self-center>
          <dashboard-orbit-spinner    
            :animation-duration="1200"    
            :size="55"    
            color="#ffffff"   
          />
        </v-flex>
      </v-layout>
      <v-layout row v-else>
        
<!-- pleasing LAYOUT -->
      <v-flex xs12 id="pleasingLayout" v-if="this.dashboard.deviceLayout === 'pleasing'">
        <div v-if="backgroundAuthor" id="photoCredit">
              <strong class="ts">Photo by:</strong>
              <a :href="this.backgroundLink" class="ts">/r/{{ this.backgroundAuthor }}</a>
            </div>
        <v-layout id="topBlock">
          <v-flex xs5 id="leftBlock">
            <component :is="dashboard.slotLeft1" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
          </v-flex>
          <v-flex xs5 offset-xs2 id="rightBlock">
            <component :is="dashboard.slotRight1" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
          </v-flex>
        </v-layout>
        <v-layout id="topCenterBlock">
          <v-flex xs12 align-self-center>
            <component v-bind:is="dashboard.slotCenter1" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
          </v-flex>
        </v-layout>
        <v-layout id="bottomCenterBlock">
          <v-flex xs12 align-self-center>
          </v-flex>
        </v-layout>
        <v-layout id="footerBlock">
          <v-flex xs12 align-self-end>
           <component v-bind:is="dashboard.slotFooter" v-bind="attributes.listOfAttrs" :theId="this.id"></component>
          </v-flex>
        </v-layout>
      </v-flex>
<!-- END pleaseing Layout -->

<!-- l3m3r3b1 LAYOUT -->
        <v-flex xs12 class="pictureFrameData" v-else>
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
            </v-layout >
            <v-layout align-end row class="pictureFrameFooter">
              <v-flex xs12 class="dashedBorder footerBlock">
                <div>
                  <div><component v-bind:is="dashboard.slotFooter" v-bind="attributes.listOfAttrs" :theId="this.id"></component></div>
                </div>
              </v-flex>
            </v-layout>
        </v-flex>
<!-- END l3m3r3b1 LAYOUT -->
                    
      </v-layout>
    </v-container>
</template>


<script>
import axios from 'axios'
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
import PeopleInSpace from '../Widgets/PeopleInSpace'
import Wifi from '../Widgets/Wifi'
import { DashboardOrbitSpinner } from 'epic-spinners'

export default {
  props: ['id'],
  data () {
    return {
      dashTitle: '',
      deviceLocation: '',
      backgroundImg: '',
      backgroundType: '',
      backgroundAuthor: '',
      backgroundLink: '',
      currentBackground: ''
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
        if ((this.dashboard.allProps.currency !== null) || (this.dashboard.allProps.currency !== undefined)) {
          var addUber = {'uber': this.dashboard.allProps.uber}
          Object.assign(listOfAttrs, addUber)
        }
        if ((this.dashboard.allProps.currency !== null) || (this.dashboard.allProps.currency !== undefined)) {
          var addCurrencyTicker = {'currency': this.dashboard.allProps.currency}
          Object.assign(listOfAttrs, addCurrencyTicker)
        }
        if ((this.dashboard.allProps.wifi !== null) || (this.dashboard.allProps.wifi !== undefined)) {
          var addWifi = {'wifi': this.dashboard.allProps.wifi}
          Object.assign(listOfAttrs, addWifi)
        }
      }
      return {
        listOfAttrs
      }
    }
  },
  watch: {
    dashboard (newValue, oldValue) {
      // console.log(moment().format('DDD'))
      if (newValue.backgroundType !== this.currentBackground) {
        this.backgroundImg = null
        this.backgroundAuthor = null
        this.backgroundLink = null
        if (newValue.backgroundType === 'solid') {
          this.backgroundType = 'solid'
        }
        if (newValue.backgroundType === 'flickr') {
          console.log('its FLICKR')
          axios({
            method: 'GET',
            url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=nature&format=json',
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:8080'
            }
          }).then((data) => {
            console.log(data)
          })
        }
        if (newValue.backgroundType === 'dropbox') {
          console.log('its DROPBOX')
        }
        if (newValue.backgroundType === 'earthPorn') {
          console.log('its EARTH PORN')
          this.getEarthPorn()
        }
      }
      this.currentBackground = newValue.backgroundType
    }
  },
  beforeCreate: function () {
    document.body.className = 'viewPage'
  },
  methods: {
    getBackground () {
      if (this.backgroundType === 'earthPorn') {
        this.getEarthPorn()
      }
    },
    getEarthPorn () {
      axios.get('https://www.reddit.com/r/EarthPorn/top/.json', {
      })
      .then(response => {
        var responseLength = response.data.data.children.length
        var randomnumber = Math.floor(Math.random() * (responseLength - 0)) + 0
        this.backgroundImg = response.data.data.children[randomnumber].data.url
        this.backgroundAuthor = response.data.data.children[randomnumber].data.author
        this.backgroundLink = 'http://www.reddit.com' + response.data.data.children[randomnumber].data.permalink
      })
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
    'Uber': Uber,
    'PeopleInSpace': PeopleInSpace,
    'Wifi': Wifi,
    DashboardOrbitSpinner
  },
  mounted () {
    console.log('page is mounted')
    this.backgroundType = this.dashboard.backgroundType
    this.getBackground()
  }
}
</script>
<style lang="scss" scoped>
.theContainer {
  padding: 20px;
 background: url('https://www.blasketislands.ie/images/blasketislands/kerrywhalewatching_2016-03-07_at_16.16.50.jpg');
 background-repeat: no-repeat;
 background-position: center;
 background-size: cover;
}
.orbit-spinner {    
  text-align: center;   
  margin: 0 auto;   
}

/* PLEASING LAYOUT */

#pleasingLayout {
  #photoCredit {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0.8;
    padding-left: 4px;
    padding-botton: 4px;
    strong {
      font-size: 12px;
      display: block;
    }
    a {
      color: white;
      opacity: 0.8;
    }
  }
  #topBlock {
    height: 10%;
    .leftBlock {
      text-align: left;
    }
    .rightBlock {
      text-align: right;
      .weather {
        .city {
          font-size: 1rem;
        }
        .degrees {
          font-size: 1.4rem;
        }
      }
    }
  }
  #topCenterBlock {
    height: 80%;
    bottom: 0;
    .flex {
      text-align: center;
      .time{
        font-size: 14rem;
      }
    }
  }
  #bottomCenterBlock {
    .flex {
      text-align: center;
    }
  }
  #footerBlock {
    height: 10%;
  }
}

.redborder {
  border: 1px solid red;
}

  .pictureFrameData {
    padding: 20px;
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
