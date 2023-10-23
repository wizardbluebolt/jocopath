<template>
  <h3 style="text-align: center;">News and Events</h3>
    <v-tabs
      v-model="viewTab"
      fixed-tabs
      bg-color="primary"
    >
      <v-tab value="news">News</v-tab>
      <v-tab value="events">Events</v-tab>
      <v-tab value="archive">Archive</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="viewTab">
        <v-window-item value="news">
          <v-card variant="outlined" v-for="newsItem in currentItems(allNews)">
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
          <v-card variant="outlined" v-for="eventItem in currentItems(allEvents)">
            <v-card-title>{{ eventItem.headline }}</v-card-title>
            <v-card-text>
              <p class="pa-4">{{ eventItem.description }}</p>
              <p class="pa-4">{{ eventItem.date.toLocaleDateString() }} {{ eventItem.time }}</p>
              <p v-if="eventItem.location.length > 0">
                <b>Location: </b>{{ eventItem.location }}
                <v-tooltip location="end">
                  <template v-slot:activator="{ props }">
                    <v-btn 
                      v-bind="props"
                      density="compact" 
                      aria-label="Copy Address" 
                      icon
                      @click="doCopy(eventItem.location)">
                      <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                  <span>Copy address</span>
                </v-tooltip>
              </p>
              <p>
                <a v-if="eventItem.weburl.length > 0" :href="eventItem.weburl">More Information</a>
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
    import { ref } from 'vue'
    import { toClipboard } from '@soerenmartius/vue3-clipboard'
    
    function doCopy(pText) {
      toClipboard(pText)
    }

    function setDate(pDate) {
      let rDate = new Date(pDate + " 0:00:00")
      return rDate
    }

    function currentItems(pCollect) {
      return pCollect.filter((pItem) => {
        return ((Object.is(pItem.expirationDate, null) | (pItem.expirationDate >= new Date())))
      })
    }

    const viewTab = ref(null)
    const allNews = ref(
      [
        {
          headline: "Warming Shelter Volunteers Needed",
          description: "A warming shelter is planned again this winter season in Grants Pass.  Volunteers are needed to help serve during overnight hours to keep the shelter staffed and open.  If you are able to volunteer, please contact...",
          weburl: "",
          date: setDate("2023-10-01"),
          expirationDate: setDate("2024-03-31")
        },
      ]
    )
    const allEvents = ref(
      [
        {
          headline: "PATH General Meeting",
          description: "PATH General Meeting for September 2023.  Open to those wishing to learn more about recent PATH activities and progress or wishing to volunteer to serve on a committee or other activity.",
          date: setDate("2023-09-26"),
          time: "3:30 - 5:00pm",
          location: "Grants Pass City Council Chambers, 101 NW A St, Grants Pass, OR 97526",
          weburl: "",
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          expirationDate: setDate("2023-09-27")
        },
        {
          headline: "PATH General Meeting",
          description: "PATH General Meeting for October 2023.  Open to those wishing to learn more about recent PATH activities and progress or wishing to volunteer to serve on a committee or other activity.",
          date: setDate("2023-10-24"),
          time: "3:30 - 5:00pm",
          location: "Grants Pass City Council Chambers, 101 NW A St, Grants Pass, OR 97526",
          weburl: "",
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          expirationDate: setDate("2023-10-25")
        },
        {
          headline: "PATH General Meeting",
          description: "PATH General Meeting for November 2023.  Open to those wishing to learn more about recent PATH activities and progress or wishing to volunteer to serve on a committee or other activity.",
          date: setDate("2023-11-28"),
          time: "3:30 - 5:00pm",
          location: "Grants Pass City Council Chambers, 101 NW A St, Grants Pass, OR 97526",
          weburl: "",
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          expirationDate: setDate("2023-11-29")
        }
      ]
    )
  </script>