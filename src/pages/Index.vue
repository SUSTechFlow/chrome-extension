<template>
  <v-container>
    <Courses></Courses>
  </v-container>
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
