<template>
  <div class="mt-8">
    <Choices
      :title="question.question"
      :choices="question.answers"
      :value="value"
      @change="onChange"
    />
  </div>
</template>

<script>
import Choices from "./controls/Choices.vue";

export default {
  props: ["title", "question", "value"],
  components: {
    Choices,
  },
  data() {
    return {};
  },
  methods: {
    onChange: function (value) {
      this.$emit("change", value);
    },
  },
};
</script>