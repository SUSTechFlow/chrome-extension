<template>
  <v-list dense v-if="!!courses">
    <v-subheader>Courses</v-subheader>
    <v-list-item-group v-model="courses" color="primary">
      <v-list-item v-for="(item, i) in courses" :key="i">
        <v-list-item-content>
          <v-list-item-title>{{ item.KCMC }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <v-btn v-else class="ma-2" :loading="loading" :disabled="loading" color="primary" @click="fetch">Fetch courses</v-btn>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: false,
      courses: null,
    };
  },
  methods: {
    async fetch() {
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
