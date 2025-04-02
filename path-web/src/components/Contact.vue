<template>
  <h2 style="text-align: center; padding: 4px;">Contact PATH</h2>
  <Auth></Auth>
  <v-card-text v-if="userStore.getIsAuthenticated"
    class="d-flex justify-left align-center ga-2">
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
  <v-card-text v-if="userStore.getIsAuthenticated">
    <v-window v-model="formSelected">
      <v-window-item value=null>
        <p></p>
      </v-window-item>
      <v-window-item value="news">
        <NewsForm
          @formSubmitted="formSubmitted"
          @formEditCancelled="formCancelled"></NewsForm>
      </v-window-item>
      <v-window-item value="event">
        <EventForm 
          @formSubmitted="formSubmitted" 
          @formEditCancelled="formCancelled"></EventForm>
      </v-window-item>     
      <v-window-item value="helpwanted">
        <HelpForm
          @formSubmitted="formSubmitted"
          @formEditCancelled="formCancelled"></HelpForm>
      </v-window-item>       
      <v-window-item value="donation">
        <DonationForm
          @formSubmitted="formSubmitted"
          @formEditCancelled="formCancelled"></DonationForm>
      </v-window-item>
    </v-window>
  </v-card-text>
</template>
  
  <script setup>
    import {ref, onMounted } from 'vue';
    import EventForm from './EventForm.vue';
    import NewsForm from './NewsForm.vue';
    import HelpForm from './HelpForm.vue';
    import DonationForm from './DonationForm.vue';
    import { useEventStore } from '@/stores/events';
    import { useNewsStore } from '@/stores/news';
    import { useHelpStore } from '@/stores/help';
    import { useDonationStore } from '@/stores/donations';
    import { useUserStore } from '@/stores/user';
    import Auth from './Auth.vue';

    const eventStore = useEventStore();
    const newsStore = useNewsStore();
    const helpStore = useHelpStore();
    const donationStore = useDonationStore();
    const userStore = useUserStore();

    const components = {
      EventForm, NewsForm, HelpForm, DonationForm, Auth
    }

    const formSelected = ref(null);
    const formTitle = ref("<- Select a choice");
    const submitMsg = "Thank you for your submission.  " + 
                      "Our team will review it for inclusion in the website as soon as possible.  " + 
                      "They may contact you with questions."

    const forms = [
      {form: 'news', title: 'Tell us about your News item'},
      {form: 'event', title: 'Tell us about your Event'},
      {form: 'helpwanted', title: 'Tell us about a volunteer opportunity'},
      {form: 'donation', title: 'Tell us about a donation opportunity'}
    ]

    function selectForm(pItem) {
      formSelected.value = pItem.form;
      formTitle.value = pItem.title;
      switch(pItem.form) {
        case "event":
          eventStore.newEvent();
          eventStore.currEvent.ContactName = userStore.getCurrUser;
          eventStore.currEvent.ContactEMail = userStore.getCurrEmail;
          break;
        case "news":
          newsStore.newNews();
          newsStore.currNews.ContactName = userStore.getCurrUser;
          newsStore.currNews.ContactEMail = userStore.getCurrEmail;          
          break;
        case "helpwanted":
          helpStore.newHelp();
          helpStore.currHelp.ContactName = userStore.getCurrUser;
          helpStore.currHelp.ContactEMail = userStore.getCurrEmail;
          break;
        case "donation":
          donationStore.newDonation();
          donationStore.currDonation.ContactName = userStore.getCurrUser;
          donationStore.currDonation.ContactEMail = userStore.getCurrEmail;
          break;

        default:

      }
    }

    function formSubmitted() {
      alert(submitMsg);
      formSelected.value = null;
      formTitle.value = "<- Select a choice";
    }

    function formCancelled() {
      formSelected.value = null;
      formTitle.value = "<- Select a choice";
    }

    onMounted(async () => {
      await userStore.userLoggedIn();
    })

  </script>