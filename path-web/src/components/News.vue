<template>
  <h3 style="text-align: center;">News and Events</h3>
    <v-tabs
      v-model="viewTab"
      fixed-tabs
      bg-color="primary"
      color="yellow"
      slider-color="red">
      <v-tab value="news">News</v-tab>
      <v-tab value="events">Events</v-tab>
      <v-tab value="archive">Help Wanted</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="viewTab">
        <v-window-item value="news">
          <v-card variant="outlined" v-for="newsItem in newsStore.getApprovedNews">
            <v-card-title>{{ newsItem.Headline }}</v-card-title>
            <v-card-text>
              <p class="pa-4">{{ newsItem.Description }}</p>
              <p class="pa-4">{{ formatDateTime(newsItem.Date) }}</p>
              <p>
                <a v-if="newsItem.WebURL.length > 0" :href="newsItem.WebURL">More Information</a>
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="events">
          <v-card variant="outlined" v-for="eventItem in eventStore.getApprovedEvents">
            <v-card-title>{{ eventItem.Headline }}</v-card-title>
            <v-card-text>
              <p class="pa-4">{{ eventItem.Description }}</p>
              <p class="pa-4">{{ formatDateTime(eventItem.Date) }}</p>
              <p v-if="eventItem.Location.length > 0">
                <b>Location: </b>{{ eventItem.Location }}
                <v-tooltip location="end">
                  <template v-slot:activator="{ props }">
                    <v-btn 
                      v-bind="props"
                      density="compact" 
                      aria-label="Copy Address" 
                      icon
                      @click="doCopy(eventItem.Location)">
                      <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                  <span>Copy address</span>
                </v-tooltip>
              </p>
              <p>
                <a v-if="eventItem.WebURL.length > 0" :href="eventItem.WebURL">More Information</a>
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="archive">
          <v-card>
            <v-card-text>
              Help Wanted
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import { toClipboard } from '@soerenmartius/vue3-clipboard';
    import { useEventStore } from '@/stores/events';
    import { useNewsStore } from '@/stores/news';
    import { formatDateTime } from '@/api/datetimeops';
    
    function doCopy(pText) {
      toClipboard(pText)
    }

    const viewTab = ref(null)
    
    const eventStore = useEventStore();
    const newsStore = useNewsStore();

    onMounted(async function () {
        if (eventStore.getApprovedEvents.length === 0)  {
          await eventStore.fetchApprovedEvents();
        }
        if (newsStore.getApprovedNews.length === 0) {
          await newsStore.fetchApprovedNews();
        }
    });  
  
  </script>