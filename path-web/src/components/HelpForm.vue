<template>
    <v-form v-model="isFormValid" @submit.prevent="submitHelp">
        <v-row dense no-gutters>
          <v-col cols="12">
              <v-text-field
                  v-model="helpStore.currHelp.Headline"
                  :rules="rules.headlineRules"
                  label="Headline">
              </v-text-field>              
          </v-col>
          <v-col cols="12">
              <v-textarea
                  v-model="helpStore.currHelp.Description"
                  counter
                  :rules="rules.descriptionRules"
                  label="Description">
              </v-textarea>
          </v-col>
          <v-col class="mr-4" cols="4">
              <v-text-field
                  type="datetime-local"
                  v-model="helpStore.currHelp.Date"
                  :rules="rules.date"
                  label="Date">
              </v-text-field>
          </v-col>
          <v-col cols="4">
              <v-text-field
                  type="datetime-local"
                  v-model="helpStore.currHelp.ExpirationDate"
                  :rules="rules.date"
                  label="Expiration Date">
              </v-text-field>
          </v-col>
          <v-col cols="6">
              <v-text-field
                  v-model="helpStore.currHelp.WebURL"
                  :rules="rules.weburl"
                  label="Web URL (optional)">
              </v-text-field>
          </v-col>
        </v-row>
        <v-row dense no-gutters>
          <v-col cols="12" class="ml-4 mb-0 pb-0">
              <v-checkbox
                  v-model="helpStore.currHelp.PublishContact"
                  label="Publish contact information with the Help Wanted item"
                  false-value="N"
                  true-value="Y"
                  hide-details="true">
              </v-checkbox>
          </v-col>
          <v-col class="mr-4" cols="4">
              <v-text-field
                  v-model="helpStore.currHelp.ContactName"
                  :rules="rules.contact"
                  label="Contact Name">
              </v-text-field>              
          </v-col>
          <v-col class="mr-4" cols="3">
              <v-text-field
                  v-model="helpStore.currHelp.ContactPhone"
                  type="tel"
                  :rules="rules.contact"
                  label="Contact Phone">
              </v-text-field>              
          </v-col>
          <v-col cols="4">
              <v-text-field
                  v-model="helpStore.currHelp.ContactEMail"
                  :rules="rules.contact"
                  label="Contact E-Mail">
              </v-text-field>              
          </v-col>
        </v-row>
        <v-row dense no-gutters>
          <v-col class="pr-4" cols="3">
              <v-btn 
                type="submit" 
                color="primary"
                :disabled="!isFormValid"
                @click="$emit('formSubmitted')">
                Submit Help Wanted
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
    import { useHelpStore } from '@/stores/help';
    import { useUserStore } from '@/stores/user';
    import { isURL } from '@/api/validationUtils';
    import { ref } from 'vue';

    const helpStore = useHelpStore();
    const userStore = useUserStore();

    const isFormValid = ref(false);

    const emit = defineEmits(['formSubmitted', 'formEditCancelled']);

    async function submitHelp() {
      await helpStore.saveHelp(userStore.getAccessToken);
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
      weburl: [
        value => {
          if (!value) return true;
          if (isURL(value)) return true;
          return 'If provided, Web URL must be a valid URL'
        }
      ],
      contact: [
        value => {
          if (value?.length > 2) return true;
          return 'Contact information is required'
        }
      ]
    }
</script>