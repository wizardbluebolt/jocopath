<template>
  <h2 style="text-align: center; padding: 4px;">About PATH</h2>
    <v-tabs
      v-model="viewTab"
      fixed-tabs
      bg-color="primary"
      color="yellow"
      slider-color="red"
    >
      <v-tab value="mission">Mission Statement</v-tab>
      <v-tab value="history">History</v-tab>
      <v-tab value="committees">Committees</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="viewTab">
        <v-window-item value="mission">
          <v-card>
            <v-card-text>
              <h3 class="pa-2">We create and advocate for sustainable services and facilities to help people transition out of 
          homelessness and provide a better future for all in Josephine County.</h3>
              <p class="pa-2">Our amazing team of volunteers are committed to helping 
            to reduce homelessness in Josephine County.</p>
              <p class="pa-2">We work with our partners in the field and connect with our elected leaders.</p>
              <p> </p>
              <p class="pa-2">Think you would be a good fit?  Click the link at the bottom of the page to learn how you can volunteer!</p>
              <p> </p>
              <p class="pa-2">The purpose of PATH is to find positive workable solutions to help those in our community who are unhoused.</p>
              <p> </p>
              <p class="pa-2">The purpose of this website is:</p>
              <ul class="pa-4 ml-6">
                  <li>to provide examples of programs that have been shown to be successful elsewhere,</li>
                  <li class="pt-2">to provide interviews of people experiencing homelessness here in our community 
                    so that we might better understand them and their situation,</li>
                  <li class="pt-2">to provide information about the many service providers that help the homeless 
                    and give them an opportunity to list their events and share their results,</li>
                  <li class="pt-2">to provide updates about the status of state and federal laws and court actions 
                    that affect homelessness and that affect our community, and</li>
                  <li class="pt-2">
                    <ul class="pt-2">
                      to provide information about actions that are being taken by our city and county governments that affect:
                      <div style="text-indent: 1em; padding-left: 1em;">
                        <li>affordable housing,</li>
                        <li>homelessness,</li>
                        <li>returning our parks to their original intent as places for relaxation and recreation 
                          for everyone, not emergency campgrounds.</li>
                      </div>
                    </ul>
                  </li>
              </ul>
              <h3 class="pa-2">This website is not a place to assign blame either directly or by implication. 
                We encourage comments, suggestions, and questions that further or clarify our goals. However, comments that are 
                divisive will be removed and commenters who continue to make such remarks will have their privileges revoked.</h3>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="history">
          PATH of Josephine County was formed in November of 2022 by ...
        </v-window-item>
        <v-window-item value="committees">
          <v-card variant="outlined" v-for="committee in allCommittees">
            <v-card-item>
              <v-card-title>
                {{ committee.name }}
              </v-card-title>
              <v-card-subtitle>
                <v-avatar>
                  <v-img
                    :src="committee.photo"></v-img>
                </v-avatar>
                  Chairperson: {{ committee.chair }}
              </v-card-subtitle>
              <v-card-text>
                <p>{{ committee.purpose }}</p>
                <p class="pt-4"><b>Meets: </b>{{ committee.meetingDays }}</p>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>
</template>
  
  <script setup>
    import { ref } from 'vue'
    const viewTab = ref(null)
    const allCommittees = ref(
      [
        {
          name: "Steering",
          chair: "Julie Thomas",
          photo: "images/JulieThomasHeadshot.png",
          purpose: "Overall governance of the PATH group.",
          meetingDays: "First Tuesday of each month"
        },
        {
          name: "Information and Communications",
          chair: "Richard Flora",
          photo: "images/RichardFloraHeadshot.jpg",
          purpose: "Gather information related to homelessness and facilitate communications with and between our members, the organizations who provide services that affect the homeless, our local government, the homeless, and the citizens of Josephine County.",
          meetingDays: "Tuesday 2pm to 3:30pm each week"
        },
        {
          name: "Operations and Outreach",
          chair: "Diane Dahlgren",
          photo: "images/MissingHeadshot.png",
          purpose: "Support specific events, volunteer groups, and coordinate with non-profits.",
          meetingDays: "Friday each week"
        },
        {
          name: "Fundraising",
          chair: "TBD",
          photo: "images/MissingHeadshot.png",
          purpose: "Identify ways to raise funds to support PATH operations.",
          meetingDays: "Fifth Wednesday each month"
        },
        {
          name: "Housing and Development",
          chair: "Doug Walker",
          photo: "images/MissingHeadshot.png",
          purpose: "Support efforts to increase housing and new developments in the community.",
          meetingDays: "Second Tuesday each month"
        },   
        {
          name: "Mental Health and Addiction Recovery Solutions",
          chair: "Ann Igl",
          photo: "images/MissingHeadshot.png",
          purpose: "Support organizations providing mental health and addition recovery solutions.",
          meetingDays: "Third Thursday of each month"
        },                                     
      ])
  </script>