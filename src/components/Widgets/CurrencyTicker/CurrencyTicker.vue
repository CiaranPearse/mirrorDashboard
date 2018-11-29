<template>
  <div v-if="loading == true">
    <v-progress-circular
      indeterminate
      color="white"
      ></v-progress-circular>
      <p>Loading Exchange Rates</p>
  </div>
  <div v-else>
    <div v-if="edit == true">
      <form @submit.prevent="onChangeCurrency">
      Base:<br />
      <v-radio-group v-model="base" :mandatory="true">
        <v-radio label="Euro" value="EUR"></v-radio>
        <v-radio label="US Dollar" value="USD"></v-radio>
        <v-radio label="British Pound" value="GBP"></v-radio>
      </v-radio-group>


      Choose up to 5<br />
      <div>
        <v-checkbox v-model="selectedCurrencies" value="USD" label="US Dollar"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="EUR" label="Euro"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="GBP" label="British Pound"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="AUD" label="Australian Dollar"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="BRL" label="Brazilian Real"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="BGN" label="Bulgarian lev"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="CNY" label="Chinese Yuan"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="HRK" label="Croatian Kuna"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="CZK" label="Czech Koruna"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="DKK" label="Danish Krone"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="HKD" label="Hong Kong Dollar"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="HUF" label="Hungarian Forint"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="ISK" label="Icelandic Krona"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="INR" label="Indian Rupee"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="IDR" label="Indonesian Rupiah"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="ILS" label="Israeli Shekel"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="JPY" label="Japanese Yen"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="MYR" label="Malaysian Ringgit"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="MXN" label="Mexican Peso"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="NZD" label="New Zealand Dollar"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="NOK" label="Norwegian Krone"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="PHP" label="Philippine Peso"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="PLN" label="Polish Zloty"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="RON" label="Romanian Leu"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="RUB" label="Russian Ruble"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="SGD" label="Singapore Dollar"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="ZAR" label="South African Rand"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="KRW" label="South Korean Won"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="SEK" label="Swedish Krona"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="CHF" label="Swiss Franc"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="THB" label="Thai Bhat"></v-checkbox>
        <v-checkbox v-model="selectedCurrencies" value="TRY" label="Turkish Lira"></v-checkbox>
      </div>

      <v-btn color="red" @click="onCloseEdit">Close</v-btn>
      <v-btn color="green" type="submit">Update Currency</v-btn>
      </form>
      
    </div>
    <div v-else @click="onClickEdit">
      <h1>This is Currency Ticker</h1>
      <div v-for="(value, key, index) in allRates">
        <div class="theCurrency">
          <div class="baseCurrency">
            <div class="flag" v-if="base == 'USD'"><img src="../../../assets/img/flags/USD.png"/></div>
            <div class="flag" v-if="base == 'EUR'"><img src="../../../assets/img/flags/EUR.png"/></div>
            <div class="flag" v-if="base == 'BGN'"><img src="../../../assets/img/flags/BGN.png"/></div>
            <div class="flag" v-if="base == 'BRL'"><img src="../../../assets/img/flags/BRL.png"/></div>
            <div class="flag" v-if="base == 'HUF'"><img src="../../../assets/img/flags/HUF.png"/></div>
            <div class="flag" v-if="base == 'DKK'"><img src="../../../assets/img/flags/DKK.png"/></div>
            <div class="flag" v-if="base == 'JPY'"><img src="../../../assets/img/flags/JPY.png"/></div>
            <div class="flag" v-if="base == 'ILS'"><img src="../../../assets/img/flags/ILS.png"/></div>
            <div class="flag" v-if="base == 'TRY'"><img src="../../../assets/img/flags/TRY.png"/></div>
            <div class="flag" v-if="base == 'RON'"><img src="../../../assets/img/flags/RON.png"/></div>
            <div class="flag" v-if="base == 'GBP'"><img src="../../../assets/img/flags/GBP.png"/></div>
            <div class="flag" v-if="base == 'PHP'"><img src="../../../assets/img/flags/PHP.png"/></div>
            <div class="flag" v-if="base == 'HRK'"><img src="../../../assets/img/flags/HRK.png"/></div>
            <div class="flag" v-if="base == 'NOK'"><img src="../../../assets/img/flags/NOK.png"/></div>
            <div class="flag" v-if="base == 'MXN'"><img src="../../../assets/img/flags/MXN.png"/></div>
            <div class="flag" v-if="base == 'AUD'"><img src="../../../assets/img/flags/AUD.png"/></div>
            <div class="flag" v-if="base == 'IDR'"><img src="../../../assets/img/flags/IDR.png"/></div>
            <div class="flag" v-if="base == 'KRW'"><img src="../../../assets/img/flags/KRW.png"/></div>
            <div class="flag" v-if="base == 'HKD'"><img src="../../../assets/img/flags/HKD.png"/></div>
            <div class="flag" v-if="base == 'ZAR'"><img src="../../../assets/img/flags/ZAR.png"/></div>
            <div class="flag" v-if="base == 'ISK'"><img src="../../../assets/img/flags/ISK.png"/></div>
            <div class="flag" v-if="base == 'CZK'"><img src="../../../assets/img/flags/CZK.png"/></div>
            <div class="flag" v-if="base == 'THB'"><img src="../../../assets/img/flags/THB.png"/></div>
            <div class="flag" v-if="base == 'MYR'"><img src="../../../assets/img/flags/MYR.png"/></div>
            <div class="flag" v-if="base == 'NZD'"><img src="../../../assets/img/flags/NZD.png"/></div>
            <div class="flag" v-if="base == 'PLN'"><img src="../../../assets/img/flags/PLN.png"/></div>
            <div class="flag" v-if="base == 'SEK'"><img src="../../../assets/img/flags/SEK.png"/></div>
            <div class="flag" v-if="base == 'RUB'"><img src="../../../assets/img/flags/RUB.png"/></div>
            <div class="flag" v-if="base == 'CNY'"><img src="../../../assets/img/flags/CYN.png"/></div>
            <div class="flag" v-if="base == 'SGD'"><img src="../../../assets/img/flags/SGD.png"/></div>
            <div class="flag" v-if="base == 'CHF'"><img src="../../../assets/img/flags/CHF.png"/></div>
            <div class="flag" v-if="base == 'INR'"><img src="../../../assets/img/flags/INR.png"/></div>
            <div class="baseSymbol"><span>{{ base }}</span>
              <div class="baseDesc" v-if="base == 'USD'">US Dollar</div>
              <div class="baseDesc" v-if="base == 'EUR'">Euro</div>
              <div class="baseDesc" v-if="base == 'BGN'">Bulgarian lev</div>
              <div class="baseDesc" v-if="base == 'BRL'">Brazilian Real</div>
              <div class="baseDesc" v-if="base == 'HUF'">Hungarian Forint</div>
              <div class="baseDesc" v-if="base == 'DKK'">Danish Krone</div>
              <div class="baseDesc" v-if="base == 'JPY'">Japanese Yen</div>
              <div class="baseDesc" v-if="base == 'ILS'">Israeli Shekel</div>
              <div class="baseDesc" v-if="base == 'TRY'">Turkish Lira</div>
              <div class="baseDesc" v-if="base == 'RON'">Romanian Leu</div>
              <div class="baseDesc" v-if="base == 'GBP'">British Pound</div>
              <div class="baseDesc" v-if="base == 'PHP'">Philippine Peso</div>
              <div class="baseDesc" v-if="base == 'HRK'">Croatian Kuna</div>
              <div class="baseDesc" v-if="base == 'NOK'">Norwegian Krone</div>
              <div class="baseDesc" v-if="base == 'MXN'">Mexican Peso</div>
              <div class="baseDesc" v-if="base == 'AUD'">Australian Dollar</div>
              <div class="baseDesc" v-if="base == 'IDR'">Indonesian Rupiah</div>
              <div class="baseDesc" v-if="base == 'KRW'">South Korean Won</div>
              <div class="baseDesc" v-if="base == 'HKD'">Hong Kong Dollar</div>
              <div class="baseDesc" v-if="base == 'ZAR'">South African Rand</div>
              <div class="baseDesc" v-if="base == 'ISK'">Icelandic Krona</div>
              <div class="baseDesc" v-if="base == 'CZK'">Czech Koruna</div>
              <div class="baseDesc" v-if="base == 'THB'">Thai Bhat</div>
              <div class="baseDesc" v-if="base == 'MYR'">Malaysian Ringgit</div>
              <div class="baseDesc" v-if="base == 'NZD'">New Zealand Dollar</div>
              <div class="baseDesc" v-if="base == 'PLN'">Polish Zloty</div>
              <div class="baseDesc" v-if="base == 'SEK'">Swedish Krona</div>
              <div class="baseDesc" v-if="base == 'RUB'">Russian Ruble</div>
              <div class="baseDesc" v-if="base == 'CNY'">Chinese Yuan</div>
              <div class="baseDesc" v-if="base == 'SGD'">Singapore Dollar</div>
              <div class="baseDesc" v-if="base == 'CHF'">Swiss Franc</div>
              <div class="baseDesc" v-if="base == 'INR'">Indian Rupee</div>
            </div>
          </div>
          <div class="toCurrency">
            <div class="flag" :class="key">
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
            <div class="toSymbol"><span>{{ key }}</span>
              <div class="toDesc" v-if="key == 'USD'">US Dollar</div>
              <div class="toDesc" v-if="key == 'EUR'">Euro</div>
              <div class="toDesc" v-if="key == 'BGN'">Bulgarian lev</div>
              <div class="toDesc" v-if="key == 'BRL'">Brazilian Real</div>
              <div class="toDesc" v-if="key == 'HUF'">Hungarian Forint</div>
              <div class="toDesc" v-if="key == 'DKK'">Danish Krone</div>
              <div class="toDesc" v-if="key == 'JPY'">Japanese Yen</div>
              <div class="toDesc" v-if="key == 'ILS'">Israeli Shekel</div>
              <div class="toDesc" v-if="key == 'TRY'">Turkish Lira</div>
              <div class="toDesc" v-if="key == 'RON'">Romanian Leu</div>
              <div class="toDesc" v-if="key == 'GBP'">British Pound</div>
              <div class="toDesc" v-if="key == 'PHP'">Philippine Peso</div>
              <div class="toDesc" v-if="key == 'HRK'">Croatian Kuna</div>
              <div class="toDesc" v-if="key == 'NOK'">Norwegian Krone</div>
              <div class="toDesc" v-if="key == 'MXN'">Mexican Peso</div>
              <div class="toDesc" v-if="key == 'AUD'">Australian Dollar</div>
              <div class="toDesc" v-if="key == 'IDR'">Indonesian Rupiah</div>
              <div class="toDesc" v-if="key == 'KRW'">South Korean Won</div>
              <div class="toDesc" v-if="key == 'HKD'">Hong Kong Dollar</div>
              <div class="toDesc" v-if="key == 'ZAR'">South African Rand</div>
              <div class="toDesc" v-if="key == 'ISK'">Icelandic Krona</div>
              <div class="toDesc" v-if="key == 'CZK'">Czech Koruna</div>
              <div class="toDesc" v-if="key == 'THB'">Thai Bhat</div>
              <div class="toDesc" v-if="key == 'MYR'">Malaysian Ringgit</div>
              <div class="toDesc" v-if="key == 'NZD'">New Zealand Dollar</div>
              <div class="toDesc" v-if="key == 'PLN'">Polish Zloty</div>
              <div class="toDesc" v-if="key == 'SEK'">Swedish Krona</div>
              <div class="toDesc" v-if="key == 'RUB'">Russian Ruble</div>
              <div class="toDesc" v-if="key == 'CNY'">Chinese Yuan</div>
              <div class="toDesc" v-if="key == 'SGD'">Singapore Dollar</div>
              <div class="toDesc" v-if="key == 'CHF'">Swiss Franc</div>
              <div class="toDesc" v-if="key == 'INR'">Indian Rupee</div>
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
export default {
  props: ['currency', 'theId'],
  data () {
    return {
      loading: true,
      edit: false,
      randomNumber: 3,
      timer: '',
      base: 'EUR',
      selectedCurrencies: ['EUR'],
      currency5Rate: '',
      allRates: ''
    }
  },
  created () {
    this.base = this.currency.base
    this.selectedCurrencies = this.currency.selectedCurrencies
  },
  mounted () {
    // const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    var baseCurrency = this.base
    axios.get('https://api.exchangeratesapi.io/latest?base=' + baseCurrency + '&symbols=' + this.selectedCurrencies, {
    })
    .then(response => {
      console.log(response.data.rates)
      this.allRates = response.data.rates
    })
    this.loading = false
  },
  methods: {
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
    },
    onChangeCurrency (payload) {
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        currency: this.consolidated
      })
      console.log('changed currency')
      this.edit = false
    }
  },
  computed: {
    consolidated () {
      return {
        base: this.base,
        selectedCurrencies: this.selectedCurrencies
      }
    }
  }
}
</script>

<style>
.theCurrency {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
}
.baseCurrency {
  float: left;
  width: 30%;
}
.toCurrency {
  float: left;
  width: 30%;
}
.rate {
  float: left;
  width: 30%;
}
.flag img {
  width: 42px;
  float: left;
}
.baseSymbol {
  text-align: left;
  margin-left: 10px;
}
.baseSymbol span {
  font-size: 1.4vw;
  padding-left: 10px;
}
.baseDesc {
  position: relative;
    top: -8px;
    left: 10px;
    font-size: .8vw;
}
.toSymbol {
  text-align: left;
}
.toSymbol span {
  font-size: 1.4vw;
  padding-left: 10px;
}
.toDesc {
  position: relative;
    top: -8px;
    left: 10px;
    font-size: .8vw;
}
.rate {
  font-size: 2rem;
  text-align: left;
}

</style>
