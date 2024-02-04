<template>
    <v-form v-model="isFormValid" @submit.prevent="submitEvent">
        <v-row dense no-gutters>
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
          <v-col class="mr-4" cols="4">
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
        <v-row dense no-gutters>
          <v-col cols="12" class="ml-4 mb-2 pb-0">
              Contact information is only used by PATH staff.  It will not be published.
          </v-col>
          <v-col class="mr-4" cols="4">
              <v-text-field
              v-model="eventStore.currEvent.ContactName"
              label="Contact Name (optional)">
              </v-text-field>              
          </v-col>
          <v-col class="mr-4" cols="3">
              <v-text-field
              v-model="eventStore.currEvent.ContactPhone"
              type="tel"
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
        <v-row dense no-gutters>
          <v-col class="pr-4" cols="2">
              <v-btn 
                type="submit" 
                color="primary"
                :disabled="!isFormValid"
                @click="$emit('formSubmitted')">
                Submit Event
              </v-btn>              
          </v-col>
          <v-col cols="2">
              <v-btn 
                type="button" 
                color="primary"
                @click="$emit('formEditCancelled')">
                Cancel
              </v-btn>              
          </v-col>
        </v-row>
    </v-form>
</template>

<script setup>
    import { useEventStore } from '@/stores/events'
    import { useUserStore } from '@/stores/user';
    import { isURL } from '@/api/validationUtils'
    import { ref } from 'vue'

    const eventStore = useEventStore();
    const userStore = useUserStore();

    const emit = defineEmits(['formSubmitted', 'formEditCancelled']);

    const isFormValid = ref(false);

    async function submitEvent() {
      await eventStore.saveEvent(userStore.getAccessToken);
      // emit('formSubmitted');
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