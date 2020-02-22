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
      <v-container>
        <v-list dense>
          <v-subheader>Courses</v-subheader>
          <v-list-item-group v-model="courses" color="primary">
            <v-list-item v-for="(item, i) in courses" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.KCMC }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-btn class="ma-2" :loading="loading" :disabled="loading" color="primary" @click="test">
          Accept Terms
        </v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: false,
      courses: [],
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
    async test() {
      this.loading = true;
      try {
        const res = await axios.post('http://ehall.sustech.edu.cn/xhxsfw/sys/xsjwxx/educational/getMyScoreInfo.do?json=json&pageSize=233&pageNumber=1');
        console.log(res);
        this.courses = res.data.datas.pageAction.rows;
      } catch (err) {
        console.log('Error', err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
