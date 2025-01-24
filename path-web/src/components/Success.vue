<template>
  <v-sheet>
    <h2 style="text-align: center; padding: 4px;">Success Stories</h2>
    <v-tabs
      v-model="viewTab"
      fixed-tabs
      bg-color="primary"
      color="yellow"
      slider-color="red">
      <v-tab value="programs">Successful Programs</v-tab>
      <v-tab value="accomplish">PATH Accomplishments</v-tab>
    </v-tabs>
    <v-window v-model="viewTab">
      <v-window-item value="programs">
        <v-card v-for="program in allPrograms" class="ma-4">
          <v-card-item>
            <v-card-title>
              {{ program.name }}
            </v-card-title>
            <v-card-text style="font-size: 1.1rem;" class="ml-4">
              <a :href="program.link">Web Link</a>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-window-item>
      <v-window-item value="accomplish">
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
      </v-window-item>
    </v-window>
  </v-sheet>
</template>
  
<script setup>
  import { ref } from 'vue';

  const viewTab = ref(null);
  const allPrograms = ref([
    {
      name: "Transitional Housing in Grants Pass",
      link: "https://youtu.be/NU8f4PDNWKE?si=EPQdi7qzMUjExsmf"
    },
    {
      name: "Transitional Housing in Eugene",
      link: "https://youtu.be/yLgW-i_ZYCs?si=LkQ3aIaRnMqJ96Nk"
    },
    {
      name: "Affordable Housing in Eugene",
      link: "https://youtu.be/KX2_Q5ejUpc?si=AvaO-BrmvwWi376O"
    },
    {
      name: "Finland as a case study",
      link: "https://www.cnn.com/2023/06/25/uk/prince-william-homeless-intl-scli?fbclid=IwAR0AM-fMYT0k4GqEYS1urDDF9dTjoXftJmD_a9l4S-nPwROpIT98-mzysPc"
    },
    {
      name: "Finland Solved Homelessness",
      link: "https://youtu.be/0jt_6PBnCJE?si=Ia97m138YWv6MLv6"
    },
    {
      name: "Houston moved 25,000 off the street",
      link: "https://www.nytimes.com/2022/06/14/headway/houston-homeless-people.html?smid=url-share&fbclid=IwAR1fRTv3WGFM9XwtHoeo1QleeyO1Dj8uyAC8jXjg-ZQEiFZ88hMQhWLFstI"
    },
    {
      name: "Houston homelessness breakthrough",
      link: "https://www.cnn.com/2023/06/08/opinions/homelessness-solutions-houston-model-eichenbaum-nichols?embedded_webview=true&fbclid=IwAR3XGggtDmv9Fz-0tGBOaTp7sADfQBJ_JRxDGZNeGWCcHqFvp1Ea8fYQRVs"
    }
  ])
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
        }
      ]
    },
    {
      when: "2024",
      what: [
        {
          item: "Donated 1,167 pounds of food (and counting) to the Food Bank through the Green Bag Project."
        },
        {
          item: "Along with Grants Pass Kiwanis, we have compiled 11 Welcome Home Kits for homeless Maslow families " + 
                "moving into new apartments. As we saw the need for further resources, in partnership with some of our " + 
                "community partners, we searched and fulfilled the needs requests for furniture and household items for all 11 families. "
        },
        {
          item: "Rallied community partners to support the implementation of a warming and navigation center operated by MINT and UCAN, " + 
                "and a cooling and navigation center operated by MINT at Parker`s Place."
        },
        {
          item: "We hold monthly meetings to highlight non-profits and other organizations working in the area who are trying to bring hope, " + 
                "help, and solutions to the unhoused. We actively recruit volunteers and donors to assist these organizations, " + 
                "our community partners."
        },
        {
          item: "Advocated for the lifting of the injunction against the City of Grants Pass and collaborated with the city and police officials " + 
                "to strategize a plan for moving forward, specifically to exclude the parks for encampments and the temporary use of a few city " + 
                "lots for people transitioning from the parks."
        }, 
        {
          item: "PATH meets with non-profit groups and organizations regularly to find ways to help them implement their solutions sustainably. "
        },
        {
          item: "PATH`s Information/Communications Committee has worked hard to find `best practices` for communicating positively and " + 
                "transparently with our community about all things homelessness and to find the best ways to combat disinformation and " + 
                "to disseminate facts instead. To assist in this, this committee has created a Facebook page, has a phone number, " + 
                "an email address, a new informational pamphlet and a great website that offers a place for interested people to learn " + 
                "about PATH, upcoming events, volunteer and giving opportunities, and to learn more about homelessness in our community."
        },
        { 
          item: "We have donated Bibles, needed household items, and furniture for Hearts with a Mission families."
        }, 
        {
          item: "In partnership with Our Foster Kids, we were able to fill new backpacks with school supplies just in time for the first day of " + 
                "school for Hearts with a Mission children and youth."
        },
        {
          item: "A group of PATH members formed to bring a Recovery Café to Grants Pass. Recovery Café Grants Pass - Hope and Recovery on the Rogue, " + 
                "will meet the needs of those in recovery by standing alongside their members on their recovery journey.  They have expanded their " + 
                "core team, formed a 501c3 nonprofit organization and plan to open a site in the first half of 2025."
        }, 
        { 
          item: "Even though we were told it couldn`t be done, we have successfully bridged the gap between many local non-profits and have " + 
                "created opportunities for them to begin working together to support each other`s efforts…. a win-win for all. We also regularly " + 
                "connect those in need with the resources available to them."
        },
        {
          item: "PATH has participated in several outreach events for Nonprofits and community organizations, including the July 2024 Nonprofit " + 
                "Showcase and an informational desk at the St Anne`s Catholic Church."
        },
        {
          item: "We have PATH volunteers imbedded in, or supporting several non-profit organizations to assist them in fulfilling their mission. " + 
                "Including MINT, the Food Bank, Maslow Project, Recovery Café Grants Pass, Josephine Community Library, and many others."
        },
        {
          item: "PATH, Recovery Café Grants Pass, and Dove Ministries participated in a Volunteer Recruitment event at St Anne`s Church with great success."
        },
        {
          item: "PATH`s Housing Committee has worked tirelessly to identify housing initiatives, housing projects, grant opportunities, etc. " + 
                "to help advocate for all things housing to include low-income, affordable, workforce, transitional, tiny homes, modular homes, " + 
                "senior and Veteran housing, and more. They also worked to identify barriers that exist to those experiencing being unhoused " + 
                "to try and find solutions to those barriers."
        },
        {
          item: "PATH`s Mental Health and Recovery Solutions committee has done extensive research as to the complexities of addiction, " + 
                "mental illness, and barriers and solutions associated with both. They have met with numerous community partners working in " + 
                "these areas to identify ways to assist them in their efforts. "
        },
        {
          item: "PATH has provided volunteer support to the Annual PIT (Point in Time) Count in Josephine County."
        },
        {
          item: "We have had many PATH members volunteering at the Warming and the Cooling centers for the past two years."
        },
        {
          item: "As we met with numerous local non-profit working in this space, we found that many had outdated or underutilized community " + 
                "resource lists. PATH saw the need and filled it by creating an up-to-date and relevant Community Resource List of all local " + 
                "entities working to impact homelessness, addiction, mental illness, and much more. This resource guide has been distributed " + 
                "widely and is being used throughout our community to connect resources to those in need. We have also made a live version " + 
                "available via a QR code on the back of our business cards, and on our website. "
        },
        {
          item: "In May, we organized a small group of PATH leaders, local government and community leaders and Park Watch leaders to visit " + 
                "Rogue Retreat`s Crossing campground in Medford.  Sam Engel graciously led the tour and offered many ideas that could be " + 
                "implemented here in Grants Pass. Since then, we have been able to advocate for viable projects for our community and continue " + 
                "to benefit from open lines of communication with Rogue Retreat."
        },
        {
          item: "PATH and U-Turn for Christ came together to develop the first ever furniture exchange program to support newly housed people in our community."
        },
        {
          item: "When the encampments were getting moved from the parks to city lots, it became apparent that there was no potable water available. " + 
                "At the request of the City of Grants Pass, PATH researched all possibilities for potable water supplies and participated in a " + 
                "discussion to resolve the lack of drinking water as quickly as possible. This research and discussion resulted in the successful " + 
                "connecting of UCAN with the City to make potable water available to each site. "
        },
        {
          item: "PATH participated in a brainstorming session between the Mayor, City Council members, and several community partners to discuss the " + 
                "best ways forward as the homeless encampments are moved from the parks and public spaces to the temporary encampment lots."
        },
        {
          item: "PATH participated in a discussion between the Grants Pass Police Department leadership and other community partners including members " + 
                "of MINT and Park Watch to discuss what`s working and not working in the homeless encampments."
        },
        {
          item: "PATH has been a trusted link between City and Police officials and departments and our local non-profits and community partners to " + 
                "ensure we are all working together in a unified spirit."
        }
      ]
    }
  ])
</script>