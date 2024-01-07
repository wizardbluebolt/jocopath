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
      <v-tab value="helpwanted">Help Wanted</v-tab>
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
        <v-window-item value="helpwanted">
          <v-card variant="outlined" v-for="helpItem in helpStore.getApprovedHelp">
            <v-card-title>{{ helpItem.Headline }}</v-card-title>
            <v-card-text>
              <p class="pa-4">{{ helpItem.Description }}</p>
              <p class="pa-4">{{ formatDate(helpItem.Date) }}</p>
              <p>
                <a v-if="helpItem.WebURL.length > 0" :href="helpItem.WebURL">More Information</a>
              </p>
              <span v-if="helpItem.PublishContact == 'Y'">
                <p v-if="helpItem.ContactName.length > 0">
                  <b>Contact: </b>{{ helpItem.ContactName }} 
                  <b>Phone: </b>{{ helpItem.ContactPhone }}
                  <b>EMail: </b>{{ helpItem.ContactEMail }}
                </p>
              </span>
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
    import { useHelpStore } from '@/stores/help';
    import { formatDateTime, formatDate } from '@/api/datetimeops';
    
    function doCopy(pText) {
      toClipboard(pText)
    }

    const viewTab = ref(null)
    
    const eventStore = useEventStore();
    const newsStore = useNewsStore();
    const helpStore = useHelpStore();

    onMounted(async function () {
        if (eventStore.getApprovedEvents.length === 0)  {
          await eventStore.fetchApprovedEvents();
        }
        if (newsStore.getApprovedNews.length === 0) {
          await newsStore.fetchApprovedNews();
        }
        if (helpStore.getApprovedHelp.length === 0) {
          await helpStore.fetchApprovedHelp();
        }
    });  
  
  </script>