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

// Plugins
import { registerPlugins } from '@/plugins'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

registerPlugins(app)

app.use(VueClipboard)

app.mount('#app')
