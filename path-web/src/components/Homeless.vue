<template>
  <h2 style="text-align: center; padding: 4px;">Homelessness in Josephine County</h2>
  <v-tabs
      v-model="viewTab"
      fixed-tabs
      bg-color="primary"
      color="yellow"
      slider-color="red">
      <v-tab value="facts">Facts</v-tab>
      <v-tab value="problem">The Problem</v-tab>
      <v-tab value="grantspass">City of Grants Pass</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="viewTab">
        <v-window-item value="facts">
          <v-card>
            <v-card-text>
              <h2 class="pa-2">Facts about homelessness in Josephine County</h2>
              <p class="pa-4 text-h6">In the State of Oregon, there are estimated to be about 18,000 homeless people on a given night.
                This is an average rate of 42.4 homeless for every 10,000 people in the general population.  
                This rate is a slight decrease from the reported rate of 47.6 people per 10,000 population in 2007.
              </p>
              <p class="pa-4 text-h6">As of 2023, there are estimated to be over 600 homeless people in Grants Pass alone
                among its 38,000 residents, which is a rate of 63 homeless per 10,000 in the general population.  
                This is 50% higher than the reported state average, and double the rate estimated in 2007!</p>
              <p class="pa-4 text-h6">In the Medford, Ashland, and Jackson County area, there are estimated to be 1,250 homeless people on a given night, 
                which is an average of 56 people per 10,000 in the general population.  Medford has a very active low barrier shelter and more established
                set of solutions and services to help address the problem, which may help to explain its lower rate.
              </p>
              <p class="pa-4 text-h6">The median "fair market" monthly rental in Grants Pass in 2020 was reported to be $1,070 for a two-bedroom apartment ($12,840 per year).
                This was an increase from $955 per month in 2019.  </p>
              <p class="pa-4 text-h6">The median household income in 2020 was $46,580, meaning half of households have income less than this amount.  
                Rent accounts for 28% of the average household's budget.</p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="problem">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" class="text-h4" style="text-align: center;">
                  <p>Complexity of the Problem of Homelessness</p>
                </v-col>
              </v-row>
              <h3 class="pa-2"></h3>
              <v-row>
                <v-col cols="4" class="text-h4 pt-16 pl-8">
                  <p>Homelessness is a multi-faceted problem requiring multi-faceted "outside the box" solutions</p>
                </v-col>
                <v-col cols="7" class="pa-4">
                  <img src="/images/HomelessWheel.svg" width="550" height="550">
                </v-col>
              </v-row>
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