<template>
    <h2 style="text-align: center; padding: 4px;">Volunteer</h2>
    <v-carousel          
        :continuous="false"
        :show-arrows="true"
        :hide-delimiters="true"
        :hide-delimiter-background="true"
        class="fill-height mt-4">
        <v-carousel-item >
            <v-row>
                <v-col cols="12">
                    <p class="text-h4" style="text-align: center;">We Need Your Help!</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8" class="text-h6 pl-8">
                    <ul class="pl-4">
                    <li class="pb-4">We need people who bring experience, expertise, enthusiasm, and a 
                                        passion to make a difference in our community!</li>
                    <li class="pb-4">Furthermore, at our meetings we encourage everyone to focus on solutions
                                        rather than complain about the problems. We want those interested 
                                        in working together to find sustainable solutions to our issues.</li>
                    <li class="pb-4">We have varying opportunities within our committees as well as in 
                                        support of our community partners` efforts to impact homelessness, 
                                        addiction, and mental illness.</li>
                    </ul>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8" class="text-h6 pb-4">
                    <p>“The only thing necessary for the triumph of evil is for good men to do nothing”</p>
                    <p class="pl-4">  -- Edmund Burke (Philosopher)</p>
                </v-col>
            </v-row>
            <v-row class="mt-8">
                <v-col cols="3"></v-col>
                <v-col cols="6" class="pl-12" justify="center">
                    <v-btn elevation="8" to="/news" size="x-large" color="primary">
                        Learn about current opportunities to help
                    </v-btn>
                </v-col>
            </v-row>
        </v-carousel-item>
        <v-carousel-item >
            <v-row>
                <v-col cols="12">
                    <p class="text-h4" style="text-align: center;">How To Become a PATH Member</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8" class="text-h6 pl-8">
                    <ul class="pl-4">
                    <li class="pb-4">Pick a committee or subcommittee that matches your interests and 
                                        skill sets, then attend the next scheduled meeting of that committee.</li>
                    <li class="pb-4">Look at all our community partner projects, volunteer and giving 
                                        opportunities that impact homelessness, and get involved in those 
                                        that match your interest and availability.</li>
                    <li class="pb-4">We also have varying roles within our organization and committees, 
                                        so look at the list of needs and consider volunteering to take 
                                        on one or more of the roles that would be a good fit for you.</li>
                    </ul>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8" class="text-h6 pb-4">
                    <p>“Never doubt that a small group of individuals can change the world. In fact, it`s the 
                    only thing that ever has.”</p><p class="pl-4"> -- Margaret Mead (Cultural Anthropologist)</p>
                </v-col>
            </v-row>
            <v-row class="mt-8">
                <v-col cols="3"></v-col>
                <v-col cols="6" class="pl-12" justify="center">
                    <v-btn elevation="8" to="/news" size="x-large" color="primary">
                        Learn about current opportunities to help
                    </v-btn>
                </v-col>
            </v-row>
        </v-carousel-item>
        <v-carousel-item >
            <v-row>
            <v-col cols="12">
                <p class="text-h4" style="text-align: center;">Types of Services and Needs</p>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="8" class="text-h6 pl-8">
                <ul class="pl-4">
                    <li class="pa-2">Navigational services</li>
                    <li class="pa-2">Temporary and transitional shelter</li>
                    <li class="pa-2">Permanent housing assistance</li>
                    <li class="pa-2">Food assistance</li>
                    <li class="pa-2">Mental health and emotional support</li>
                    <li class="pa-2">Medical treatment</li>
                    <li class="pa-2">Job placement and training opportunities</li>
                    <li class="pa-2">Substance abuse and addiction recovery</li>
                    <li class="pa-2">Volunteers with administrative skills</li>
                </ul>
            </v-col>
            </v-row>
        </v-carousel-item>
        <v-carousel-item >
            <v-row>
            <v-col cols="12">
                <p class="text-h4" style="text-align: center;">Advantages to PATH Membership</p>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="8" class="text-h6 pl-8">
                <ul class="pl-4">
                <li class="pa-4">You no longer have to stand by waiting for someone to DO something 
                                    to impact our homeless, housing, addiction and mental health crisis
                                    in our community.</li>
                <li class="pa-4">You can get actively involved in making a difference.</li>
                <li class="pa-4">You can stay informed on what efforts are making the greatest impact 
                                    and get involved to support those efforts.</li>
                <li class="pa-4">You can be a part of the conversation when new possibilities are being discussed.</li>
                </ul>
            </v-col>
            </v-row>
        </v-carousel-item>
    </v-carousel>
</template>

<script setup>
    import { ref } from 'vue'
    const viewTab = ref(null)
</script>