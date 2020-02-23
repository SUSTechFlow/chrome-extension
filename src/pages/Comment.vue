<template>
  <v-container class="pa-2">
    <v-row align="center" justify="center" fill-height>
      <v-col xs="12" sm="7" md="8" lg="8" xl="8" class="">
        <p class="google-font mb-1" style="font-weight: 350;color: #616161;font-size:200%">
          <b>Go to <a @click="navigateToSF" style="color: #1a73e8;">SUSTech Flow</a> for comments.</b>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  methods: {
    navigateToSF() {
      chrome.tabs.create({ url: 'https://sustechflow.top' });
    },
  },
};
</script>
