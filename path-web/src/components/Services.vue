<template>
  <h3 style="text-align: center;">Services</h3>
  <v-card variant="outlined" v-for="service in allServices">
    <v-card-item>
      <v-card-title>
        {{ service.name }}
      </v-card-title>
      <v-card-text>
        <p class="pa-4">{{ service.description }}</p>
        <p class="pa-4" v-for="location in service.locations">
          <p><b>Location: </b>{{ location.location }}</p>
          <p v-if="location.address.length > 0"><b>Address: </b>{{ location.address }}
            <v-tooltip location="end">
              <template v-slot:activator="{ props }">
                <v-btn 
                  v-bind="props"
                  density="compact" 
                  aria-label="Copy Address" 
                  icon
                  @click="doCopy(location.address)">
                  <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>Copy address</span>
            </v-tooltip>
          </p>
          <p v-if="location.phone.length > 0">
            <b>Phone: </b>{{ location.phone }}
            <v-tooltip location="end">
              <template v-slot:activator="{ props }">
                <v-btn 
                  v-bind="props"
                  density="compact" 
                  aria-label="Copy Phone" 
                  icon
                  @click="doCopy(location.phone)">
                  <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>Copy phone</span>
            </v-tooltip>
          </p>
        </p>
        <p v-if="service.email.length > 0">
          <b>E-Mail: </b>{{ service.email }}
          <v-tooltip location="end">
            <template v-slot:activator="{ props }">
              <v-btn 
                v-bind="props"
                density="compact" 
                aria-label="Copy E-Mail" 
                icon
                @click="doCopy(service.email)">
                <v-icon color="grey-lighten-1">mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <span>Copy e-mail</span>
          </v-tooltip>
        </p>
        <p>
          <a v-if="service.weburl.length > 0" :href="service.weburl">Web Site</a>
        </p>
      </v-card-text>
    </v-card-item>
  </v-card>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import { toClipboard } from '@soerenmartius/vue3-clipboard'
    
    function doCopy(pText) {
      toClipboard(pText)
    }

    const allServices = ref(
      [
        { 
          name: "Josephine County Food Bank",
          description: "Food distribution center serving community pantries throughout Josephine County.  The Food Bank is NOT itself a food pickup location for the general public.  The Food Bank provides food assistance for 18,000 residents of Josephine County. ",
          locations: [
            {
              location: "Josephine County",
              address: "3658 Upper River Rd, Grants Pass, OR 97526",
              phone: "(541) 555-1234",
            }
          ],
          email: "info@jocofoodbank.org",
          weburl: "https://www.jocofoodbank.org"
        },
        {
          name: "Maslow Project",
          description: "Empowers homeless youth to thrive independently through supports that stabilize and engage in all aspects of life.",
          locations: [
            {
              location: "Medford",
              address: "500 Monroe St, Medford, OR 97501",
              phone: "(541) 608-6868",
            }, 
            {
              location: "Grants Pass",
              address: "223 SE M St, Grants Pass, OR 97526",
              phone: "(541) 841-1974",
            }
          ],
          email: "",
          weburl: "https://www.maslowproject.com/"
        },   
        {
          name: "On Track Rogue Valley",
          description: "Provides addiction recovery help.  Offers treatment programs for domestic abuse, DUII counselling and education, and anger management.",
          locations: [
            {
              location: "Grants Pass",
              address: "720 NW 6th St, Grants Pass, OR 97526",
              phone: "(541) 955-9227",
            },
            {
              location: "Cave Junction",
              address: "219 S Redwood Hwy, Cave Junction, OR 97523",
              phone: "(541) 592-5350",
            }
          ], 
          email: "",
          weburl: "https://ontrackroguevalley.org"
        },  
        {
          name: "Options for Southern Oregon",
          description: "Provides an array of mental health and addition programs in Josephine and Jackson Counties.",
          locations: [
            {
              location: "Grants Pass",
              address: "1215 SW G St, Grants Pass, OR 97526",
              phone: "(541) 476-2373",
            }
          ],
          email: "",
          weburl: "https://optionsonline.org"
        }, 
        {
          name: "Safe Parking Program",
          description: "Facilitates the ability of service groups and businesses who wish to allow limited overnight parking of vehicles for people who lack shelter in our community.",
          locations: [
            {
              location: "Grants Pass",
              address: "",
              phone: "(541) 450-6068",
            }
          ],
          email: "aneeck@grantspassoregon.gov",
          weburl: "https://www.grantspassoregon.gov/FormCenter/Community-Development-3/SAFE-PARKING-PROGRAMS-APPLICATION-97"
        },
        {
          name: "Josephine Community Library",
          description: "Through JosephineLINK, find up-to-date information for hundreds of community organizations — legal assistance, family services, volunteer opportunities, and more. This easy-to-use community resource directory is updated regularly with the most current contact information, hours, and locations.  Wifi hotspots, laptop checkout.",
          locations: [
            {
              location: "Grants Pass",
              address: "200 NW C Street, Grants Pass, OR 97526",
              phone: "(541) 476-0571",
            },
            {
              location: "Illinois Valley",
              address: "209 W Palmer, Cave Junction, OR 97523",
              phone: "(541) 592-4778",
            },
            {
              location: "Williams",
              address: "158 Tetherow Rd, Williams, OR 97544",
              phone: "(541) 846-7020",
            },
            {
              location: "Wolf Creek",
              address: "102 Ruth Ave, Wolf Creek, OR 97497",
              phone: "(541) 866-2606",
            },
          ],
          email: "",
          weburl: "https://josephinelibrary.org"
        },
      ])
  </script>