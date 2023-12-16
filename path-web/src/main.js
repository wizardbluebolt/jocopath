/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import { VueClipboard } from '@soerenmartius/vue3-clipboard';
import { createPinia } from 'pinia';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import router from '@/router';

// Plugins
import { registerPlugins } from '@/plugins';

const pinia = createPinia();

Amplify.configure(config);

const app = createApp(App);

app.use(pinia);
app.use(router);
registerPlugins(app);
app.use(VueClipboard);

router.isReady().then(() => {
    app.mount('#app')
})
