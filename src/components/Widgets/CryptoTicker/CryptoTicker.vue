<template>
  <div>
    <h1>Crypto Ticker</h1>
    <div v-if="rates">
      <p>BASE: {{ base }}<br/>Currency1: {{ currency1 }}<br/>Currency2: {{ currency2 }}</p>
    </div>
    <div v-else>
      No Currency Settings
    </div>
  </div>
</template>

<script>

export default {
  props: ['rates'],
  data () {
    return {
      randomNumber: 3,
      timer: '',
      base: null,
      currency1: null,
      currency2: null
    }
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  },
  methods: {
    changedNumber () {
      var ticker = Math.floor(Math.random() * 10) + 1
      this.randomNumber = ticker
    }
  },
  mounted () {
    this.$options.interval = setInterval(this.changedNumber, 10000)
    this.base = this.rates.base
    this.currency1 = this.rates.currency1
    this.currency2 = this.rates.currency2
  }
}
</script>

<style>
.quotes{
  margin-top: -10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  color: #ffffff;
  text-align: center;
}

.quote{
  font-size: 24px;
  margin: 0px;
}
.author{
  font-size: 16px;
  margin: 0px;
}
</style>
