<template>
    <v-form v-model="isFormValid" @submit.prevent="submitDonation">
        <v-row dense no-gutters>
          <v-col cols="12">
              <v-text-field
              v-model="donationStore.currDonation.Headline"
              :rules="rules.headlineRules"
              label="Headline">
              </v-text-field>              
          </v-col>
          <v-col cols="12">
              <v-textarea
              v-model="donationStore.currDonation.Description"
              counter
              :rules="rules.descriptionRules"
              label="Description">
              </v-textarea>
          </v-col>
          <v-col cols="4" class="mr-4">
              <v-text-field
              v-model="donationStore.currDonation.DonationKind"
              :rules="rules.kindRules"
              label="Donation Kind">
              </v-text-field>
          </v-col>
          <v-col cols="7">
              <v-text-field
              v-model="donationStore.currDonation.HowUsed"
              :rules="rules.howusedRules"
              label="How Used">
              </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="donationStore.currDonation.WebURL"
              :rules="rules.weburl"
              label="Web URL (optional)">
              </v-text-field>
          </v-col>
        </v-row>
        <v-row dense no-gutters>
          <v-col class="mr-4" cols="4">
              <v-text-field
                type="datetime-local"
                v-model="donationStore.currDonation.StartDate"
                :rules="rules.date"
                required
                label="Start Date">
              </v-text-field>
          </v-col>
            <v-col class="mr-4" cols="4">
                <v-text-field
                    type="datetime-local"
                    v-model="donationStore.currDonation.ExpirationDate"
                    :rules="rules.date"
                    required
                    label="End Date">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row dense no-gutters>
            <v-col cols="4" class="mr-4">
                <v-text-field
                v-model="donationStore.currDonation.DonationHours"
                counter
                :rules="rules.hours"
                label="Drop Off Hours (optional)">
                </v-text-field>
            </v-col>
            <v-col cols="7">
                <v-text-field
                v-model="donationStore.currDonation.Location"
                counter
                :rules="rules.location"
                label="Drop Off Location (optional)">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row dense no-gutters>
            <v-col cols="12" class="ml-4 mb-0 pb-0">
                <v-checkbox
                    v-model="donationStore.currDonation.PublishContact"
                    label="Publish contact information with the Donation item"
                    false-value="N"
                    true-value="Y"
                    hide-details="true">
                </v-checkbox>
            </v-col>
            <v-col class="mr-4" cols="4">
                <v-text-field
                    v-model="donationStore.currDonation.ContactName"
                    :rules="rules.contact"
                    label="Contact Name">
                </v-text-field>              
            </v-col>
            <v-col class="mr-4" cols="3">
                <v-text-field
                    v-model="donationStore.currDonation.ContactPhone"
                    :rules="rules.phone"
                    label="Contact Phone">
                </v-text-field>              
            </v-col>
            <v-col cols="4">
                <v-text-field
                    v-model="donationStore.currDonation.ContactEMail"
                    :rules="rules.email"
                    label="Contact EMail">
                </v-text-field>              
            </v-col>
        </v-row>
        <v-row dense no-gutters>
            <v-col cols="2" class="pr-4">
                <v-btn
                    type="submit"
                    :disabled="!isFormValid"
                    @click="emit('formSubmitted')"
                    color="primary">
                    Submit Entry
                </v-btn>
            </v-col>
            <v-col cols="2" class="pr-4">
                <v-btn
                    type="button"
                    @click="emit('formEditCancelled')"
                    color="primary">
                    Cancel
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup>
    import { ref } from 'vue';
    import { isURL } from '@/api/validationUtils';
    import { useDonationStore } from '@/stores/donations';
    import { useUserStore } from '@/stores/user';

    const donationStore = useDonationStore();
    const userStore = useUserStore();

    const emit = defineEmits(['formSubmitted', 'formEditCancelled']);

    const isFormValid = ref(false);

    async function submitDonation() {
        await donationStore.saveDonation(userStore.getAccessToken);
    }

    const rules = {
        headlineRules: [
            v => !!v || 'Headline is required',
            v => (v && v.length <= 100) || 'Headline must be less than 100 characters',
        ],
        descriptionRules: [
            v => !!v || 'Description is required',
            v => (v && v.length <= 500) || 'Description must be less than 500 characters',
        ],
        kindRules: [
            v => !!v || 'Donation Kind is required',
            v => (v && v.length <= 50) || 'Donation Kind must be less than 50 characters',
        ],
        howusedRules: [
            v => !!v || 'How Used is required',
            v => (v && v.length <= 100) || 'How Used must be less than 100 characters',
        ],
        weburl: [
            v => !v || isURL(v) || 'Web URL must be a valid URL',
        ],
        date: [
            v => !!v || 'Date is required',
        ],
        location: [
            v => (v.length <= 200) || 'Location must be less than 200 characters',
        ],
        hours: [
            v => (v.length <= 50) || 'Hours must be less than 50 characters',
        ],
        contact: [
            v => !!v || 'Contact Name is required',
            v => (v && v.length <= 50) || 'Contact Name must be less than 50 characters',
        ],
        phone: [
            v => !!v || 'Contact Phone is required',
            v => (v && v.length <= 50) || 'Contact Phone must be less than 50 characters',
        ],
        email: [
            v => !!v || 'Contact EMail is required',
            v => (v && v.length <= 50) || 'Contact EMail must be less than 50 characters',
        ],
    }
</script>