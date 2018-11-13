<template>
    <div v-if="loading">
      <v-progress-circular
      indeterminate
      color="white"
      ></v-progress-circular><br />
      Loading Clock
      </div>
    </div>
    <div v-else>
      <div v-if="edit">
        <h4>Configure Clock</h4>
            <form @submit.prevent="onChangeClock">
              <v-radio-group v-model="timeFormat">
                <v-radio label="12 Hour" value="12Hour"></v-radio>
                <v-radio label="24 Hour" value="24Hour"></v-radio>
              </v-radio-group>
          <v-btn color="red" @click="onCloseEdit" type="submit">Close</v-btn>
          <v-btn color="green" type="submit">Update Clock</v-btn>
          </form>
      </div>
      <div v-else @click="onClickEdit" class="hoverCursor">
        <div class="clock" v-if="hourtime != ''">
          <div class="time">
              {{ this.hours }}:{{ this.minutes }}
            <span class="showSeconds" v-if="showSeconds != false">
              {{ this.seconds }} <span v-if="timeFormat == '12Hour'" class="showAmPm">{{ this.hourtime }}</span>
            </span>
        	</div>
        	<div class="dayName">
        		{{ this.dayName[dayNumber - 1] }}
        	</div>
        	<div class="date">
        		{{ this.monthName[month] }} {{ this.thedate }}
        	</div>
        </div>
      </div>
  </div>
</template>

<script>
import { getHourTime, getZeroPad } from './Filters'
export default {
  props: ['clock'],
  data () {
    return {
      loading: true,
      thedate: 0,
      month: 0,
      year: 0,
      dayNumber: 0,
      dayName: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      monthName: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      hours: 0,
      minutes: 0,
      seconds: 0,
      UStime: 0,
      showSeconds: true,
      edit: false,
      timeFormat: '24Hour',
      switch1: true
    }
  },
  mounted () {
    this.$options.interval = setInterval(this.updateDateTime, 1000)
    this.loading = false
    this.timeFormat = this.clock
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
      if ((this.hourtime === 'AM') && (this.timeFormat === '24Hour') && (this.hours <= 9)) {
        this.hours = ('0' + this.hours)
      }
      if ((this.hourtime === 'PM') && (this.timeFormat === '24Hour')) {
        this.hours = (this.hours + 12)
      }
    },
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
    },
    onChangeClock (payload) {
      this.$emit('updateClock', this.timeFormat)
      this.edit = false
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
.showSeconds {
  font-size: 1.7rem;
  position: relative;
  top: -12px;
}
.showAmPm {
  position: relative;
  top: -21px;
  font-size: 1.3rem;
  display: block;
}
</style>
