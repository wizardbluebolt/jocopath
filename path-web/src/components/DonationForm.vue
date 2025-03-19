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
          <v-col cols="5">
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
                    v-model="donationStore.currDonation.EndDate"
                    :rules="rules.date"
                    required
                    label="End Date">
                </v-text-field>
            </v-col>
            <v-col cols="8">
                <v-text-field
                v-model="donationStore.currDonation.Location"
                :rules="rules.location"
                label="Location">
                </v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field
                v-model="donationStore.currDonation.DonationHours"
                :rules="rules.hours"
                label="Hours">
                </v-text-field>
            </v-col>
            <v-col cols="8">
                <v-textarea
                v-model="donationStore.currDonation.Location"
                counter
                :rules="rules.location"
                label="Location">
                </v-textarea>
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
            <v-col cols="5">
                <v-text-field
                    v-model="donationStore.currDonation.ContactEMail"
                    :rules="rules.email"
                    label="Contact EMail">
                </v-text-field>              
            </v-col>
    </v-form>
</template>