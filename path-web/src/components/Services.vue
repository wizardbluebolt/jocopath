<template>
  <v-card variant="outlined" v-for="service in allServices">
    <v-card-item>
      <v-card-title>
        {{ service.name }}
      </v-card-title>
      <v-card-text>
        <p class="pa-4">{{ service.description }}</p>
        <p><b>Areas Served: </b>{{ service.locations }}</p>
        <p><b>Address: </b>{{ service.address }}</p>
        <p><b>Phone: </b>{{ service.phone }}</p>
        <p><b>E-Mail: </b>{{ service.email }}</p>
      </v-card-text>
    </v-card-item>
  </v-card>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    const allServices = ref(
      [
        {
          name: "Angels",
          description: "",
          locations: "",
          address: "1000 7th Street, Grants Pass, OR 97526",
          phone: "(541) 555-1234",
          email: "xxxx@yyyy.org",
          weburl: "https://www.service.org"
        },
        { 
          name: "Josephine County Food Bank",
          description: "Food distribution center serving community pantries throughout Josephine County.  The Food Bank is NOT itself a food pickup location for the general public.  The Food Bank provides food assistance for 18,000 residents of Josephine County. ",
          locations: "Josephine County",
          address: "3658 Upper River Rd, Grants Pass, OR 97526",
          phone: "(541) 555-1234",
          email: "info@jocofoodbank.org",
          weburl: "https://www.jocofoodbank.org"
        },
        {
          name: "Maslow Project",
          description: "",
          locations: "",
          address: "1000 7th Street, Grants Pass, OR 97526",
          phone: "(541) 555-1234",
          email: "xxxx@yyyy.org",
          weburl: "https://www.service.org"
        },   
        {
          name: "On Track Rogue Valley",
          description: "",
          locations: "",
          address: "1000 7th Street, Grants Pass, OR 97526",
          phone: "(541) 555-1234",
          email: "xxxx@yyyy.org",
          weburl: "https://www.service.org"
        },    
        {
          name: "Options for Southern Oregon",
          description: "",
          locations: "",
          address: "1000 7th Street, Grants Pass, OR 97526",
          phone: "(541) 555-1234",
          email: "xxxx@yyyy.org",
          weburl: "https://www.service.org"
        }, 
        {
          name: "Safe Parking Program",
          description: "",
          locations: "",
          address: "1000 7th Street, Grants Pass, OR 97526",
          phone: "(541) 555-1234",
          email: "xxxx@yyyy.org",
          weburl: "https://www.service.org"
        },
        {
          name: "Josephine Community Library",
          description: "Through JosephineLINK, find up-to-date information for hundreds of community organizations — legal assistance, family services, volunteer opportunities, and more. This easy-to-use community resource directory is updated regularly with the most current contact information, hours, and locations.  Wifi hotspots, laptop checkout.",
          locations: "Grants Pass, Illinois Valley, Williams, Wolf Creek",
          address: "200 NW C Street, Grants Pass, OR 97526",
          phone: "(541) 476-0571",
          email: "",
          weburl: "https://josephinelibrary.org"
        },
      ])
  </script>