<template>
  <h3 style="text-align: center;">Contact PATH</h3>
  <v-card-text class="d-flex justify-left align-center ga-2">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind:="props">
          I want to:
        </v-btn>
        <h4 class="pl-4">{{ formTitle }}</h4>
      </template>
      <v-list>
        <v-list-item 
          v-for="(item, index) in forms" 
          :key="index" 
          :value="item"
          @click="selectForm(item)" >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card-text>
  <v-card-text>
    <v-window v-model="formSelected">
      <v-window-item value=null>
        <p>Ground Rules</p>
      </v-window-item>
      <v-window-item value="subscribe">
        <p>Subscription form</p>
      </v-window-item>
      <v-window-item value="unsubscribe">
        <p>Unsubscription form</p>
      </v-window-item>
      <v-window-item value="volunteer">
          <p>Volunteer form</p>
      </v-window-item>
      <v-window-item value="service">
          <p>Service form</p>
      </v-window-item>
      <v-window-item value="event">
        <v-form @submit.prevent="submitEvent">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="eventStore.currEvent.Headline"
                :rules="rules.headlineRules"
                label="Headline">
              </v-text-field>              
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="eventStore.currEvent.Description"
                counter
                :rules="rules.descriptionRules"
                label="Description">
              </v-textarea>
            </v-col>
            <v-col cols="4">
              <v-text-field
                type="datetime-local"
                v-model="eventStore.currEvent.Date"
                :rules="rules.date"
                label="Date">
              </v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="eventStore.currEvent.Location"
                :rules="rules.location"
                label="Location">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="eventStore.currEvent.WebURL"
                :rules="rules.weburl"
                label="Web URL (optional)">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="ml-4 mb-0 pb-0">
              Contact information is only used by PATH staff.  It will not be published.
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="eventStore.currEvent.ContactName"
                label="Contact Name (optional)">
              </v-text-field>              
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="eventStore.currEvent.ContactPhone"
                label="Contact Phone (optional)">
              </v-text-field>              
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="eventStore.currEvent.ContactEMail"
                label="Contact E-Mail (optional)">
              </v-text-field>              
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-btn 
                type="submit" 
                color="primary">
                Submit Event
              </v-btn>              
            </v-col>
          </v-row>
        </v-form>
      </v-window-item>     
      <v-window-item value="helpwanted">
          <p>Help Wanted form</p>
      </v-window-item>       
    </v-window>
  </v-card-text>
</template>
  
  <script setup>
    import {ref} from 'vue'
    import { useEventStore } from '@/stores/events'

    const eventStore = useEventStore();

    const formSelected = ref(null);
    const formTitle = ref("<- Select a choice");

    const forms = [
      {form: 'subscribe', title: 'Subscribe/Unsubscribe to PATH Newsletter'},
      {form: 'volunteer', title: 'Volunteer with PATH'},
      {form: 'service', title: 'Tell us about your service'},
      {form: 'event', title: 'Tell us about your event'},
      {form: 'helpwanted', title: 'List a Help Wanted item'}
    ]

    function selectForm(pItem) {
      formSelected.value = pItem.form;
      formTitle.value = pItem.title;
      switch(pItem.form) {
        case "event":
          eventStore.newEvent();
          break;
        default:

      }
    }

    async function submitEvent() {
      await eventStore.saveEvent();
      formSelected.value = null;
      formTitle.value = "<- Select a choice";
    }

    function isURL(pURL) {
      let tURL;
      try {
        tURL = new URL(pURL)
      } catch (error) {
        return false;
      }
      return tURL.protocol === "http:" || tURL.protocol === "https:";
    }

    const rules = {
      headlineRules: [
        value => {
          if (value?.length > 2) return true
          return 'Headline is required and must be at least 3 characters' 
        }
      ],
      descriptionRules: [
        value => {
          if (value?.length < 10) return 'Description must be at least 10 characters'
          if (value?.length > 2000) return 'Description must be less than 2000 characters'
          return true
        }
      ],
      date: [
        value => {
          if (!value) return 'Date is required'
          const tToday = new Date()
          if (value < tToday) return 'Date must be in the future'
          return true
        }
      ],
      location: [
        value => {
          if (value?.length > 2) return true
          return 'Location is required and must be at least 3 characters'
        }
      ],
      weburl: [
        value => {
          if (!value) return true;
          if (isURL(value)) return true;
          return 'If provided, Web URL must be a valid URL'
        }
      ]
    }
  </script>