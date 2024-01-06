<template>
  <h3 style="text-align: center;">Homelessness in Josephine County</h3>
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
              <p class="pa-4">As of 2023, there are estimated to be over 600 homeless people in Grants Pass alone
                among its 38,000 residents.</p>
              <p class="pa-4">The median monthly rental in Grants Pass is $x,xxx while the median income is $x,xxx.</p>
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