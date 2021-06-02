
<template>
  <div class="flex flex-col text-xl text-blue-900">
    <div class="text-xl font-bold mb-4">{{ title }}</div>

    <label
      class="choice-container my-1 text-xl"
      v-for="choice of choices"
      :key="choice"
    >
      <input
        class="checkmark"
        type="radio"
        :value="choice"
        v-model="innerValue"
        @change="onChange"
      />
      {{ choice }}
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["title", "choices", "value"],
  data() {
    return { innerValue: "" };
  },

  methods: {
    onChange: function (e) {
      this.$emit("change", e.target.value);
    },
  },

  watch: {
    value: function (newVal) {
      this.innerValue = newVal;
    },
  },
};
</script>

<style>
/* rounded radio button an example from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_radio */
.choice-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.choice-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

.choice-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.choice-container input:checked ~ .checkmark {
  @apply bg-blue-600;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.choice-container input:checked ~ .checkmark:after {
  display: block;
}

.choice-container .checkmark:after {
  top: 5px;
  left: 5px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: white;
}
</style>