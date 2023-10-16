<template>
  <v-app>
    <v-app-bar color="primary" flat>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        Partners Assisting the Homeless in Josephine County
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
          <v-list-item>
              <router-link to="/about">About PATH</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/contact">Contact Us</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/homeless">Homelessness in JoCo</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/news">News and Events</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/services">Services</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/success">Success Stories</router-link>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center">
      <v-container class="fill-height">
        <v-responsive class="align-center text-center fill-height">
        
          <v-row class="d-flex align-center justify-center fill-height">
            <v-col cols="auto">
              <router-view />
            </v-col>
          </v-row>

        </v-responsive>
      </v-container>
    </v-main>
    <v-footer height="60">
      <v-row class="bg-teal-lighten-1 align-center justify-center">
        <v-col cols="auto">
          Get Help
        </v-col>

        <v-col cols="auto">
          <v-img width="65" height="65" src="@/assets/images/PATHlogo.svg" />
        </v-col>

        <v-col cols="auto">
          Volunteer
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'
  const drawer = ref(false)
</script>
