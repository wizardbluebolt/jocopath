<template>
  <h3 style="text-align: center;">Contact PATH</h3>
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
        <EventForm @formSubmitted="formSubmitted"></EventForm>
      </v-window-item>     
      <v-window-item value="helpwanted">
          <p>Help Wanted form</p>
      </v-window-item>       
    </v-window>
  </v-card-text>
</template>
  
  <script setup>
    import {ref} from 'vue'
    import EventForm from './EventForm.vue';
    import { useEventStore } from '@/stores/events';
    import { useUserStore } from '@/stores/user';
    import Auth from './Auth.vue';

    const eventStore = useEventStore();
    const userStore = useUserStore();

    const components = {
      EventForm, Auth
    }

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

    function formSubmitted() {
      formSelected.value = null;
      formTitle.value = "<- Select a choice";
    }

  </script>