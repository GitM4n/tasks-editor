import { createApp } from 'vue'



import 'vuetify/styles'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import App from './App.vue'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
      },
    components,
    directives
})

createApp(App).use(vuetify).mount('#app')

