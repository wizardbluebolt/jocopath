<template>
  <v-app>
    <v-app-bar color="primary" flat>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        PATH: Partners Assisting the Homeless in Josephine County   
      </v-app-bar-title>
    </v-app-bar>  
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
          <v-list-item>
              <router-link to="/about">About PATH</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/homeless">Homelessness in JoCo</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/volunteer">Volunteer</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/news">How to Help/News/Events</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/services">Community Resource List</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/meals">St Vincent de Paul Meal Schedule</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/success">Success Stories</router-link>
          </v-list-item>
          <v-divider :thickness="3"></v-divider>
          <v-list-item>
              <router-link to="/contribute">Contribute Content</router-link>
          </v-list-item>
          <v-list-item v-if="isReviewer">
              <router-link to="/review">Review</router-link>
          </v-list-item>
          <v-list-item v-if="userStore.currUser != ''">
            <v-btn 
              variant="plain"
              density="compact"
              text="Sign Out"
              class="pl-0"
              @click="auth.signOut"></v-btn>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
        <router-view />
    </v-main>
    <v-footer height="60" app>
      <v-row class="bg-teal-lighten-1 align-center ">
        <v-col cols="2">
          <a href="" style="color: white;">Phone: (541) 450-9535</a>
        </v-col>
        <v-col cols="3">
          <a href="mailto:pathofjoco@gmail.com" style="color: white;">E-Mail: pathofjoco@gmail.com</a>
        </v-col>
        <v-col cols="1" align-center class="pt-4 pl-0 pr-0 pb-0">
          <v-row>
          </v-row>
        </v-col>
        <v-col cols="2" class="text-right">
            <router-link to="/about" class="pt-4 pl-1" style="color: white;">About PATH</router-link>        
        </v-col>
        <v-col cols="2" class="text-right">
            <router-link to="/contribute" class="pt-4 pl-1" style="color: white;">Contribute Content</router-link>        
        </v-col>
        <v-col cols="2" class="text-right">
          <a href="https://www.facebook.com/pathjoco" style="color: white;">Facebook Page</a>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useUserStore } from "@/stores/user";
  import { useAuthenticator } from "@aws-amplify/ui-vue";

  const userStore = useUserStore();
  const drawer = ref(false);

  const auth = useAuthenticator();

  const isReviewer = computed(() => userStore.getIsReviewer);

</script>
