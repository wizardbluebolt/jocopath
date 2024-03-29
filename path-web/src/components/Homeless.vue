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
      <v-tab value="interviews">Interviews</v-tab>
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
                <v-col cols="4" class="text-h5 pt-16 pl-8">
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
          <h2 class="pa-2">Homelessness in Grants Pass</h2>
          <h3 class="pa-4">The Court Injunction</h3>
          <p style="font-size: 1.1rem" class="ma-4">
            Since July 22, 2020 the City of Grants Pass has been under an injunction 
            issued by a federal District Court judge that greatly impacts how the City
            may enforce its ordinances related to sleeping in public parks.  The full text 
            of the injunction can be found <a href="https://casetext.com/case/blake-v-city-of-grants-pass-1">here</a>.</p>
          <p style="font-size: 1.1rem" class="ma-4">
            The injunction has been upheld under appeal, but has been added to the docket of the current session of the 
            US Supreme Court.  Oral arguments for the case are scheduled for April 2024, and the case should be decided
            by the Court in late spring or early summer this year.
          </p>
<!--           <h4 class="pa-4">Relevant Ordinances</h4>
          <h4 class="pa-4">Programs</h4>
          <h4 class="pa-4">Other Actions</h4> -->
        </v-window-item>
        <v-window-item value="interviews">
          <p v-for="interview in allInterviews" class="ma-8" style="font-size: 1.1rem;">
            <a :href="interview.link">{{ interview.name }}</a>
          </p>
          <p class="ml-8 mt-12">Used by permission of the creator: Angels From the Community For the Community</p>
        </v-window-item>
      </v-window>
    </v-card-text>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    const viewTab = ref(null)
    const allInterviews = ref([
      {
        name: "Mama Bear",
        link: "https://fb.watch/qqlmQsLrfn/"
      },
      {
        name: "Mariah",
        link: "https://fb.watch/qqlG7OuZmQ/"
      },
      {
        name: "Cassandra",
        link: "https://fb.watch/qqlLSqjgv9/"
      },
      {
        name: "Ashly",
        link: "https://www.facebook.com/reel/272478212083746"
      },
      {
        name: "Chris",
        link: "https://www.facebook.com/reel/1212787966067822"
      },
      {
        name: "Andra",
        link: "https://fb.watch/qqm6JeZftY/"
      },
      {
        name: "Carrie",
        link: "https://www.facebook.com/reel/1030123128363130"
      },
      {
        name: "Ally",
        link: "https://fb.watch/qqmjkoq4xM/"
      },
      {
        name: "Teaka",
        link: "https://fb.watch/qqmnW9b7h4/"
      },
      {
        name: "Ally",
        link: "https://fb.watch/qqmCnjhpKi/"
      }
    ])
  </script>