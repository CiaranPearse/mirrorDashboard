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
      <form @submit.prevent="onChangeMessage">
          <v-text-field
        v-model="messageTitle"
        label="Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="messageSubtitle"
        label="Subtitle"
      ></v-text-field>
      <v-btn color="red" @click="onCloseEdit">Close</v-btn>
      <v-btn color="green" :disabled="!formIsValid" type="submit">Add Message</v-btn>
      </form>
    </div>
    <div v-else @click="onClickEdit" class="hoverCursor">
      <h1 v-if="messageTitle">{{ messageTitle }}</h1>
      <h1 v-else>Placeholder Title</h1>
      <p v-if="messageSubtitle">{{ messageSubtitle }}</p>
      <p v-else>Placeholder Subtitle</p>
    </div>
  </div>
</template>

<script>

export default {
  props: ['message'],
  data () {
    return {
      loading: true,
      edit: false,
      messageTitle: 'Placeholder Title',
      messageSubtitle: 'Placeholder Subtitle'
    }
  },
  methods: {
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
    },
    onChangeMessage (payload) {
      this.$emit('updateMessage', this.consolidated)
      this.edit = false
    }
  },
  mounted () {
    this.loading = false
    this.messageTitle = this.message.welcomeMessageTitle
    this.messageSubtitle = this.message.welcomeMessageSubtitle
  },
  watch: {
    message: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.messageTitle = this.message.welcomeMessageTitle
      this.messageSubtitle = this.message.welcomeMessageSubtitle
    }
  },
  computed: {
    formIsValid () {
      return this.messageTitle !== ''
    },
    consolidated () {
      return {
        welcomeMessageTitle: this.messageTitle,
        welcomeMessageSubtitle: this.messageSubtitle
      }
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
