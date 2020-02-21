<template>
  <div>
    <p>Hello world!!!</p>
    <button @click="click">QwQ</button>
    <button @click="test">QwwQ</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
    async test() {
      const res = await fetch('http://ehall.sustech.edu.cn/xhxsfw/sys/xsjwxx/educational/getMyScoreInfo.do?json=json&pageSize=233&pageNumber=1', {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
      });
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
