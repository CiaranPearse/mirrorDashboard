<template>
    <div v-if="loading === true">
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
              <v-switch
                label="Show Seconds"
                v-model="showSeconds"
              ></v-switch>
              <v-switch
                label="Show Day"
                v-model="showDay"
              ></v-switch>
              <v-switch
                label="Show Date"
                v-model="showDate"
              ></v-switch>

          <v-btn color="red" @click="onCloseEdit">Close</v-btn>
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
            <span v-else>
              <span v-if="timeFormat == '12Hour'" class="showAmPmLarge">{{ this.hourtime }}</span>
            </span>
        	</div>
          <div class="clearboth"></div>
          <div class="dateday">
          	<div class="dayName" v-if="this.showDay != false">
          		{{ this.dayName[dayNumber - 1] }}
          	</div>
          	<div class="date" v-if="this.showDate != false">
          		{{ this.monthName[month] }} {{ this.thedate }}
          	</div>
          </div>
        </div>
      </div>
      <div class="clearboth"></div>
  </div>
</template>

<script>
import { getHourTime, getZeroPad } from './Filters'
export default {
  props: ['clock', 'theId'],
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
      milHours: 0,
      minutes: 0,
      seconds: 0,
      UStime: 0,
      showSeconds: true,
      showDay: true,
      showDate: true,
      hourtime: '',
      edit: false,
      timeFormat: '',
      switch1: true
    }
  },
  mounted () {
    this.$options.interval = setInterval(this.updateDateTime, 1000)
    this.timeFormat = this.clock.timeFormat
    this.showDay = this.clock.showDay
    this.showDate = this.clock.showDate
    this.showSeconds = this.clock.showSeconds
    this.loading = false
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
      this.$store.dispatch('updateWidgetData', {
        id: this.theId,
        clock: this.consolidated
      })
      this.edit = false
    }
  },
  watch: {
    clock: function (newVal, oldVal) {
      this.timeFormat = newVal.timeFormat
      this.showDay = newVal.showDay
      this.showDate = newVal.showDate
      this.showSeconds = newVal.showSeconds
    }
  },
  computed: {
    consolidated () {
      return {
        timeFormat: this.timeFormat,
        showDay: this.showDay,
        showDate: this.showDate,
        showSeconds: this.showSeconds
      }
    }
  }
}
</script>

<style>
.clearboth {
  clear: both;
}
.clock {
    font-family: 'Roboto', sans-serif;
    font-weight: 100;
    color: #ffffff;
    text-align: right;
    width: 200px;
    float: right;
}
.time { 
    font-size: 3rem;
    max-height: 54px;
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

.leftBlock .clock {
  text-align: left;
  float: left;
}
.leftBlock .showAmPm {
  left: 86px;
}

.centerBlock .clock {
  margin: 0 auto;
  text-align: center;
  float: none;
  width: 40%;
  min-height: 144px;
}

.centerBlock .time {
    font-size: 6rem;
}

.centerBlock .showSeconds {
    font-size: 2.7rem;
    top: -30px;
}

.centerBlock .showAmPm {
    font-size: 2.3rem;
    left: 86px;
    top: -40px;
}

.centerBlock .dateday {
  position: relative;
  top: 48px;
}

.centerBlock .date {
    float: none;
  display: inline-block;
}
.centerBlock .dayName {
  float: none;
  display: inline-block;
}
</style>
