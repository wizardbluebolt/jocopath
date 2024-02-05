<template>
  <h2 style="text-align: center; padding: 4px;">Community Partners and Services</h2>
  <v-card variant="outlined" v-for="service in serviceStore.getApprovedServices">
    <v-card-item class="text-body-1">
      <v-card-title>
        {{ service.ServiceName }}
      </v-card-title>
      <v-card-text style="font-size: 1.1rem;">
        <p class="pa-2 ma-1">{{ service.Description }}</p>
        <p>
          <a v-if="service.WebURL.length > 0" :href="service.WebURL">Web Site</a>
        </p>
        <p class="pa-2 ma-1" v-for="(locationItem, locationIdx) in service.LocationItems">
          <v-row dense no-gutters v-if="service.LocationItems.length > 0">
            <v-col cols="2" class="pr-3 text-right">
              <b v-if="locationIdx == 0">Locations:</b>
            </v-col>
            <v-col cols="10">
              <p>{{ locationItem.Location }}</p>
            </v-col>
          </v-row>
          <v-row dense no-gutters>
            <v-col cols="2"></v-col>
            <v-col cols="10">
              <span class="pr-4" v-if="locationItem.Address.length > 0">{{ locationItem.Address }}
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
              </span>
              <span v-if="locationItem.Phone.length > 0">
                {{ locationItem.Phone }}
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
              </span>
            </v-col>
          </v-row>
        </p>
        <v-row dense no-gutters v-if="service.ContactEMail.length > 0">
          <v-col cols="2" class="pt-1 pr-3 text-right">
            <b>E-Mail: </b>
          </v-col>
          <v-col cols="10" class="pl-2">
            {{ service.ContactEMail }}
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
          </v-col>
        </v-row>
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