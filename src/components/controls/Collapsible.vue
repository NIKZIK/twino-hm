<template>
  <div class="border-b py-4">
    <div class="flex">
      <div class="flex-1">{{ title }}</div>
      <div @click="toggle" class="font-bold text-blue-600">
        {{ openInner ? "Show Less" : "Show More" }}
      </div>
    </div>

    <div v-if="openInner" class="mt-4"><slot> </slot></div>
  </div>
</template>

<script>
export default {
  props: ["title", "open"],
  data() {
    return {
      openInner: this.open,
    };
  },
  methods: {
    toggle: function () {
      this.openInner = !this.openInner;
    },
  },
};
</script>