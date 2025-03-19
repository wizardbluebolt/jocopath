<template>
    <v-tabs
      v-model="viewTab"
      fixed-tabs
      bg-color="primary"
      color="yellow"
      slider-color="red">
      <v-tab value="helpwanted">Volunteer Opportunities</v-tab>
      <v-tab value="donations">Donation Opportunities</v-tab>
      <v-tab value="news">News</v-tab>
      <v-tab value="events">Events</v-tab>
    </v-tabs>
    <v-card-text class="text-body-1">
      <v-window v-model="viewTab">
        <v-window-item value="helpwanted">
          <v-card variant="outlined" v-for="helpItem in helpStore.getApprovedHelp">
            <v-card-title>{{ helpItem.Headline }}</v-card-title>
            <v-card-text style="font-size: 1.1rem;">
              <p class="pa-4">{{ helpItem.Description }}</p>
              <v-row dense>
                <v-col cols="8" class="pl-2">
                  <a v-if="helpItem.WebURL.length > 0" :href="helpItem.WebURL">More Information</a>
                </v-col>
                <v-col cols="4" class="text-right">
                  {{ formatDateTime(helpItem.Date) }}
                </v-col>
              </v-row>
              <v-row dense no-gutters class="pt-4" v-if="helpItem.PublishContact == 'Y'">
                <p class="pl-4" v-if="helpItem.ContactName.length > 0">
                  <b>Contact: </b><span class="pr-4">{{ helpItem.ContactName }}</span> 
                  <b v-if="helpItem.ContactPhone.length > 0">Phone: </b>
                  <span class="pr-4" v-if="helpItem.ContactPhone.length > 0">{{ helpItem.ContactPhone }}</span>
                  <b v-if="helpItem.ContactEMail.length > 0">EMail: </b>
                  <span v-if="helpItem.ContactEMail.length > 0">{{ helpItem.ContactEMail }}</span>
                </p>
              </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="donations">
          <v-card variant="outlined" v-for="donationItem in donationStore.getApprovedDonations">
            <v-card-title>{{ donationItem.Headline }}</v-card-title>
            <v-card-text style="font-size: 1.1rem;">
              <p class="pa-4">{{ donationItem.Description }}</p>
              <v-row dense>
                <v-col cols="5" class="pl-2">
                  <b>Donation Kind: </b>{{ donationItem.DonationKind }}
                </v-col>
                <v-col cols="7" class="pl-2">
                  <b>How Used: </b>{{ donationItem.HowUsed }}
                </v-col>  
              </v-row>
              <v-row dense>
                <v-col cols="5" class="text-right">
                  <b>Items Accepted From:</b>{{ formatDateTime(donationItem.StartDate) }}
                </v-col>
                <v-col cols="5" class="pl-2">
                  <b>Until: </b>{{ formatDateTime(donationItem.EndDate) }}
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="4">
                  <b>Hours: </b>{{ donationItem.DonationHours }}
                </v-col>
                <v-col cols="7" class="pl-2">
                  <b>Location: </b>{{ donationItem.Location }}
                  <v-tooltip location="end">
                    <template v-slot:activator="{ props }">
                      <v-btn 
                        v-bind="props"
                        density="compact" 
                        aria-label="Copy Address" 
                        flat
                        icon
                        @click="doCopy(donationItem.Location)">
                        <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
                      </v-btn>
                    </template>
                    <span>Copy address</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="8" class="pl-2">
                  <a v-if="donationItem.WebURL.length > 0" :href="donationItem.WebURL">More Information</a>
                </v-col>
              </v-row>
              <v-row dense no-gutters class="pt-4" v-if="donationItem.PublishContact == 'Y'">
                <p class="pl-4" v-if="donationItem.ContactName.length > 0">
                  <b>Contact: </b><span class="pr-4">{{ donationItem.ContactName }}</span> 
                  <b v-if="donationItem.ContactPhone.length > 0">Phone: </b>
                  <span class="pr-4" v-if="donationItem.ContactPhone.length > 0">{{ donationItem.ContactPhone }}</span>
                  <b v-if="donationItem.ContactEMail.length > 0">EMail: </b>
                  <span v-if="donationItem.ContactEMail.length > 0">{{ donationItem.ContactEMail }}</span>
                </p>
              </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="news">
          <v-card variant="outlined" v-for="newsItem in newsStore.getApprovedNews">
            <v-card-title>{{ newsItem.Headline }}</v-card-title>
            <v-card-text style="font-size: 1.1rem;">
              <p class="pa-4">{{ newsItem.Description }}</p>              
              <v-row dense>
                <v-col cols="8" class="pl-2">
                  <a v-if="newsItem.WebURL.length > 0" :href="newsItem.WebURL">More Information</a>
                </v-col>
                <v-col cols="4" class="text-right">
                  {{ formatDateTime(newsItem.Date) }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="events">
          <v-card variant="outlined" v-for="eventItem in eventStore.getApprovedEvents">
            <v-card-title>{{ eventItem.Headline }}</v-card-title>
            <v-card-text style="font-size: 1.1rem;">
              <p class="pa-4">{{ eventItem.Description }}</p>
              <v-row dense no-gutters>
                <v-col cols="2" class="pr-3 text-right">
                  <b>When: </b>
                </v-col>
                <v-col cols="10">
                  {{ formatDateTimeRange(eventItem.Date, eventItem.EndDate) }}
                </v-col>
              </v-row>
              <v-row dense no-gutters v-if="eventItem.Location.length > 0">
                <v-col cols="2" class="pr-3 pt-1 text-right">
                  <b>Where: </b>
                </v-col>
                <v-col cols="10">
                  {{ eventItem.Location }}
                  <v-tooltip location="end">
                    <template v-slot:activator="{ props }">
                      <v-btn 
                        v-bind="props"
                        density="compact" 
                        aria-label="Copy Address" 
                        flat
                        icon
                        @click="doCopy(eventItem.Location)">
                        <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
                      </v-btn>
                    </template>
                    <span>Copy address</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <p>
                <a v-if="eventItem.WebURL.length > 0" :href="eventItem.WebURL">More Information</a>
              </p>
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
    import { useDonationStore } from '@/stores/donations';
    import { formatDateTime, formatDateTimeRange } from '@/api/datetimeops';
    
    function doCopy(pText) {
      toClipboard(pText)
    }

    const viewTab = ref(null)
    
    const eventStore = useEventStore();
    const newsStore = useNewsStore();
    const helpStore = useHelpStore();
    const donationStore = useDonationStore();

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
        if (donationStore.getApprovedDonations.length === 0) {
          await donationStore.fetchApprovedDonations();
        }
    });  
  
  </script>