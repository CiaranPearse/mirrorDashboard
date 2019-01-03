<template>
	<v-container fill-height>
      <v-layout row v-if="loading">
        <v-flex xs12>
					<div v-if="loading === 'true'">
						<p>LOADING ...</p>
					</div>
					<div v-else>
						<v-dialog v-model="dialog" persistent max-width="290">
      <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text><p>Some of our widgets rely on location information to work.<br />By clicking the "Find Me" button below we can guess<br />
          - Your Longitude<br />
          - Your Latitude<br />
          - Your city and country<br />
          - Your local currency.<br />
          - Your Timezone<br /><br />You can enter this information manually in your profile or within the widgets if you wish.<br />
                      <a @click="userDeclinedGeo">Don't show this again</a>
                    </p></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">I'll do it myself</v-btn>
          <v-btn color="green darken-1" flat @click="getLocation">Find me</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
						<div v-if="!editing">
						  <span> {{ this.userId }} </span><br />
						  <span> {{ this.firstName }} </span><br />
						  <span> {{ this.lastName }} </span><br />
						  <span> {{ this.avatar }} </span><br />
						  <span> {{ this.currency }} </span><br />
						  <span> {{ this.location }} </span><br />
						  <span> {{ this.timeZone }} </span><br />
						  <span> {{ this.longitude }} </span><br />
						  <span> {{ this.latitude }} </span><br />
						  <span> {{ this.language }} </span><br />
						  <span> {{ this.isAdmin }} </span><br />
						  <span> {{ this.userLevel }} </span><br />
						  <span> {{ this.joinDate }} </span><br />
						</div>
						<div v-else>
							<p>Editing</p>
							<form>
                <v-flex xs12 sm6 md3>
				          <v-text-field
				            v-model="firstNameEdit"
				            label="First Name"
				            single-line
				            outline
				          ></v-text-field>
				        </v-flex>
				        <v-flex xs12 sm6 md3>
				          <v-text-field
				            v-model="lastNameEdit"
				            label="Last Name"
				            single-line
				            outline
				          ></v-text-field>
				        </v-flex>
				        <v-flex xs12 sm6 md3>
				          <v-text-field
				            v-model="avatarEdit"
				            label="Avatar"
				            single-line
				            outline
				         ></v-text-field>
				       </v-flex>
				         <v-flex xs12 sm6 md3>
				          <v-select
					          v-model="currencyEdit"
					          :items="currencyItems"
					          item-text="name"
					          item-value="code"
					          label="Select"
					          single-line
					        ></v-select>
				        </v-flex>
				        <v-flex xs12 sm6 md3>
				          <v-select
					          v-model="languageEdit"
					          :items="languageItems"
					          item-text="name"
					          item-value="code"
					          label="Select"
					          single-line
					        ></v-select>
				        </v-flex>
				        <v-flex xs12 sm6 md3>
				          <v-text-field
				            v-model="locationEdit"
				            label="Your Location"
				            single-line
				            outline
				          ></v-text-field>
				        </v-flex>
				        <v-flex xs12 sm6 md3>
				          <v-text-field
				            v-model="countryEdit"
				            label="Your Country"
				            single-line
				            outline
				          ></v-text-field>
				        </v-flex>
				        <v-flex xs12 sm6 md3>
				          <v-text-field
				            v-model="timeZoneEdit"
				            label="Timezone"
				            single-line
				            outline
				          ></v-text-field>
				        </v-flex>
				        <v-flex xs12 sm6 md3>
				          <v-text-field
				            v-model="longitudeEdit"
				            label="Longitude"
				            single-line
				            outline
				          ></v-text-field>
				        </v-flex>
				        <v-flex xs12 sm6 md3>
				          <v-text-field
				            v-model="latitudeEdit"
				            label="Latitude"
				            single-line
				            outline
				          ></v-text-field>
				        </v-flex>
		          <v-btn color="red" @click="onCloseEdit">Close</v-btn>
		          <v-btn color="green" @click="onUpdateProfile">Update Profile</v-btn>
		          </form>
						</div>

				  </div>
				 </v-flex>
			</v-layout>
		</v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: 'true',
      editing: true,
      userId: null,
      firstName: null,
      lastName: null,
      avatar: null,
      currency: null,
      location: null,
      country: null,
      timeZone: null,
      longitude: null,
      latitude: null,
      language: null,
      isAdmin: null,
      userLevel: null,
      joinDate: null,
      firstNameEdit: null,
      lastNameEdit: null,
      avatarEdit: null,
      currencyEdit: null,
      locationEdit: null,
      countryEdit: null,
      timeZoneEdit: null,
      longitudeEdit: null,
      latitudeEdit: null,
      languageEdit: null,
      languageItems: [
        {name: 'English US', code: 'en_US'},
        {name: 'English UK', code: 'en_UK'},
        {name: 'English ROI', code: 'en_IE'},
        {name: 'Espanol', code: 'es_ES'},
        {name: 'Magyar', code: 'hu_HU'}
      ],
      updated: null,
      currencyItems: [
        {name: 'United Kingdom Pound', code: 'GBP'},
        {name: 'United States Dollar', code: 'USD'},
        {name: 'Albania Lek', code: 'ALL'},
        {name: 'Afghanistan Afghani', code: 'AFN'},
        {name: 'Argentina Peso', code: 'ARS'},
        {name: 'Aruba Guilder', code: 'AWG'},
        {name: 'Australia Dollar', code: 'AUD'},
        {name: 'Azerbaijan Manat', code: 'AZN'},
        {name: 'Bahamas Dollar', code: 'BSD'},
        {name: 'Barbados Dollar', code: 'BBD'},
        {name: 'Belarus Ruble', code: 'BYN'},
        {name: 'Belize Dollar', code: 'BZD'},
        {name: 'Bermuda Dollar', code: 'BMD'},
        {name: 'Bolivia Bolíviano', code: 'BOB'},
        {name: 'Bosnia and Herzegovina Convertible Marka', code: 'BAM'},
        {name: 'Botswana Pula', code: 'BWP'},
        {name: 'Bulgaria Lev', code: 'BGN'},
        {name: 'Brazil Real', code: 'BRL'},
        {name: 'Brunei Darussalam Dollar', code: 'BND'},
        {name: 'Cambodia Riel', code: 'KHR'},
        {name: 'Canada Dollar', code: 'CAD'},
        {name: 'Cayman Islands Dollar', code: 'KYD'},
        {name: 'Chile Peso', code: 'CLP'},
        {name: 'China Yuan Renminbi', code: 'CNY'},
        {name: 'Colombia Peso', code: 'COP'},
        {name: 'Costa Rica Colon', code: 'CRC'},
        {name: 'Croatia Kuna', code: 'HRK'},
        {name: 'Cuba Peso', code: 'CUP'},
        {name: 'Czech Republic Koruna', code: 'CZK'},
        {name: 'Denmark Krone', code: 'DKK'},
        {name: 'Dominican Republic Peso', code: 'DOP'},
        {name: 'East Caribbean Dollar', code: 'XCD'},
        {name: 'Egypt Pound', code: 'EGP'},
        {name: 'El Salvador Colon', code: 'SVC'},
        {name: 'Euro Member Countries', code: 'EUR'},
        {name: 'Falkland Islands (Malvinas) Pound', code: 'FKP'},
        {name: 'Fiji Dollar', code: 'FJD'},
        {name: 'Ghana Cedi', code: 'GHS'},
        {name: 'Gibraltar Pound', code: 'GIP'},
        {name: 'Guatemala Quetzal', code: 'GTQ'},
        {name: 'Guernsey Pound', code: 'GGP'},
        {name: 'Guyana Dollar', code: 'GYD'},
        {name: 'Honduras Lempira', code: 'HNL'},
        {name: 'Hong Kong Dollar', code: 'HKD'},
        {name: 'Hungary Forint', code: 'HUF'},
        {name: 'Iceland Krona', code: 'ISK'},
        {name: 'India Rupee', code: 'INR'},
        {name: 'Indonesia Rupiah', code: 'IDR'},
        {name: 'Iran Rial', code: 'IRR'},
        {name: 'Isle of Man Pound', code: 'IMP'},
        {name: 'Israel Shekel', code: 'ILS'},
        {name: 'Jamaica Dollar', code: 'JMD'},
        {name: 'Japan Yen', code: 'JPY'},
        {name: 'Jersey Pound', code: 'JEP'},
        {name: 'Kazakhstan Tenge', code: 'KZT'},
        {name: 'Korea (North) Won', code: 'KPW'},
        {name: 'Korea (South) Won', code: 'KRW'},
        {name: 'Kyrgyzstan Som', code: 'KGS'},
        {name: 'Laos Kip', code: 'LAK'},
        {name: 'Lebanon Pound', code: 'LBP'},
        {name: 'Liberia Dollar', code: 'LRD'},
        {name: 'Macedonia Denar', code: 'MKD'},
        {name: 'Malaysia Ringgit', code: 'MYR'},
        {name: 'Mauritius Rupee', code: 'MUR'},
        {name: 'Mexico Peso', code: 'MXN'},
        {name: 'Mongolia Tughrik', code: 'MNT'},
        {name: 'Mozambique Metical', code: 'MZN'},
        {name: 'Namibia Dollar', code: 'NAD'},
        {name: 'Nepal Rupee', code: 'NPR'},
        {name: 'Netherlands Antilles Guilder', code: 'ANG'},
        {name: 'New Zealand Dollar', code: 'NZD'},
        {name: 'Nicaragua Cordoba', code: 'NIO'},
        {name: 'Nigeria Naira', code: 'NGN'},
        {name: 'Norway Krone', code: 'NOK'},
        {name: 'Oman Rial', code: 'OMR'},
        {name: 'Pakistan Rupee', code: 'PKR'},
        {name: 'Panama Balboa', code: 'PAB'},
        {name: 'Paraguay Guarani', code: 'PYG'},
        {name: 'Peru Sol', code: 'PEN'},
        {name: 'Philippines Peso', code: 'PHP'},
        {name: 'Poland Zloty', code: 'PLN'},
        {name: 'Qatar Riyal', code: 'QAR'},
        {name: 'Romania Leu', code: 'RON'},
        {name: 'Russia Ruble', code: 'RUB'},
        {name: 'Saint Helena Pound', code: 'SHP'},
        {name: 'Saudi Arabia Riyal', code: 'SAR'},
        {name: 'Serbia Dinar', code: 'RSD'},
        {name: 'Seychelles Rupee', code: 'SCR'},
        {name: 'Singapore Dollar', code: 'SGD'},
        {name: 'Solomon Islands Dollar', code: 'SBD'},
        {name: 'Somalia Shilling', code: 'SOS'},
        {name: 'South Africa Rand', code: 'ZAR'},
        {name: 'Sri Lanka Rupee', code: 'LKR'},
        {name: 'Sweden Krona', code: 'SEK'},
        {name: 'Switzerland Franc', code: 'CHF'},
        {name: 'Suriname Dollar', code: 'SRD'},
        {name: 'Syria Pound', code: 'SYP'},
        {name: 'Taiwan New Dollar', code: 'TWD'},
        {name: 'Thailand Baht', code: 'THB'},
        {name: 'Trinidad and Tobago Dollar', code: 'TTD'},
        {name: 'Turkey Lira', code: 'TRY'},
        {name: 'Tuvalu Dollar', code: 'TVD'},
        {name: 'Ukraine Hryvnia', code: 'UAH'},
        {name: 'United Kingdom Pound', code: 'GBP'},
        {name: 'United States Dollar', code: 'USD'},
        {name: 'Uruguay Peso', code: 'UYU'},
        {name: 'Uzbekistan Som', code: 'UZS'},
        {name: 'Venezuela Bolívar', code: 'VEF'},
        {name: 'Viet Nam Dong', code: 'VND'},
        {name: 'Yemen Rial', code: 'YER'},
        {name: 'Zimbabwe Dollar.', code: 'ZWD'}
      ],
      declinedGeo: false,
      alert: null,
      dialog: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.thisUser()
    }, 3000)
  },
  methods: {
    onClickEdit () {
      this.editing = true
    },
    onCloseEdit () {
      // If there are changes and save hasnt been checked then push a warning.
      this.editing = false
    },
    onUpdateProfile () {
      this.editDialog = false
      const dateNow = new Date()
      this.$store.dispatch('updateUserData', {
        id: this.userId,
        firstName: this.firstNameEdit,
        lastName: this.lastNameEdit,
        avatar: this.avatarEdit,
        currency: this.currencyEdit,
        location: this.locationEdit,
        counrty: this.counrtyEdit,
        timeZone: this.timeZoneEdit,
        longitude: this.longitudeEdit,
        latitude: this.latitudeEdit,
        language: this.languageEdit,
        declinedGeo: this.declinedGeo,
        updated: dateNow.toISOString()
      })
      this.firstName = this.firstNameEdit
      this.lastName = this.lastNameEdit
      this.avatar = this.avatarEdit
      this.currency = this.currencyEdit
      this.location = this.locationEdit
      this.country = this.countryEdit
      this.timeZone = this.timeZoneEdit
      this.longitude = this.longitudeEdit
      this.latitude = this.latitudeEdit
      this.language = this.languageEdit
      this.editing = false
    },
    userDeclinedGeo: function (event) {
      this.declinedGeo = true
      this.dialog = false
    },
    getLocation () {
      var self = this
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(self.showPosition)
      } else {
        this.alert = 'Geolocation is not supported by this browser.'
      }
    },
    showPosition (position) {
      // const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
      axios.get('https://api.ipdata.co?api-key=1c2f33af048503d2cf3f316ea974ece3a94891b0d514cd369d51a1a8', {
      })
      .then(result => {
        console.log('result from googleAPI: ', result.data)
        this.longitudeEdit = result.data.longitude
        this.latitudeEdit = result.data.latitude
        this.locationEdit = result.data.city
        this.countryEdit = result.data.country_name
        this.currencyEdit = result.data.currency.code
        this.timeZoneEdit = result.data.time_zone.abbr
        this.dialog = false
      })
      .catch(err => {
        console.log('error Handle: ', err)
      })
    }
  },
  computed: {
    thisUser () {
      let userInfo = this.$store.state.user
      this.userId = userInfo.id
      this.firstName = userInfo.firstName
      this.lastName = userInfo.lastName
      this.avatar = userInfo.avatar
      this.currency = userInfo.currency
      this.location = userInfo.location
      this.country = userInfo.country
      this.timeZone = userInfo.timeZone
      this.longitude = userInfo.longitude
      this.latitude = userInfo.latitude
      this.language = userInfo.language
      this.isAdmin = userInfo.isAdmin
      this.userLevel = userInfo.userLeve
      this.joinDate = userInfo.joinDate
      this.firstNameEdit = userInfo.firstName
      this.lastNameEdit = userInfo.lastName
      this.avatarEdit = userInfo.avatar
      this.currencyEdit = userInfo.currency
      this.locationEdit = userInfo.location
      this.timeZoneEdit = userInfo.timeZone
      this.longitudeEdit = userInfo.longitude
      this.latitudeEdit = userInfo.latitude
      this.languageEdit = userInfo.language
      this.isAdmin = userInfo.isAdmin
      this.userLevel = userInfo.userLeve
      this.joinDate = userInfo.joinDate
      this.loading = 'false'
    }
  }
}
</script>