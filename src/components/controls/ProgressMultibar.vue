<template>
  <div>
    <div class="multibar-container my-4">
      <div
        v-for="(group, index) of groups"
        :class="{ selected: index === groupId }"
        :key="group.title"
        class="h-2 bg-gray-200"
      >
        <div
          v-if="index === groupId"
          class="h-full bg-green-600 opacity-100"
          :style="{ width: groupProgress + '%' }"
        />
        <div
          v-if="index < groupId"
          class="h-full bg-green-600 opacity-100 w-ull"
        />
      </div>
    </div>

    <div v-if="showDetails" class="flex text-lg">
      <div class="text-blue-900 flex-1 font-bold">{{ title }}</div>
      <div class="text-gray-400">{{ progress }}% Completed</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "groups",
    "groupId",
    "questionId",
    "title",
    "showDetails",
    "progress",
    "groupProgress",
  ],
  data() {
    return {};
  },
};
</script>

<style scoped>
.multibar-container {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
}
.multibar-container .selected {
  @apply bg-green-100;
}
</style>