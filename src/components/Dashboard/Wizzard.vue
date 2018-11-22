<template>
	<div v-if="loading">
		<h1>PAGE IS LOADING</h1>
	</div>
	<div v-else>
    <v-container>
  	  <v-layout row>
  		  <v-flex xs12>
  			  <h4>Dashboard Wizzard</h4>
  		  </v-flex>
  	  </v-layout>
  	  <div v-if="this.dashboardTitle == ''">
  	  	<h3>Something went wrong - please start again</h3>
  	  </div>
  	  <div v-else>
	      <v-layout row>
	    	  <v-flex xs12>
	    	  	<p>Welcome to the dashboard wizzard {{ this.dashboardTitle }}</p>
	    	  	<v-stepper v-model="e1">
					    <v-stepper-header>
					      <v-stepper-step :complete="e1 > 1" step="1">Dashboard Details</v-stepper-step>

					      <v-divider></v-divider>

					      <v-stepper-step :complete="e1 > 2" step="2">Layout</v-stepper-step>

					      <v-divider></v-divider>

					      <v-stepper-step :complete="e1 > 3" step="3">Choose Widgets</v-stepper-step>

					      <v-divider></v-divider>

					      <v-stepper-step step="4">Widget Settings</v-stepper-step>
					    </v-stepper-header>

					    <v-stepper-items>
					    	<form @submit.prevent="onWizzardSave">
					      <v-stepper-content step="1">
					        <v-card
					          class="mb-5"
					        >
<!-- CONTENT FOR STEP 1 -->
									<h3>Dashboard Details</h3>
									<v-layout>
										<v-flex xs3></v-flex>
                      <v-flex xs4>
                        <v-card-text>
                          <v-text-field
                            name="dashboardTitle"
                            label="Name this Dashboard"
                            id="dashboardTitle"
                            v-model="dashboardTitle"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field
                            name="dashboardId"
                            label="Your Dashboard ID"
                            id="dashboardId"
                            disabled
                            v-model="dashboardId"
                            :messages="['(You cannot change this)']"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
                        <v-card-text>
                          <v-text-field
                            name="dashboardLocation"
                            label="Where is your dashboard located?"
                            id="dashboardLocation"
                            v-model="dashboardLocation"
                            required
                            >
                          </v-text-field>
                        </v-card-text>
										</v-flex>
									</v-layout>
<!-- END CONTENT FOR STEP 1 -->
					        </v-card>

					        <v-btn
					          color="primary"
					          @click="e1 = 2"
					        >
					          Continue
					        </v-btn>

					        <v-btn flat>Cancel</v-btn>
					      </v-stepper-content>

					      <v-stepper-content step="2">
					        <v-card
					        >
<!-- CONTENT FOR STEP 2 -->
										<v-layout>
											<v-flex xs1></v-flex>
											<v-flex xs3>
												<h3>Device</h3>
												<v-radio-group v-model="dashboardDevice" column>
                          <v-radio value="tablet">
                            <div slot="label">Tablet</strong></div>
                          </v-radio>
                          <v-radio value="monitor">
                            <div slot="label">Monitor</div>
                          </v-radio>
                          <v-radio value="kiosk">
                            <div slot="label">Kiosk</div>
                          </v-radio>
                          <v-radio value="mirror">
                            <div slot="label">Mirror</div>
                          </v-radio>
                        </v-radio-group>
											</v-flex>

											<v-flex xs8>
												<h3>Layout</h3>
												<v-radio-group v-model="dashboardLayout" row>
													<v-radio value="l3m3r3b1" v-if="dashboardDevice == 'monitor' || dashboardDevice == 'kiosk' || dashboardDevice == 'mirror'">
														<div slot="label">
															<img src="../../assets/img/layouts/layout1.png" class="layoutImg">
														</div>	
													</v-radio>
													<v-radio value="222" v-if="dashboardDevice == 'monitor' || dashboardDevice == 'kiosk' || dashboardDevice == 'mirror'">
														<div slot="label">
													 		<img src="../../assets/img/layouts/layout2.png" class="layoutImg">
													 	</div>
													</v-radio>
													<v-radio value="111">
														<div slot="label">
													 		<img src="../../assets/img/layouts/layout3.png" class="layoutImg">
													 	</div>
													</v-radio>
												</v-radio-group>
												
											</v-flex>
										</v-layout>
    
