<template>
  <div><h1>This is crypto Ticker</h1></div>
</template>

<script>

export default {
  data () {
    return {
      randomNumber: 3,
      timer: ''
    }
  },
  mounted () {
    this.$options.interval = setInterval(this.changedNumber, 10000)
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  },
  methods: {
    changedNumber () {
      var ticker = Math.floor(Math.random() * 10) + 1
      this.randomNumber = ticker
    }
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
