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
              <v-row>
                <v-col cols="12">
                  <h2 class="pa-2">“We advocate for sustainable services to help people transition out of homelessness 
                    to a self-sufficient future in Josephine County.”</h2>                  
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="12">
                      <ul class="pa-4 ml-6">
                        <li class="pb-6 text-h6">We actively support law enforcement, city government, non-profit organizations, 
                          and other local entities working to positively impact these issues plaguing our community
                        </li>
                        <li class="text-h6">Our goal is to work collaboratively with our community partners to find and support 
                          projects and programs that get people off the streets, out of our parks, and into a position
                          where they can get the help they need, with self-sufficiency being the ultimate goal</li>
                      </ul>
                    </v-col>
                    <v-col cols="10">
                      <img src="images/JulieThomasHeadshot.png" width="200"><span class="pl-4 text-base-1">Julie Thomas - PATH President</span>
                    </v-col> 
                    <v-col cols="2"></v-col>
                  </v-row>                  
                </v-col>
                <v-col cols="6">
                  <img src="images/TrailPath.jpg" width="600" height="500">
                </v-col>
            </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="history">
          <v-carousel 
          :continuous="false"
          :show-arrows="true">
          <v-carousel-item>
            <v-row>
              <v-col cols="12">
                <p class="text-h4" style="text-align: center;">What is the Problem?</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="4" class="text-h5 pl-8">
                <p class="pb-6">A Crisis of Homelessness</p>
                <ul class="pl-4">
                  <li class="pb-4">Lack of Affordable Housing</li>
                  <li class="pb-4">Homeless People in Our Parks</li>
                  <li class="pb-4">People Overdosing on Drugs</li>
                  <li>People Struggling with Mental Illness</li>
                </ul>
              </v-col>
              <v-col cols="6" class="text-h5">
                <p class="pb-6">In Grants Pass in the First Nine Months of 2023:</p>
                <ul class="pl-4">
                  <li class="pb-4">146 Drug Overdoses</li>
                  <li class="pb-4">14 Deaths from Overdoses</li>
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
                  <li class="pb-4">Housing shortage</li>
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
                  <li>This small group has evolved into a grassroots advocacy and action organization committed to finding sustainable solutions to 
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
            <v-card-item class="text-body-1">
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
          meetingDays: "First and Third Tuesday afternoon each month"
        },
        {
          name: "Operations and Outreach",
          chair: "Diane Dahlgren",
          photo: "images/MissingHeadshot.png",
          purpose: "Identifies and coordinates PATH liaisons to various community service organizations. " +
                    "PATH liaisons reach out to the organizations to find out what each of them do, what services " +
                    "they provide, and what clientele they serve, then ask if there are ways PATH can support their efforts. " +
                    "The committee looks for ways to serve by providing volunteers, services, identifying giving opportunities, " +
                    "or by connecting the organizations with other available resources. This committee`s goal is to identify " +
                    "gaps and fill those gaps within service organizations so they can better accomplish their mission. " +
                    "We would love to invite those having a connection to a church or organization in Josephine County to " +
                    "become a liaison.",
          meetingDays: "Monthly"
        },
        {
          name: "Fundraising",
          chair: "TBD",
          photo: "images/MissingHeadshot.png",
          purpose: "Identify ways to raise funds to support PATH operations.",
          meetingDays: "Not currently active"
        },
        {
          name: "Housing and Development",
          chair: "Doug Walker",
          photo: "images/MissingHeadshot.png",
          purpose: "Support efforts to increase housing and new developments in the community.",
          meetingDays: "Monthly"
        },   
        {
          name: "Mental Health and Addiction Recovery Solutions",
          chair: "Ann Igl",
          photo: "images/MissingHeadshot.png",
          purpose: "The committee is dedicated to supporting and creating pathways to recovery for those suffering from " +
                    "addiction and/or mental health challenges within the homeless population in Josephine County. " +
                    "We seek to better understand the intersection between homelessness, addiction, and mental health " +
                    "disorders so that we can be effective in supporting pathways to recovery. We utilize a Biopsychosocial " +
                    "model to help us research, reach out, and support treatment providers, volunteers, and the affected homeless population",
          meetingDays: "Twice each month"
        },                                     
      ])
  </script>