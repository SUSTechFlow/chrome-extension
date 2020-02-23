<template>
  <v-app>
    <v-app-bar app color="white" height="45px">
      <v-toolbar-title class="ml-0 pl-1 mr-1">
        <router-link :to="{ name: 'home' }" class="google-font" style="text-decoration:none; color: rgba(0,0,0,.87);">
          SUSTech Flow
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="navigateToGithub" class="ml-0 google-font" style="text-transform: capitalize;" text>
        Github
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container> <Courses></Courses></v-container>
    </v-content>
  </v-app>
</template>
<script>
import Courses from '@/components/Courses';
export default {
  components: {
    Courses,
  },
  data() {
    return {
      courses: null,
    };
  },
  created() {},
  methods: {
    click() {
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, { method: 'getText' }, function(response) {
          if (response.method === 'getText') {
            console.log(response.data);
          }
        });
      });
    },
    navigateToGithub() {
      chrome.tabs.create({ url: 'https://github.com/SUSTechFlow/chrome-extension' });
    },
  },
};
</script>
