<template>
  <h3 style="text-align: center;">News and Events</h3>
    <v-tabs
      v-model="viewTab"
      fixed-tabs
      bg-color="primary"
    >
      <v-tab value="news">News</v-tab>
      <v-tab value="events">Events</v-tab>
      <v-tab value="archive">Help Wanted</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="viewTab">
        <v-window-item value="news">
          <v-card variant="outlined" v-for="newsItem in allNews">
            <v-card-title>{{ newsItem.headline }}</v-card-title>
            <v-card-text>
              <p class="pa-4">{{ newsItem.description }}</p>
              <p class="pa-4">{{ newsItem.date.toLocaleDateString() }}</p>
              <p>
                <a v-if="newsItem.weburl.length > 0" :href="newsItem.weburl">More Information</a>
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="events">
          <v-card variant="outlined" v-for="eventItem in store.getApprovedEvents">
            <v-card-title>{{ eventItem.Headline }}</v-card-title>
            <v-card-text>
              <p class="pa-4">{{ eventItem.Description }}</p>
              <p class="pa-4">{{ eventItem.Date }}</p>
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
              News and Event Archive
            </v-card-text>
          </v-card>
        </v-window-item>

      </v-window>
    </v-card-text>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue'
    import { toClipboard } from '@soerenmartius/vue3-clipboard'
    import { useEventStore } from '@/stores/events'
    
    function doCopy(pText) {
      toClipboard(pText)
    }

    function setDate(pDate) {
      let rDate = new Date(pDate)
      return rDate
    }

    function currentItems(pCollect) {
      return pCollect.filter((pItem) => {
        return ((Object.is(pItem.expirationDate, null) || (pItem.expirationDate >= new Date())))
      })
    }

    const viewTab = ref(null)
    const allNews = ref(
      [
        {
          headline: "Warming Shelter Volunteers Needed",
          description: "A warming shelter is planned again this winter season in Grants Pass.  Volunteers are needed to help serve during overnight hours to keep the shelter staffed and open.  If you are able to volunteer, please contact...",
          weburl: "",
          date: setDate("2023-10-01 17:00:00"),
          expirationDate: setDate("2024-03-31 00:00:00")
        },
      ]
    )
    
    const store = useEventStore();

    onMounted(async function () {
        if (store.getApprovedEvents.length === 0)  {
          await store.fetchApprovedEvents();
        }
    });  
  
  </script>