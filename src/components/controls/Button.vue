<template>
  <button
    @click="$emit('click')"
    class="p-4 text-white bg-blue-600 rounded font-bold text-lg"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
};
</script>