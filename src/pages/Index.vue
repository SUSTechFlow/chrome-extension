<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6">
        <Select :items="grades" label="Grade" :multiple="false" @change="changeGrade"></Select>
      </v-col>
      <v-col cols="6">
        <Select :items="majors" label="Major" :multiple="false" @change="changeMajor"></Select>
      </v-col>
    </v-row>
    <Courses :grade="grade" :major="major"></Courses>
  </v-container>
</template>
<script>
import axios from 'axios';
import Select from '@/components/Select';
import Courses from '@/components/Courses';
// import axios from 'axios';
export default {
  components: {
    Courses,
    Select,
  },
  data() {
    return {
      majors: [],
      grades: [...Array(9)].map((v, k) => (k + 2011).toString()).reverse(),
      major: '',
      grade: '',
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
    async fetch() {
      try {
        const res = await axios.get('https://sustechflow.top/api/major');
        this.majors = res.data.data;
      } catch (err) {}
    },
    changeMajor(v) {
      this.major = v || '';
    },
    changeGrade(v) {
      this.grade = v || '';
      console.log(this.grade);
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
