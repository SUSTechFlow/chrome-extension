<template>
  <v-expansion-panels v-if="!!tmp_courses" :popout="true" :multiple="true">
    <v-expansion-panel v-for="(type, i) in types" :key="i">
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4">{{ type }}</v-col>
          <v-col cols="8" class="text--secondary">
            <v-fade-transition leave-absolute>
              <!-- <span v-if="open">When do you want to travel?</span> -->
              <v-row no-gutters style="width: 100%">
                <v-col cols="6"> Count: {{ filter(type).length }}</v-col>
                <v-col cols="6">Credit: {{ sum(filter(type), 'credit') }}</v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in filter(type)" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.cid }} {{ item.name }} {{ item.credit }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-btn v-else class="ma-2" :loading="loading" :disabled="loading" color="primary" @click="fetch">Fetch Courses</v-btn>
</template>
<script>
import axios from 'axios';
export default {
  props: {
    major: {
      type: String,
      required: false,
      default: '',
    },
    grade: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      tmp_courses: null,
      tmp: [],
      types: ['Common', 'Basic', 'Compulsory', 'Optional', 'Social sciences', 'Arts', 'Humanities', 'Unknown'],
    };
  },
  computed: {
    courses() {
      const res = this.tmp.map(item => ({
        cid: item.cid,
        name: item.detail.name,
        openBy: item.detail.openBy,
        credit: item.detail.credit,
        plans: item.plan.filter(p => p.grade === this.grade && p.gradePlan.major === this.major),
      }));
      return res.map(item => ({
        cid: item.cid,
        name: item.name,
        credit: item.credit,
        type: this.guess(item.openBy, item.plans[0]?.gradePlan.category),
        plan: item.plans.length === 1 ? item.plans[0].gradePlan.category : item.plans.length,
      }));
    },

    commonCredit() {
      return this.creditCountDetail()
        .filter(p => p.plan.length > 0 && p.plan[0].category.includes('通识'))
        .map(c => parseFloat(c.credit))
        .reduce((a, b) => a + b, 0);
    },
    basicCredit() {
      return this.majorCreditCountDetail()
        .filter(p => p.plan.length > 0 && p.plan[0].category.includes('专业基础'))
        .map(c => parseFloat(c.credit))
        .reduce((a, b) => a + b, 0);
    },
    compulsoryCredit() {
      return this.majorCreditCountDetail()
        .filter(p => p.plan.length > 0 && (p.plan[0].category.includes('专业核心') || p.plan[0].category.includes('专业必修')))
        .map(c => parseFloat(c.credit))
        .reduce((a, b) => a + b, 0);
    },
    optionalCredit() {
      return this.majorCreditCountDetail()
        .filter(p => p.plan.length > 0 && p.plan[0].category.includes('专业选修'))
        .map(c => parseFloat(c.credit))
        .reduce((a, b) => a + b, 0);
    },
    ssCredit() {
      return this.learntCourseDetail
        .filter(d => d.openBy === '')
        .map(c => parseFloat(c.credit))
        .reduce((a, b) => a + b, 0);
    },
    artCredit() {
      return this.learntCourseDetail
        .filter(d => d.openBy === '')
        .map(c => parseFloat(c.credit))
        .reduce((a, b) => a + b, 0);
    },
    humCredit() {
      return this.learntCourseDetail
        .filter(d => d.openBy === '')
        .map(c => parseFloat(c.credit))
        .reduce((a, b) => a + b, 0);
    },
    learntCourseDetail() {
      return this.learntCourseDetailPromise;
    },
    totalCredit() {
      return this.learntCourseDetail.map(c => parseFloat(c.credit)).reduce((a, b) => a + b, 0);
    },
  },
  methods: {
    guess(openBy, category) {
      if (openBy) {
        if (openBy === '人文中心') return this.types[6];
        else if (openBy === '艺术中心') return this.types[5];
        else if (openBy === '社科中心') return this.types[4];
      }

      if (category) {
        if (category.includes('通识')) return this.types[0];
        else if (category.includes('专业基础')) return this.types[1];
        else if (category.includes('专业核心') || category.includes('专业必修')) return this.types[2];
        else if (category.includes('专业选修')) return this.types[3];
      }
      return this.types[7];
    },

    async fetch() {
      this.loading = true;
      try {
        const res = await axios.post('http://ehall.sustech.edu.cn/xhxsfw/sys/xsjwxx/educational/getMyScoreInfo.do?json=json&pageSize=233&pageNumber=1');
        this.tmp_courses = res.data.datas.pageAction.rows;

        const cids = this.tmp_courses.map(item => item.KCBH);
        const res1 = await axios.post('https://sustechflow.top/api/plugin_plan', { cids });
        this.tmp = res1.data.data;
      } catch (err) {
        console.log('Error', err);
      } finally {
        this.loading = false;
      }
    },
    filter(type) {
      return this.courses.filter(course => course.type === type);
    },
    sum(array, attribute) {
      return array.map(item => parseFloat(item[attribute])).reduce((a, b) => a + b, 0);
    },
  },
};
</script>
