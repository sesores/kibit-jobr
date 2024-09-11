

// STYLES
import '@/assets/main.css'
import '@mdi/font/css/materialdesignicons.css'


// VUE
import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)
app.use(router)


// MOCKING
import { Mock } from '@/backend/Mock'
const mock = new Mock(false)


// PINIA
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

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
