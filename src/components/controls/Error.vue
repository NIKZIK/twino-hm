<template>
  <div
    v-if="error"
    class="border rounded p-2 text-center my-2 border-red-500 bg-red-100"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["error"],
  data() {
    return {};
  },
};
</script>