<template>
  <v-subheader>Courses</v-subheader>
  <v-list-item-group v-model="courses" color="primary">
    <v-list-item v-for="(item, i) in courses" :key="i">
      <v-list-item-content>
        <v-list-item-title>{{ item.cid }} {{ item.plan }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</template>
