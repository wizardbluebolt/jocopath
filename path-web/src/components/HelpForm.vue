<template>
    <v-form @submit.prevent="submitHelp">
        <v-row>
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
        <v-col cols="4">
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
        <v-row>
        <v-col cols="12" class="ml-4 mb-0 pb-0">
            <v-checkbox
                v-model="helpStore.currHelp.PublishContact"
                label="Publish contact information with the Help Wanted item"
                false-value="N"
                true-value="Y">
            </v-checkbox>
        </v-col>
        <v-col cols="4">
            <v-text-field
                v-model="helpStore.currHelp.ContactName"
                label="Contact Name (optional)">
            </v-text-field>              
        </v-col>
        <v-col cols="4">
            <v-text-field
                v-model="helpStore.currHelp.ContactPhone"
                label="Contact Phone (optional)">
            </v-text-field>              
        </v-col>
        <v-col cols="4">
            <v-text-field
                v-model="helpStore.currHelp.ContactEMail"
                label="Contact E-Mail (optional)">
            </v-text-field>              
        </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
              <v-btn 
                type="submit" 
                color="primary"
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

    const helpStore = useHelpStore();
    const userStore = useUserStore();

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
      ]
    }
</script>