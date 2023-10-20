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
    <v-main>
        <router-view />
    </v-main>
    <v-footer height="60" app>
      <v-row class="bg-teal-lighten-1 align-center justify-space-around">
        <v-col cols="auto">
          Get Help
        </v-col>

        <v-col cols="auto" align-center>
          <v-row>
            <v-img width="60" height="60" src="@/assets/images/PATHlogo.svg"  class="pa-0;"/>
            <router-link to="/about" class="pt-4 pl-1">About PATH</router-link>
          </v-row>
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
