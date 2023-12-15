/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import { createPinia } from 'pinia'
import { Amplify } from 'aws-amplify'
import config from './amplifyconfiguration.json'

// Plugins
import { registerPlugins } from '@/plugins'

Amplify.configure(config)

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

registerPlugins(app)

app.use(VueClipboard)

app.mount('#app')
