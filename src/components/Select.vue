<template lang="pug">
v-select.mx-1(
  v-model="selected"
  :multiple="multiple"
  :label="label"
  :requried="true"
  :items="items"
  :loading="items.length === 0"
)
  template(
    slot="selection"
    slot-scope="{ item, index }"
  )
    div(
      v-if="isSelectAll"
    )
      span(
        v-if="index === 0"
      ) All
    div(
      v-else
    )
      span(
        v-if="index === 0"
      ) {{ item }}
      span(
        v-if="index === 1"
        class="grey--text caption"
      ) (+{{ selected.length - 1 }} others)
  template(
    v-if="multiple===true"
  )
    v-list-item(
      slot="prepend-item"
      ripple
      @click="selectAll"
    )
      v-list-item-action
        v-icon(
          :color="selected.length > 0 ? 'indigo darken-4' : ''"
        ) {{ icon }}
      v-list-item-title Select All
    v-divider(
      slot="prepend-item"
      class="mt-2"
    )
</template>
<script>
import { mdiCheckboxBlankOutline, mdiCheckboxMarkedOutline } from '@mdi/js';
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    init: {
      type: Array,
      required: false,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { selected: this.multiple ? [] : '' };
  },
  computed: {
    isSelectAll() {
      return this.selected.length === this.items.length;
    },
    isSelectSome() {
      return this.selected.length > 0 && !this.isSelectAll;
    },
    icon() {
      if (this.isSelectAll) return mdiCheckboxBlankOutline;
      if (this.isSelectSome) return mdiCheckboxMarkedOutline;
      return 'mdi-check_box_outline_blank';
    },
  },
  watch: {
    selected() {
      if (this.multiple) this.$emit('change', this.selected);
      else if (this.selected.length === 0) this.$emit('change', null);
      else this.$emit('change', this.selected);
    },
  },
  created() {
    this.selected = this.init;
  },
  methods: {
    selectAll() {
      if (this.isSelectAll) {
        this.selected = [];
      } else {
        this.selected = this.items.slice();
      }
    },
  },
};
</script>
