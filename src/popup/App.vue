<template>
  <v-app>
    <v-app-bar app color="white" height="45px">
      <v-toolbar-title class="ml-0 pl-1 mr-1">
        <router-link :to="{ name: 'home' }" class="google-font" style="text-decoration:none; color: rgba(0,0,0,.87);">
          SUSTech Flow
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn to="/" class="ml-0 google-font" style="text-transform: capitalize;" text>
        Courses
      </v-btn>
      <v-btn to="/comment" class="ml-0 google-font" style="text-transform: capitalize;" text>
        Comments
      </v-btn>
      <v-btn text icon small color="black" @click="navigateToGithub">
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  methods: {
    navigateToGithub() {
      chrome.tabs.create({ url: 'https://github.com/SUSTechFlow/chrome-extension' });
    },
  },
};
</script>
