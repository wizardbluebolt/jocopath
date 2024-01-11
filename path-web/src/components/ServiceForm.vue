<template>
    <v-form @submit.prevent="submitService">
        <v-col cols="12">
            <v-text-field
            v-model="serviceStore.currService.ServiceName"
            :rules="rules.headlineRules"
            label="Service Name">
            </v-text-field>              
        </v-col>
        <v-col cols="12">
            <v-textarea
            v-model="serviceStore.currService.Description"
            counter
            :rules="rules.descriptionRules"
            label="Description">
            </v-textarea>
        </v-col>
        <v-col cols="6">
            <v-text-field
            v-model="serviceStore.currService.WebURL"
            :rules="rules.weburl"
            label="Web URL (optional)">
            </v-text-field>
        </v-col>
        <v-row>
            <v-col cols="4">
                <b>Locations: </b>
            </v-col>
            <v-col cols="1">
                <v-tooltip location="end">
                  <template v-slot:activator="{ props }">
                    <v-btn 
                      v-bind="props"
                      density="compact"
                      aria-label="Add Location" icon
                      @click="serviceStore.addLocationItem()">
                        <v-icon icon="$plus"></v-icon>
                    </v-btn>
                  </template>
                  <span>Add location entry</span>
                </v-tooltip>
            </v-col>
        </v-row>
        <div v-for="(locationItem, locIndex) in serviceStore.currService.LocationItems">
            <v-row v-if="locationItem !== serviceStore.currLocationItem" width="100%">
                <v-col cols="8">
                    {{ locationItem.Location }}
                </v-col>
                <v-col cols="5">
                    {{ locationItem.Address }}
                </v-col>
                <v-col cols="3">
                    {{ locationItem.Phone }}
                </v-col>
                <v-col cols="1">
                    <v-tooltip location="end">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                density="compact" icon
                                aria-label="Edit location" 
                                @click="serviceStore.selectLocationItem(locIndex)">
                                <v-icon icon="$edit"></v-icon>
                            </v-btn>
                        </template>
                        <span>Edit location entry</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="1">
                    <v-tooltip location="end">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                density="compact" icon
                                aria-label="Remove location"
                                @click="serviceStore.removeLocationItem(locIndex)">
                                <v-icon icon="$minus"></v-icon>
                            </v-btn>
                        </template>
                        <span>Remove location entry</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row v-if="locationItem === serviceStore.currLocationItem">
                <v-col cols="6">
                    <v-text-field
                        v-model="serviceStore.currLocationItem.Location"
                        :rules="rules.location"
                        label="Location name">
                    </v-text-field>                
                </v-col>
                <v-col cols="7">
                    <v-text-field
                        v-model="serviceStore.currLocationItem.Address"
                        label="Location address">
                    </v-text-field>                
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        v-model="serviceStore.currLocationItem.Phone"
                        label="Location phone">
                    </v-text-field>                
                </v-col>
                <v-col cols="1">
                    <v-tooltip location="end">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                density="compact" icon
                                aria-label="Apply location"
                                @click="serviceStore.selectLocationItem(-1)">
                                <v-icon icon="$complete"></v-icon>
                            </v-btn>
                        </template>
                        <span>Apply location entry</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </div>
        <v-row>
        <v-col cols="12" class="ml-4 mb-0 pb-0">
            Contact information is only used by PATH staff.  It will not be published.
        </v-col>
        <v-col cols="4">
            <v-text-field
            v-model="serviceStore.currService.ContactName"
            label="Contact Name (optional)">
            </v-text-field>              
        </v-col>
        <v-col cols="4">
            <v-text-field
            v-model="serviceStore.currService.ContactPhone"
            label="Contact Phone (optional)">
            </v-text-field>              
        </v-col>
        <v-col cols="4">
            <v-text-field
            v-model="serviceStore.currService.ContactEMail"
            label="Contact E-Mail (optional)">
            </v-text-field>              
        </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
              <v-btn 
              type="submit" 
              color="primary"
              @click="$emit('formSubmitted')">
              Submit Service
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
    import { useServiceStore } from '@/stores/services'
    import { useUserStore } from '@/stores/user';
    import { isURL } from '@/api/validationUtils'

    const serviceStore = useServiceStore();
    const userStore = useUserStore();

    const emit = defineEmits(['formSubmitted', 'formEditCancelled']);

    async function submitService() {
      await serviceStore.saveService(userStore.getAccessToken);
      // emit('formSubmitted');
    }

    const rules = {
      serviceNameRules: [
        value => {
          if (value?.length > 2) return true
          return 'Service name is required and must be at least 3 characters' 
        }
      ],
      descriptionRules: [
        value => {
          if (value?.length < 10) return 'Description must be at least 10 characters'
          if (value?.length > 2000) return 'Description must be less than 2000 characters'
          return true
        }
      ],
      location: [
        value => {
          if (value?.length > 2) return true
          return 'Location name is required and must be at least 3 characters'
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