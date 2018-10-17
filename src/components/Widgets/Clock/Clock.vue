<template>
  <div class="clock" v-if="hourtime != ''">
    <div class="time">
      {{ this.hours }}:{{ this.minutes }}
  	</div>
  	<div class="dayName">
  		{{ this.dayName[dayNumber - 1] }}
  	</div>
  	<div class="date">
  		{{ this.monthName[month] }} {{ this.thedate }}
  	</div>
  </div>
</template>

<script>
import { getHourTime, getZeroPad } from './Filters'
export default {
  data () {
    return {
      thedate: 0,
      month: 0,
      year: 0,
      dayNumber: 0,
      dayName: ['Monday', 'Tuesdau', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      monthName: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      hours: 0,
      minutes: 0,
      seconds: 0,
      hourtime: ''
    }
  },
  mounted () {
    this.$options.interval = setInterval(this.updateDateTime, 1000)
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  },
  methods: {
    updateDateTime () {
      let now = new Date()
      this.year = now.getFullYear()
      this.thedate = now.getDate()
      this.month = now.getMonth()
      this.dayNumber = now.getDay()
      this.hours = now.getHours()
      this.minutes = getZeroPad(now.getMinutes())
      this.seconds = getZeroPad(now.getSeconds())
      this.hourtime = getHourTime(this.hours)
      this.hours = this.hours % 12 || 12
    }
  }
}
</script>

<style>
.clock {
    font-family: 'Roboto', sans-serif;
    font-weight: 100;
    color: #ffffff;
    text-align: right;
}
.time { 
    font-size: 3rem;
}
.time div {
	display: inline-block;
}
.date {
    font-size: 18px;
}
.dayName {
	font-size: 18px;
}
</style>
