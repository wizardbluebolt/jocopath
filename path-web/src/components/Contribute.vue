<template>
    <v-container class="fill-height">
      <v-responsive>
  
        <v-row class="d-flex align-center justify-center">
          <v-col cols="auto">
            <h2>How to Contribute to This Website</h2>
          </v-col>
        </v-row>
        <v-row>
            <v-col cols="auto">
                If you are already registered with the PATH of Josephine County website, you 
                can proceed to the <router-link to="/contact">contributions page</router-link>.
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="auto">
                This website is intended to be a common, dynamic clearinghouse for information 
                regarding homelessness in our community and efforts to address it.  To help keep
                the information timely, accurate, and as complete as possible, PATH welcomes
                community members who have information to share it with us so that we can include
                it.  Contributors must register with the website in order to facilitate
                collaboration and review of content and to provide accountability.
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="auto">
                Contributions will be reviewed by PATH staff to ensure they are relevant and appropriate
                for sharing on this website.  PATH staff may contact content submitters to clarify questions
                or refine the provided content to align with the intent of this site.
            </v-col>
        </v-row>        
        <v-row>
            <v-col cols="auto">
                Contributors can provide information about:
            </v-col>
        </v-row>
        <v-list>
            <v-list-item>
                <v-list-item-title><b>Services</b></v-list-item-title>
                <p>Services provided by non-profits, government organizations, or businesses that can directly 
                benefit unhoused individuals.</p>
            </v-list-item>
            <v-list-item>
                <v-list-item-title><b>News</b></v-list-item-title>
                <p>News related to homelessness in our county that would be of interest to the community.</p>
            </v-list-item>
            <v-list-item>
                <v-list-item-title><b>Events</b></v-list-item-title>
                <p>Events taking place somewhere in the county or region that are relevant to the homelessness issue.</p>
            </v-list-item>
            <v-list-item>
                <v-list-item-title><b>Help Wanted</b></v-list-item-title>
                <p>A notice requesting volunteers or workers to help with a project, event, or initiative.</p>
            </v-list-item>
        </v-list>
        <v-row>
            <v-col cols="auto">
                If you would like to contribute as described above, 
                <router-link to="/contact">please proceed to register or sign-in</router-link>.
            </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </template>
    
  <script setup>
  //
  </script>