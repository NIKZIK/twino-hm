<template>
  <div class="border-b py-4">
    <div class="flex">
      <div class="flex-1">{{ title }}</div>
      <div @click="toggle" class="font-bold text-blue-600">
        {{ open ? "Show Less" : "Show More" }}
      </div>
    </div>

    <div v-if="open" class="mt-4"><slot> </slot></div>
  </div>
</template>

<script>
export default {
  props: ["title", "open"],
  data() {
    return {
      openInner: open,
    };
  },
  methods: {
    toggle: function () {
      this.open = !this.open;
    },
  },
};
</script>