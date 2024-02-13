<template>
  <h2 style="text-align: center; padding: 4px;">About PATH</h2>
    <v-tabs
      v-model="viewTab"
      fixed-tabs
      bg-color="primary"
      color="yellow"
      slider-color="red">
      <v-tab value="mission">Mission Statement</v-tab>
      <v-tab value="history">History</v-tab>
      <v-tab value="committees">Committees</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="viewTab">
        <v-window-item value="mission">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <h2 class="pa-2">“We collaborate with our community partners to find sustainable
                    solutions to help people transition from homelessness to a self-sufficient
                    future in Josephine County.”</h2>                  
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <v-row dense>
                    <v-col cols="12">
                      <ul class="pa-4 ml-6">
                        <li class="pb-2 text-subtitle-1">We actively support non-profit organizations, law enforcement, city government, 
                          and other local entities working to positively impact these issues plaguing our community
                        </li>
                        <li class="pb-2 text-subtitle-1">Our goal is to work collaboratively with our community partners to find and support 
                          projects and programs that get people off the streets, out of our parks, and into a position
                          where they can get the help they need, with self-sufficiency being the ultimate goal</li>
                        <li class="text-subtitle-1">PATH is NOT a 501(c)(3) organization and does not itself receive or manage monetary donations.</li>
                      </ul>
                    </v-col>
                    <v-col cols="10" class="mb-0 pb-0 ml-4">
                      <img src="/images/JulieThomasHeadshot.png" width="200" class="align-end">
                    </v-col> 
                    <v-col cols="1"></v-col>
                    <v-col cols="8" class="mt-0 pt-0">
                      <v-card-title class="text-subtitle-1">Julie Thomas - PATH President</v-card-title>
                    </v-col>
                  </v-row>                  
                </v-col>
                <v-col cols="6">
                  <img src="/images/TrailPath.jpg" width="500" height="500">
                </v-col>
            </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="history">
          <v-carousel 
          :continuous="false"
          :show-arrows="true"
          :hide-delimiters="true"
          :hide-delimiter-background="true"
          class="fill-height">
          <v-carousel-item>
            <v-row>
              <v-col cols="12">
                <p class="text-h4" style="text-align: center;">What is Our Community Facing?</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="4" class="text-h5 pl-4">
                <p class="pb-6">A Crisis of Homelessness</p>
                <ul class="pl-4">
                  <li class="pb-4">Homeless People in Our Parks</li>
                  <li class="pb-4">People Overdosing on Drugs</li>
                  <li>People Struggling with Mental Illness</li>
                </ul>
              </v-col>
              <v-col cols="6" class="text-h5">
                <p class="pb-6">In Grants Pass in 2023:</p>
                <ul class="pl-4">
                  <li class="pb-4">197 Drug Overdoses</li>
                  <li class="pb-4">15 Deaths from Overdoses</li>
                </ul>
              </v-col>
            </v-row>
          </v-carousel-item>
          <v-carousel-item>
            <v-row>
              <v-col cols="12">
                <p class="text-h4" style="text-align: center;">How did we get here?</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="8" class="text-h5 pl-8">
                <p class="pb-6">Many things have contributed to where we are today, but most notably:</p>
                <ul class="pl-4">
                  <li class="pb-4">Court ordered injunction that allows people to sleep on public property, including parks</li>
                  <li class="pb-4">Measure 110 which decriminalized many drugs</li>
                  <li class="pb-4">Housing shortage, especially affordable housing</li>
                  <li>People choosing a lifestyle with “no rules”</li>
                </ul>
              </v-col>
            </v-row>
          </v-carousel-item>
          <v-carousel-item>
            <v-row>
              <v-col cols="12">
                <p class="text-h4" style="text-align: center;">So, what did we do about it?</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="8" class="text-h5 pb-4">
                <ul>
                  <li class="pb-4">On November 14, 2022, a small group of concerned citizens got together to brainstorm ideas on how to improve our situation.</li>
                  <li class="pb-4">These conversations turned into action.</li>
                  <li>PATH has evolved into a grassroots advocacy and action organization committed to finding sustainable solutions to 
                    positively impact homelessness, addiction, and mental illness in our community.</li>
                </ul>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="9">
                <i class="text-h5">Our name is PATH (Partners Assisting the Homeless)</i>
              </v-col>
            </v-row>
          </v-carousel-item>
         </v-carousel>
        </v-window-item>
        <v-window-item value="committees">
          <v-card variant="outlined" v-for="committee in allCommittees">
            <v-card-item>
              <v-card-title>
                {{ committee.name }}
              </v-card-title>
              <v-card-subtitle style="font-size: 1.1rem">
                <v-avatar :size="60">
                  <v-img
                    :src="committee.photo"></v-img>
                </v-avatar>
                  Chairperson: {{ committee.chair }}
              </v-card-subtitle>
              <v-card-text style="font-size: 1.1rem;">
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
          chair: "Julie Hartford",
          photo: "images/JulieHartfordHeadshot.jpeg",
          purpose: "The Steering Committee consists of the PATH`s President, Vice President, " +
                    "Secretary, and the leaders of each committee.  The Steering Committee sets " +
                    "the policies for PATH and makes all executive decisions.  The committee provides " +
                    "oversight to all other committees and subcommittees. The committee reviews " +
                    "membership and plans the general meetings.  The committee ensures that other " +
                    "committees are not duplicating each other`s efforts or working at cross-purposes.",
          meetingDays: "Twice each month or as necessary to make sure all committees are working in tandem."
        },
        {
          name: "Information and Communications",
          chair: "Richard Flora",
          photo: "images/RichardFloraHeadshot.jpg",
          purpose: "Gather information relevant to homelessness in Josephine County so that we might better facilitate " +
                    "communication within PATH and between the many organizations that provide services to the homeless, " +
                    "our local government, law enforcement, our homeless community, and our community at large.  " + 
                    "We strive to ensure that our communications are consistently positive and productive.  "  + 
                    "The committee responsibilities include administration of the PATH Slack Workgroup, our Facebook page, " +
                    "and the website.  We monitor what is going on with regards to homelessness, within our community, and " +
                    "within the world at large, and keep our members informed so that they can determine how best to respond, " +
                    "if at all.",
          meetingDays: "First and Third Tuesday morning each month"
        },
        {
          name: "Operations and Outreach",
          chair: "Sheryl Eldridge",
          photo: "images/SherylEldridgeHeadshot.jpg",
          purpose: "Identifies and coordinates PATH liaisons to various community service organizations. " +
                    "PATH liaisons reach out to the organizations to find out what each of them do, what services " +
                    "they provide, and what clientele they serve, then ask if there are ways PATH can support their efforts. " +
                    "The committee looks for ways to serve by providing volunteers, services, identifying giving opportunities, " +
                    "or by connecting the organizations with other available resources. This committee`s goal is to identify " +
                    "gaps and fill those gaps within service organizations so they can better accomplish their mission. " +
                    "We would love to invite those having a connection to a church or organization in Josephine County to " +
                    "become a liaison.",
          meetingDays: "Second Friday afternoon each month"
        },
        {
          name: "Safe Parking Program Outreach (Subcommitee)",
          chair: "Judy Ano",
          photo: "images/JudyAnoHeadshot.jpg",
          purpose: "The City of Grants Pass offers the Safe Parking Program, and our committee focuses on reaching " +
                    "out to eligible Grants Pass business locations. Based upon the city`s ordinance and interviews " +
                    "with successful host sites, we developed a packet of information that we share with interested " +
                    "organizations. Our goal is to locate overnight safe parking sites who will offer temporary " +
                    "parking for unhoused individuals and families living in their vehicles.",
          meetingDays: "Occasional as needed"
        },
        {
          name: "Mental Health and Addiction Recovery Solutions",
          chair: "Ann Igl",
          photo: "images/AnnIglHeadshot.jpg",
          purpose: "The committee is dedicated to supporting and creating pathways to recovery for those suffering from " +
                    "addiction and/or mental health challenges within the homeless population in Josephine County. " +
                    "We seek to better understand the intersection between homelessness, addiction, and mental health " +
                    "disorders so that we can be effective in supporting pathways to recovery. We utilize a Biopsychosocial " +
                    "model to help us research, reach out, and support treatment providers, volunteers, and the affected homeless population",
          meetingDays: "Monday afternoons, twice each month"
        },
        {
          name: "Housing and Development",
          chair: "Doug Walker",
          photo: "images/MissingHeadshot.png",
          purpose: "Support efforts to increase housing and new developments in the community.",
          meetingDays: "Monthly"
        },   
/*         {
          name: "Fundraising",
          chair: "TBD",
          photo: "images/MissingHeadshot.png",
          purpose: "Identify ways to raise funds to support PATH partners and operations.",
          meetingDays: "Not currently active"
        },          */                    
      ])
  </script>