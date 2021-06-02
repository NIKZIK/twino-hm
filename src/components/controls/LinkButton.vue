<template>
  <div
    class="p-4 text-blue-600 bg-white underline text-lg text-center"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
};
</script>