<!-- END CONTENT FOR STEP 2 -->
					        	
					        </v-card>

					        <v-btn
					          outline
					          color="primary"
					          @click="e1 = 1"
					        >
					          Back
					        </v-btn>
					        <v-btn
					          color="primary"
					          @click="e1 = 3"
					        >
					          Continue
					        </v-btn>

					        <v-btn 
					          flat
					          color="red">Cancel</v-btn>
					      </v-stepper-content>

					      <v-stepper-content step="3">
					        <v-card
					          class="mb-5"
					          height="200px"
					        >
<!-- CONTENT FOR STEP 3 -->
<h3>This is the content or step 3</h3>
<!-- END CONTENT FOR STEP 3 -->
					        </v-card>
					        <p>You must save your changes here before you can modify your widgets</p>
					        <v-btn
					          outline
					          color="primary"
					          @click="e1 = 2"
					        >
					          Back
					        </v-btn>
					        <v-btn
					          color="primary"
					          @click="e1 = 4"
					          type="submit"
					        >
					          Save &amp; Continue
					        </v-btn>

					        <v-btn flat>Cancel</v-btn>
					      </v-stepper-content>

					      <v-stepper-content step="4">
					        <v-card
					          class="mb-5"
					          height="200px"
					        >
<!-- CONTENT FOR STEP 4 -->
<h3>This is the content or step 4</h3>
<!-- END CONTENT FOR STEP 4 -->
					        </v-card>
					        <v-btn
					          outline
					          color="primary"
					          @click="e1 = 1"
					        >
					          Start Over
					        </v-btn>
					        <v-btn
					          color="primary"
					          @click=""
					        >
					          Save Widget Settings
					        </v-btn>

					        <v-btn flat>Cancel</v-btn>
					      </v-stepper-content>
					      </form>
					    </v-stepper-items>

					  </v-stepper>
	    	  </v-flex>
	      </v-layout>
	    </div>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      loading: false,
      edit: false,
      e1: 0,
      dashboardTitle: '',
      dashboardId: '',
      dashboardLocation: '',
      dashboardLayout: '',
      dashboardDevice: '',
      updated: null
    }
  },
  computed: {
    dashboard () {
      return this.$store.getters.loadedDashboard(this.id)
    }
  },
  mounted () {
    this.dashboardTitle = this.dashboard.dashTitle
    this.dashboardId = this.dashboard.deviceId
    this.dashboardLocation = this.dashboard.deviceLocation
    this.dashboardLayout = this.dashboard.deviceLayout
    this.dashboardDevice = this.dashboard.deviceType
  },
  methods: {
    onWizzardSave () {
      if (this.dashboardTitle.trim() === '' || this.dashboardLocation.trim() === '' || this.dashboardId.trim() === '') {
      }
      console.log('Submit Form')
      this.editDialog = false
      // const dateNow = new Date()
      // this.$store.dispatch('updateDashboardData', {
      //   id: this.dashboard.id,
      //   dashTitle: this.dashboardTitle,
      //   deviceId: this.dashboardId,
      //   deviceLocation: this.dashboardLocation,
      //   deviceLocation: this.dashboardLayout,
      //   deviceLocation: this.dashboardDevice,
      //   // slotLeft1: this.editedSlotLeft1,
      //   // slotLeft2: this.editedSlotLeft2,
      //   // slotLeft3: this.editedSlotLeft3,
      //   // slotCenter1: this.editedSlotCenter1,
      //   // slotCenter2: this.editedSlotCenter2,
      //   // slotCenter3: this.editedSlotCenter3,
      //   // slotRight1: this.editedSlotRight1,
      //   // slotRight2: this.editedSlotRight2,
      //   // slotRight3: this.editedSlotRight3,
      //   // slotFooter: this.editedSlotFooter,
      //   updated: dateNow.toISOString()
      // })
    }
  }
}
</script>

<style>
.layoutImg {
	width: 100px;
}
</style>