<template>
  <div v-if="loading">
        <v-flex xs12 class="text-xs-center" align-self-center>
          <currency-orbit-spinner
            :animation-duration="1200"
            :size="55"
            color="#ffffff"
          />
        </v-flex>
      </v-layout>
  </div>
  <div v-else>
    <div v-if="edit == true">
      <v-dialog v-model="edit" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Configure Currency</v-card-title>
          <v-card-text>
            <form>
              Base:<br />
                <v-radio-group v-model="editedBase" :mandatory="true">
                  <v-radio label="Euro" value="EUR"></v-radio>
                  <v-radio label="US Dollar" value="USD"></v-radio>
                  <v-radio label="British Pound" value="GBP"></v-radio>
                </v-radio-group>
                Choose up to 5<br />
                <div>
                  <v-select
                    v-model="editedSelectedCurrencies"
                    :items="items"
                    attach
                    chips
                    label="Chips"
                    multiple
                  ></v-select>
                </div>
                <div>
                  <v-radio-group v-model="editedShowFlag" :mandatory="true" row>
                    <v-radio label="Use Flag" :value="true"></v-radio>
                    <v-radio label="Use Symbol" :value="false"></v-radio>
                  </v-radio-group>
                </div>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="edit = false">Close</v-btn>

            <v-btn color="green darken-1" flat @click="onChangeCurrency">Update Currencies</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
    </div>
    <div v-else @click="edit = true">
      <p>Currency Rates for {{ base }}</p>
      <div v-for="(value, key, index) in allRates">
        <div class="theCurrency">
          <div class="toCurrency">
            <div class="flag" :class="key" v-if="showFlag === true">
              <div class="flag" v-if="key == 'USD'"><img src="../../../assets/img/flags/USD.png"/></div>
              <div class="flag" v-if="key == 'EUR'"><img src="../../../assets/img/flags/EUR.png"/></div>
              <div class="flag" v-if="key == 'BGN'"><img src="../../../assets/img/flags/BGN.png"/></div>
              <div class="flag" v-if="key == 'BRL'"><img src="../../../assets/img/flags/BRL.png"/></div>
              <div class="flag" v-if="key == 'HUF'"><img src="../../../assets/img/flags/HUF.png"/></div>
              <div class="flag" v-if="key == 'DKK'"><img src="../../../assets/img/flags/DKK.png"/></div>
              <div class="flag" v-if="key == 'JPY'"><img src="../../../assets/img/flags/JPY.png"/></div>
              <div class="flag" v-if="key == 'ILS'"><img src="../../../assets/img/flags/ILS.png"/></div>
              <div class="flag" v-if="key == 'TRY'"><img src="../../../assets/img/flags/TRY.png"/></div>
              <div class="flag" v-if="key == 'RON'"><img src="../../../assets/img/flags/RON.png"/></div>
              <div class="flag" v-if="key == 'GBP'"><img src="../../../assets/img/flags/GBP.png"/></div>
              <div class="flag" v-if="key == 'PHP'"><img src="../../../assets/img/flags/PHP.png"/></div>
              <div class="flag" v-if="key == 'HRK'"><img src="../../../assets/img/flags/HRK.png"/></div>
              <div class="flag" v-if="key == 'NOK'"><img src="../../../assets/img/flags/NOK.png"/></div>
              <div class="flag" v-if="key == 'MXN'"><img src="../../../assets/img/flags/MXN.png"/></div>
              <div class="flag" v-if="key == 'AUD'"><img src="../../../assets/img/flags/AUD.png"/></div>
              <div class="flag" v-if="key == 'IDR'"><img src="../../../assets/img/flags/IDR.png"/></div>
              <div class="flag" v-if="key == 'KRW'"><img src="../../../assets/img/flags/KRW.png"/></div>
              <div class="flag" v-if="key == 'HKD'"><img src="../../../assets/img/flags/HKD.png"/></div>
              <div class="flag" v-if="key == 'ZAR'"><img src="../../../assets/img/flags/ZAR.png"/></div>
              <div class="flag" v-if="key == 'ISK'"><img src="../../../assets/img/flags/ISK.png"/></div>
              <div class="flag" v-if="key == 'CZK'"><img src="../../../assets/img/flags/CZK.png"/></div>
              <div class="flag" v-if="key == 'THB'"><img src="../../../assets/img/flags/THB.png"/></div>
              <div class="flag" v-if="key == 'MYR'"><img src="../../../assets/img/flags/MYR.png"/></div>
              <div class="flag" v-if="key == 'NZD'"><img src="../../../assets/img/flags/NZD.png"/></div>
              <div class="flag" v-if="key == 'PLN'"><img src="../../../assets/img/flags/PLN.png"/></div>
              <div class="flag" v-if="key == 'SEK'"><img src="../../../assets/img/flags/SEK.png"/></div>
              <div class="flag" v-if="key == 'RUB'"><img src="../../../assets/img/flags/RUB.png"/></div>
              <div class="flag" v-if="key == 'CNY'"><img src="../../../assets/img/flags/CYN.png"/></div>
              <div class="flag" v-if="key == 'SGD'"><img src="../../../assets/img/flags/SGD.png"/></div>
              <div class="flag" v-if="key == 'CHF'"><img src="../../../assets/img/flags/CHF.png"/></div>
              <div class="flag" v-if="key == 'INR'"><img src="../../../assets/img/flags/INR.png"/></div>
            </div>
            <div class="toSymbol" v-if="showFlag === false"><span>{{ key }}</span>
            </div>
          </div>
          <div class="rate">
            {{ value.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { CurrencyOrbitSpinner } from 'epic-spinners'
export default {
  props: ['currency', 'theId'],
  data () {
    return {
      loading: true,
      edit: false,
      randomNumber: 3,
      timer: '',
      base: 'EUR',
      editedBase: '',
      selectedCurrencies: ['EUR'],
      editedSelectedCurrencies: ['EUR'],
      currency5Rate: '',
      allRates: '',
      showFlag: true,
      editedShowFlag: true,
      items: ['USD', 'EUR', 'GBP', 'AUD', 'BRL', 'BGN', 'CNY', 'HRK', 'CZK', 'DKK', 'HKD', 'HUF', 'ISK', 'INR', 'IDR', 'ILS', 'JPY', 'MYR', 'MXN', 'NZD', 'NOK', 'PHP', 'PLN', 'RON', 'RUB', 'SGD', 'ZAR', 'KRW', 'SEK', 'CHF', 'THB', 'TRY'],
      value: ['USD', 'EUR', 'GBP', 'AUD', 'BRL', 'BGN', 'CNY', 'HRK', 'CZK', 'DKK', 'HKD', 'HUF', 'ISK', 'INR', 'IDR', 'ILS', 'JPY', 'MYR', 'MXN', 'NZD', 'NOK', 'PHP', 'PLN', 'RON', 'RUB', 'SGD', 'ZAR', 'KRW', 'SEK', 'CHF', 'THB', 'TRY']
    }
  },
  components: {
    CurrencyOrbitSpinner
  },
  created () {
    this.base = this.currency.base
    this.editedBase = this.currency.base
    this.selectedCurrencies = this.currency.selectedCurrencies
    this.editedSelectedCurrencies = this.currency.selectedCurrencies
    this.showFlag = this.currency.showFlag
    this.editedShowFlag = this.currency.showFlag
  },
  mounted () {
    setTimeout(this.getCurrency, 3000)
  },
  methods: {
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
    },
    onChangeCurrency (payload) {
      this.loading = true
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        currency: this.consolidated
      })
      setTimeout(this.getCurrency, 3000)
      this.selectedCurrencies = this.editedSelectedCurrencies
      this.base = this.editedBase
      this.showFlag = this.editedShowFlag
      this.edit = false
    },
    getCurrency () {
      axios.get('https://api.exchangeratesapi.io/latest?base=' + this.base + '&symbols=' + this.selectedCurrencies, {
      })
      .then(response => {
        this.allRates = response.data.rates
      })
      this.loading = false
    }
  },
  computed: {
    consolidated () {
      return {
        base: this.base,
        selectedCurrencies: this.editedSelectedCurrencies,
        showFlag: this.editedShowFlag
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .theCurrency {
//   display: inline-block;
//   width: 100%;
//   margin-bottom: 10px;
// }
// .baseCurrency {
//   float: left;
//   width: 30%;
// }
// .toCurrency {
//   float: left;
//   width: 30%;
// }
// .rate {
//   float: left;
//   width: 30%;
// }
// .flag img {
//   width: 42px;
//   float: left;
// }
// .baseSymbol {
//   text-align: left;
//   margin-left: 10px;
// }
// .baseSymbol span {
//   font-size: 1.4vw;
//   padding-left: 10px;
// }
// .baseDesc {
//   position: relative;
//     top: -8px;
//     left: 10px;
//     font-size: .8vw;
// }
// .toSymbol {
//   text-align: left;
// }
// .toSymbol span {
//   font-size: 1.4vw;
//   padding-left: 10px;
// }
// .toDesc {
//   position: relative;
//     top: -8px;
//     left: 10px;
//     font-size: .8vw;
// }
// .rate {
//   font-size: 2rem;
//   text-align: left;
// }

#pleasingLayout {
  .flag {
    img {
     width: 20px;
   }
  }
  #leftBlock {
    .theCurrency {
      clear: both;
      display: block;
      float: left;
      text-align: left;
      display: flex;
      .toDesc {
        display: none;
      }
      .baseCurrency {
        width: 44px;
        text-align: center;
        .baseSymbol {
          span {
            font-weight: bold;
          }
        }
        .baseDesc {
          display: none;
        }
      }
      .toCurrency {
        width: 44px;
        text-align: center;
        .toSymbol {
          span {
            font-weight: bold;
          }
        }
        .toDesc {
          display: none;
        }
      }
      .baseSymbol {
        padding-right: 8px;
      }
      .rate {
        font-weight: bold;
        text-align: right;
        width: 80px;
        font-size: 1.2rem;
        position: relative;
        top: -4px;
      }
    }
  }
  #rightBlock {
    .theCurrency {
      clear: both;
      display: block;
      float: right;
      text-align: left;
      display: flex;
      p {
        text-align: right;
      }
      .baseCurrency {
        width: 44px;
        text-align: center;
        .baseSymbol {
          span {
            font-weight: bold;
          }
        }
        .baseDesc {
          display: none;
        }
      }
      .toCurrency {
        width: 44px;
        text-align: center;
        .toSymbol {
          span {
            font-weight: bold;
          }
        }
        .toDesc {
          display: none;
        }
      }
      .baseSymbol {
        padding-right: 8px;
      }
      .rate {
        font-weight: bold;
        text-align: right;
        width: 80px;
        font-size: 1.2rem;
        position: relative;
        top: -4px;
      }
    }
  }
  #footerBlock {
    .theCurrency {
      width: 20%;
      clear: none;
      display: inline-block;
      float: left;
      display: flex;
      text-align: center;
      p {
      }
      .baseCurrency {
        width: 33%;
        text-align: center;
        .baseSymbol {
          span {
            font-weight: bold;
          }
        }
        .baseDesc {
          display: none;
        }
      }
      .toCurrency {
        width: 33%;
        text-align: center;
        .toSymbol {
          span {
            font-weight: bold;
          }
        }
        .toDesc {
          display: none;
        }
      }
      .baseSymbol {
        padding-right: 8px;
      }
      .rate {
        font-weight: bold;
        text-align: center;
        width: 33%;
        font-size: 1.8rem;
        position: relative;
        top: -8px;
      }
    }
  }
}

</style>
