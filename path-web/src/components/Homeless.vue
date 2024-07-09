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
            The US Supreme Court accepted the City's appeal of the injunction after unsuccessful attempts 
            to appeal with the 9th Circuit Court.  In June 2024, the Supreme Court announced its decision siding with
            the City, sending the case back to the District Court stating that the City's ordinances did not violate
            the Constitution's 8th Amendment regarding cruel and unusual punishment.
          </p>
          <p style="font-size: 1.1rem" class="ma-4">
            <b>PATH Leadership has provided the following response following the Supreme Court's decision:</b>
          </p>
          <p style="font-size: 1.1rem" class="ma-4 pl-8">
            The Supreme Court has recently ruled in favor of the City of Grants Pass in the Grants Pass vs Johnson case. 
            They ruled that a local ordinance to bar anyone without a permanent residence from sleeping outside does not 
            amount to "cruel and unusual" punishment under the Eighth Amendment. What does this mean for our community? 
            In the coming weeks and months, we will learn how the city intends to move forward now that we have received 
            the decision of the Supreme Court. 
          </p>
          <p style="font-size: 1.1rem" class="ma-4 pl-8">
            As always, PATH is committed to working with our community partners to find sustainable solutions for helping 
            people transition from homelessness to a self-sufficient future. Now, more than ever, we need to work together 
            to find and establish ways to get our unhoused out of the parks and public places, and into programs that help 
            them to get back on their feet, whether that be through drug and alcohol treatment, mental health assistance, 
            disability assistance, job placement, transitional or affordable housing. 
          </p>
          <p style="font-size: 1.1rem" class="ma-4 pl-8">
            For those who are ready to improve their lives, there are great opportunities ahead for them. PATH’s desire 
            is to see within our community more places where those who need a hand up have a way to get their lives on 
            track. There are several steps we can and are taking to accomplish just that.
          </p>
          <p style="font-size: 1.1rem" class="ma-4 pl-8">
            We currently partner with groups who are seeking sustainable solutions to our housing, addiction, and mental 
            health crises, PATH’s desire for our community, is to have:
          </p>
          <ul class="pl-4" style="font-size: 1.1rem">
            <li class="ml-14 pb-4 pl-4" >
              A safe, low barrier shelter where people can go to get immediate assistance to overcome 
              the challenges in their lives, so they can begin their journey to becoming a positive 
              contributing member of our community.
            </li>
            <li class="ml-14 pb-4 pl-4">
              A safe, well organized, urban campground, where people can go who just need a temporary respite on 
              their way to a more permanent solution. 
            </li>
            <li class="ml-14 pb-4 pl-4">
              Mental health services and substance abuse and addiction resources that are available to those 
              who have immediate and long-term needs for assistance.
            </li>
            <li class="ml-14 pb-4 pl-4">
              A place where people who need employment on an immediate basis can find positions, but also access 
              to job placement assistance for permanent family-wage jobs.
            </li>            
            <li class="ml-14 pb-4 pl-4">
              Affordable housing for those who need it, to include transitional housing, group homes, housing 
              for low-income seniors and Veterans, workforce housing, as well as affordable move-up housing 
              for those who wish to leave smaller units as their family grows thus freeing up smaller units.
            </li>            
            <li class="ml-14 pb-4 pl-4">
              Prevention services to help people stay in their homes while navigating a short-term setback.
            </li>            
          </ul>
          <p style="font-size: 1.1rem" class="ma-4 pl-8">
            For those who see these ideas as unrealistic, utopian visions, we can say that we know of several 
            groups that are actively working on many of these solutions and more. We believe that within our 
            community there is enough willpower and motivation to move these ideas forward. Things have been 
            changing for the better within our community in the last several months, and we believe they will 
            continue to improve slowly, but surely. The "Can Do Spirit" of Southern Oregon is alive and well, 
            and PATH is proud to play a role in getting things done! By working together, we can find and 
            implement solutions that will be long-term successes for those who today may not feel any hope for 
            a bright future. But working together, we can provide that hand up for those who are willing to take 
            it. We can certainly make a great impact in their lives, and ultimately in our community.
          </p>
          <p style="font-size: 1.1rem" class="ma-4 pl-8">
            PATH’s President, Julie Thomas has said, <b>"For those who say, 'It can't be done!': Get out of the 
            way of those who are doing it!"</b>
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