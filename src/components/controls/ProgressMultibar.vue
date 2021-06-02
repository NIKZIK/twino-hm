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
          :style="{ width: groupPercents + '%' }"
        />
        <div
          v-if="index < groupId"
          class="h-full bg-green-600 opacity-100 w-ull"
        />
      </div>
    </div>

    <div v-if="showDetails" class="flex text-lg">
      <div class="text-blue-900 flex-1 font-bold">{{ title }}</div>
      <div class="text-gray-400">{{ percents }}% Completed</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["groups", "groupId", "questionId", "title", "showDetails"],
  data() {
    return {};
  },

  computed: {
    percents: function () {
      let all = 0;
      let count = 0;
      let current = this.questionId;
      for (let group of this.groups) {
        if (count < this.groupId) current += group.questions.length;

        all += group.questions.length;
        count++;
      }

      return all ? Math.round(((current + 1) / all) * 100) : 0;
    },

    groupPercents: function () {
      return this.groups[this.groupId]
        ? Math.round(
            ((this.questionId + 1) /
              this.groups[this.groupId].questions.length) *
              100
          )
        : 0;
    },
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