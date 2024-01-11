<template>
  <h3 style="text-align: center;">Services</h3>
  <v-card variant="outlined" v-for="service in serviceStore.getApprovedServices">
    <v-card-item>
      <v-card-title>
        {{ service.ServiceName }}
      </v-card-title>
      <v-card-text>
        <p class="pa-4">{{ service.Description }}</p>
        <p>
          <a v-if="service.WebURL.length > 0" :href="service.WebURL">Web Site</a>
        </p>
        <p class="pa-4" v-for="locationItem in service.LocationItems">
          <p><b>Location: </b>{{ locationItem.Location }}</p>
          <p v-if="locationItem.Address.length > 0"><b>Address: </b>{{ locationItem.Address }}
            <v-tooltip location="end">
              <template v-slot:activator="{ props }">
                <v-btn 
                  v-bind="props"
                  density="compact" 
                  aria-label="Copy Address" 
                  icon
                  @click="doCopy(locationItem.Address)">
                  <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>Copy address</span>
            </v-tooltip>
          </p>
          <p v-if="locationItem.Phone.length > 0">
            <b>Phone: </b>{{ locationItem.Phone }}
            <v-tooltip location="end">
              <template v-slot:activator="{ props }">
                <v-btn 
                  v-bind="props"
                  density="compact" 
                  aria-label="Copy Phone" 
                  icon
                  @click="doCopy(locationItem.Phone)">
                  <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>Copy phone</span>
            </v-tooltip>
          </p>
        </p>
        <p v-if="service.ContactEMail.length > 0">
          <b>E-Mail: </b>{{ service.ContactEMail }}
          <v-tooltip location="end">
            <template v-slot:activator="{ props }">
              <v-btn 
                v-bind="props"
                density="compact" 
                aria-label="Copy E-Mail" 
                icon
                @click="doCopy(service.ContactEMail)">
                <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <span>Copy e-mail</span>
          </v-tooltip>
        </p>
      </v-card-text>
    </v-card-item>
  </v-card>
  </template>
  
  <script setup>
    import { onMounted } from 'vue'
    import { toClipboard } from '@soerenmartius/vue3-clipboard'
    import { useServiceStore } from '@/stores/services';
    
    function doCopy(pText) {
      toClipboard(pText)
    }

    const serviceStore = useServiceStore();

    onMounted(async function () {
        if (serviceStore.getApprovedServices.length === 0) {
          await serviceStore.fetchApprovedServices();
        }
    });  

  </script>