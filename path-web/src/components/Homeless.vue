<template>
  <h2 style="text-align: center; padding: 4px;">Homelessness in Josephine County</h2>
  <v-tabs
      v-model="viewTab"
      fixed-tabs
      bg-color="primary"
      color="yellow"
      slider-color="red"
    >
      <v-tab value="facts">Facts</v-tab>
      <v-tab value="problem">The Problem</v-tab>
      <v-tab value="services">Types of Services</v-tab>
      <v-tab value="grantspass">City of Grants Pass</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="viewTab">
        <v-window-item value="facts">
          <v-card>
            <v-card-text>
              <h3 class="pa-2">Facts about homelessness in Josephine County</h3>
              <p class="pa-4">In the State of Oregon, there are estimated to be about 18,000 homeless people on a given night.
                This is an average rate of 42.4 homeless for every 10,000 people in the general population.  
                This rate is a slight decrease from the reported rate of 47.6 people per 10,000 population in 2007.
              </p>
              <p class="pa-4">As of 2023, there are estimated to be over 600 homeless people in Grants Pass alone
                among its 38,000 residents, which is a rate of 63 homeless per 10,000 in the general population.  
                This is 50% higher than the reported state average, and double the rate estimated in 2007!</p>
              <p class="pa-4">In the Medford, Ashland, and Jackson County area, there are estimated to be 1,250 homeless people on a given night, 
                which is an average of 56 people per 10,000 in the general population.  Medford has a very active low barrier shelter and more established
                set of services to help address the problem, which may help to explain its lower rate.
              </p>
              <p class="pa-4">The median "fair market" monthly rental in Grants Pass in 2020 was reported to be $1,070 for a two-bedroom apartment ($12,840 per year).
                This was an increase from $955 per month in 2019.  </p>
              <p class="pa-4">The median household income in 2020 was $46,580, meaning half of households have income less than this amount.  
                Rent accounts for 28% of the average household's budget.</p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="problem">
          <v-card>
            <v-card-text>
              <h3 class="pa-2">Complexity of the Problem of Homelessness</h3>
              <p class="pa-4"></p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="services">
          <v-card>
            <v-card-text>
              <h3 class="pa-2">Types of Services</h3>
              <h4 class="pa-4">Navigational services</h4>
              <h4 class="pa-4">Temporary and transitional shelter</h4>
              <h4 class="pa-4">Permanent housing assistance</h4>
              <h4 class="pa-4">Food assistance</h4>
              <h4 class="pa-4">Mental health and emotional support</h4>
              <h4 class="pa-4">Medical treatment</h4>
              <h4 class="pa-4">Job placement and training opportunities</h4>
              <h4 class="pa-4">Substance abuse and addiction recovery</h4>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="grantspass">
          <h3 class="pa-2">Homelessness in Grants Pass</h3>
          <h4 class="pa-4">The Court Injuction</h4>
          <h4 class="pa-4">Relevant Ordinances</h4>
          <h4 class="pa-4">Programs</h4>
          <h4 class="pa-4">Other Actions</h4>
        </v-window-item>
      </v-window>
    </v-card-text>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    const viewTab = ref(null)
  </script>