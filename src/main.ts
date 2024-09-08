import './assets/main.css'


// VUE
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)


// MOCKING
import { Mock } from '@/backend/Mock'
const mock = new Mock(true)


// PINIA
import { createPinia } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { useApiStore } from './stores/api'
import { useAuthStore } from './stores/auth'

app.use(createPinia())

const auth = useAuthStore()
const api = useApiStore()


// VUETIFY
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
})

app.use(vuetify)


// MOUNT
app.mount('#app')
