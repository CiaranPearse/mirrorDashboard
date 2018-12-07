import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './language/en.json'
import hu from './language/hu.json'

Vue.use(VueI18n)

const locale = 'en'

const messages = {
  en: en,
  hu: hu
}

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n
