<template>
  <v-sheet max-width="1200">
    <h2 style="text-align: center; padding: 4px;">Success Stories</h2>
    <v-card v-for="success in allSuccess" class="ma-4">
        <v-card-item>
          <v-card-title>
            {{ success.when }}
          </v-card-title>
          <v-card-text style="font-size: 1.1rem;" class="ml-4">
            <ul>
              <li v-for="action in success.what" class="pa-2">{{ action.item }}</li>
            </ul>
          </v-card-text>
        </v-card-item>
      </v-card>
    </v-sheet>
</template>
  
<script setup>
  import { ref } from 'vue';

  const allSuccess = ref([
    {
      when: "Nov 2022",
      what: [
        {
          item: "PATH was formed.  We began by informing our initial members about the Injunction that was in place " + 
                "over the city of Grants Pass and how it restricts the city from taking legal action " +
                "against the unhoused population who are resting on city property."  
        },
        {
          item: "We divided into committees to research some of what the city of Grants Pass was looking at as possible " +
                "solutions, which included urban campgrounds, a navigation center, low barrier shelters, and the " + 
                "locations for where these services might go."
        },
        {
          item: "We began researching the resources currently available in Josephine County. " + 
                "We tried to get the most up-to-date information on the unhoused population in Josephine County " + 
                "and we looked at successful programs in other cities."
        },
        {
          item: "We posted on social media and became a resource for accurate information regarding the injunction " +
                "against the city of Grants Pass to counter misinformation being posted regarding the lawsuit."
        },
        {
          item: "We worked to change the narratives that were spreading on social media regarding the unhoused " +
                "and worked to promote understanding and possible solutions."
        }
      ]
    },
    {
      when: "Jan 2023",
      what: [
        {
          item: "Members of PATH participated in the Point in Time Count to record the number of unhoused in Josephine County."
        },
        {
          item: "PATH provided many volunteers for the warming shelter in Grants Pass."
        }
      ]
    },
    {
      when: "Feb 2023",
      what: [
        {
          item: "We successfully advocated for the city to spend grant money locally rather than sending it back to the state. " + 
                "Of the three options presented to the City of Grants Pass, two were chosen for the money that was remaining " +
                "from the state."
        },
        {
          item: "We approached the city and successfully advocated for combating homelessness to be part of the city`s " +
                "top priorities for the year in the Strategic Planning Results."
        },
        {
          item: "We continued to successfully counter disinformation on the unhoused crisis in Josephine County on social " +
                "media and our members have become a resource for positive solutions that have helped to dispel some of the " +
                "misconceptions regarding the unhoused in Josephine County."
        }
      ]
    },
    {
      when: "Mar 2023",
      what: [
        {
          item: "We reached out to the Grants Pass Police Department and scheduled a meeting with the Police Chief and " +
                "several officers to get a greater understanding of the crisis of the unhoused in the parks and city. " +
                "We were able to meet the CRT special officer and get several of our questions answered. We invited " +
                "two groups who were just getting started working with the unhoused in the parks to join us."
        },
        {
          item: "Throughout the Spring we encouraged the County Commissioners to declare a county-wide `State of Emergency` " +
                "regarding the unhoused in Josephine County. And, while the commissioners declined to declare a state of emergency, " +
                "we brought attention to the issue."
        },
        {
          item: "We recommended `Angels` enlist the unhoused to pick up garbage in the parks. This became a very successful program " +
                "which is now on hiatus. We successfully recommended `Angels` give the unhoused workers vouchers for " +
                "needed items or services rather than cash as an incentive to help with the park clean-up efforts. " +
                "We recommended the `Angels` group request that Max`s mission change their policy on distributing needles in the park. " +
                "The combined effort was successful."
        },
        {
          item: "We began an ongoing program of attending city meetings to advocate for housing solutions for those who are unhoused " +
                "in Josephine County."          
        }
      ]
    },
    {
      when: "May 2023",
      what: [
        {
          item: "In the summer we participated in the Unitarian and Universalists cooling center when temperatures were over 100 degrees, " +
                "or the air quality became poor."
        },
        {
          item: "At the city`s request, we researched Safe Parking Programs in other cities in Oregon and reported back to city staff on " +
                "several successful programs."
        }
      ]
    },
    {
      when: "Jun 2023",
      what: [
        {
          item: "We successfully advocated for the adoption of the Safe Parking Program ordinance."
        }
      ]
    },
    {
      when: "Jul 2023",
      what: [
        {
          item: "We facilitated the furnishing of Evan`s Place, which is Mid-Rogue foundation`s home that has six rooms for seniors " +
                "who are housing insecure."
        },
        {
          item: "The city asked us to reach out to the non-profits regarding a proposed ordinance to regulate the outreach in the " +
                "city`s parks, which we did."
        },
        {
          item: "We wrote a letter to the city to advocate for changes to the city`s proposed ordinance regarding events for the " +
                "unhoused in the parks.  This work continued in September."
        }
      ]
    },
    {
      when: "Aug 2023",
      what: [
        {
          item: "We met with the Josephine County Democratic Party to raise awareness of our group and work to find areas of consensus."
        },
        {
          item: "We shared an opportunity for low-income housing at the new Cathedral Square Apartments with groups who work with " +
                "those who are housing insecure."
        }
      ]
    },
    {
      when: "Sep 2023",
      what: [
        {
          item: "We met with the Josephine County Republican Party to raise awareness of our group and work to find areas of consensus."
        },
        {
          item: "We shared an opportunity for low-income housing at the new Cathedral Square Apartments with groups who work with " +
                "those who are housing insecure."
        }
      ]
    },
    {
      when: "Other 2023 Successes",
      what: [
        {
          item: "We made multiple hygiene gift bags for Maslow kids and families, and for OnTrack."
        },
        {
          item: "Several PATH members bought Christmas gifts for Maslow family kids."
        },
        {
          item: "Compiled 171 pounds of food donated to the Food Bank during our first month of donating."
        },
        {
          item: "Advocated for the reallocation of the city of Grants Pass`s ARPA funds for a warming center."
        },
        {
          item: "Rallied community partners to support the implementation of a warming and navigation center."
        },
        {
          item: "We have created a Facebook page, phone number, and e-mail address with a new informational pamphlet.  " +
                "We have created a new website."
        }
      ]
    }
  ])
</script>