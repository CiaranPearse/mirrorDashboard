<template>
	<div>
  <v-container>
  	<v-layout row>
  		<v-flex xs12>
  			<h4>Create a new Dashboard</h4>
  		</v-flex>
  	</v-layout>
    <v-layout row>
    	<v-flex xs12>
    		<form @submit.prevent="onCreateDashboard">
    			<v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                name="dashTitle"
                label="Name this Dashboard"
                id="dashTitle"
                v-model="dashTitle"
                :messages="['Give it a name so you know what it\'s for']"
                required
                >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                name="deviceId"
                label="Enter your Device ID"
                id="deviceId"
                v-model="deviceId"
                :messages="['You can find this on a sticker on your device.']"
                required
                >
              </v-text-field>
            </v-flex>
          </v-layout>
    			<v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                name="Dashboard Location"
                label="Where is your device located"
                id="location"
                v-model="location"
                required
                >
              </v-text-field>
            </v-flex>
    			</v-layout>
    			<v-layout row>
    				<v-flex xs3 offset-xs9>
    					<v-btn :disabled="!formIsValid" type="submit">Create Dashboard</v-btn>
    				</v-flex>
    			</v-layout>
    		</form>
    	</v-flex>
    </v-layout>
    </v-container>
</div>
</template>


<script>
export default {
  props: ['id'],
  data () {
    return {
      loading: false,
      items: [],
      messageTitle: '',
      messageSubtitle: '',
      dashTitle: '',
      deviceId: '',
      location: '',
      created: '',
      updated: ''
    }
  },
  computed: {
    formIsValid () {
      return this.deviceId !== '' && this.location !== '' && this.dashTitle !== ''
    }
  },
  methods: {
    onCreateDashboard () {
      if (!this.formIsValid) {
        return
      }
      const dateNow = new Date()
      const dashboardData = {
        dashTitle: this.dashTitle,
        deviceId: this.deviceId,
        deviceLocation: this.location,
        created: dateNow.toISOString(),
        updated: dateNow.toISOString()
      }
      this.$store.dispatch('createDashboard', dashboardData)
      this.$router.push('/dashboards')
    }
  }
}
</script>




<style>
  .pictureFrameData {
    background: url(../../assets/img/bedroom1.jpg);
    background-size: cover;
  }
  .dashedBorder {
  	border: 1px #fff dashed;
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
  .innerDotted {
  	border: 1px gray dotted;
  	margin: 4px;
  	padding: 10px;
  }
  .pictureFrameData {
    min-height: 800px;
  }
  .pictureFrameMain {
    height: 90%;
  }
  .pictureFrameFooter {
    height: 10%;
  }
  .picture-frame {
  background-color:black;
  border:black solid 40px;
  -webkit-box-shadow: 4px 13px 59px 8px rgba(0,0,0,0.75);
-moz-box-shadow: 4px 13px 59px 8px rgba(0,0,0,0.75);
box-shadow: 4px 13px 59px 8px rgba(0,0,0,0.75);
  margin:40px;
  min-height: 800px;
}
.matte {
  background-color:#000;
  height:100%;
  -webkit-box-shadow: inset 10px 10px 37px 0px rgba(0,0,0,0.75);
-moz-box-shadow: inset 10px 10px 37px 0px rgba(0,0,0,0.75);
box-shadow: inset 10px 10px 37px 0px rgba(0,0,0,0.75);
}

.art {
  width:80%;
  margin:10% 10% 10% 10%;
}
</style>