<template>
  <div class="group-list-container p-8 pb-2 h-full">
    <h1 class="text-4xl text-blue-900 font-bold">Suitability Test</h1>

    <ProgressMultibar
      :groups="groups"
      :groupId="selectedGroup"
      :questionId="selectedQuestion"
      :title="group.title"
      :showDetails="!overview"
    />

    <Overview v-if="overview" :groups="groups" :answersHash="answersHash" />

    <div v-else style="display: contents">
      <GroupQuestion :question="question" :value="answer" @change="setAnswer" />

      <Error :error="error"> Please provide answer </Error>

      <Button v-on:click="nextQuestion"> Next question </Button>
      <LinkButton v-on:click="prevQuestion"> Previous question </LinkButton>
    </div>
  </div>
</template>

<script>
/* import json from "../../server/resp.json"; */
import GroupQuestion from "./GroupQuestion.vue";
import Button from "./controls/Button.vue";
import LinkButton from "./controls/LinkButton.vue";
import ProgressMultibar from "./controls/ProgressMultibar.vue";
import Overview from "./Overview.vue";
import Error from "./controls/Error.vue";

export default {
  props: [],
  components: {
    GroupQuestion,
    Button,
    LinkButton,
    ProgressMultibar,
    Error,
    Overview,
  },
  data() {
    return {
      selectedGroup: 0,
      selectedQuestion: 0,
      groups: [],
      answersHash: {},
      answer: "",
      error: false,
      overview: false,
    };
  },

  computed: {
    group: function () {
      return this.groups[this.selectedGroup] || {};
    },
    question: function () {
      const group = this.groups[this.selectedGroup] || {};
      return (group.questions && group.questions[this.selectedQuestion]) || {};
    },
  },

  methods: {
    setAnswer: function (newValue) {
      this.answer = newValue;
      this.error = false;
    },

    updateAnswers: function () {
      if (this.group.title && this.question.question) {
        const hash = `${this.group.title}_${this.question.question}`;
        this.answersHash[hash] = this.answer;
      }
      this.answer = "";
    },

    /* Looking if already was answered */
    getAnswer: function () {
      const hash = `${this.group.title}_${this.question.question}`;
      if (this.answersHash[hash]) this.answer = this.answersHash[hash];
    },

    nextQuestion: function () {
      if (!this.answer) {
        this.error = true;
        return;
      }

      this.error = false;

      this.updateAnswers();
      /* looking for next question  */
      if (
        this.groups &&
        this.groups[this.selectedGroup] &&
        this.groups[this.selectedGroup].questions.length >
          this.selectedQuestion + 1
      ) {
        this.selectedQuestion = this.selectedQuestion + 1;
      } else if (this.groups && this.groups.length > this.selectedGroup + 1) {
        this.selectedGroup += 1;
        this.selectedQuestion = 0;
      }

      if (
        this.selectedGroup + 1 === this.groups.length &&
        this.group.questions &&
        this.group.questions.length === this.selectedQuestion + 1
      ) {
        this.overview = true;
      }

      this.getAnswer();
    },

    prevQuestion: function () {
      this.error = false;

      if (
        this.groups &&
        this.groups[this.selectedGroup] &&
        this.selectedQuestion > 0
      ) {
        this.selectedQuestion -= 1;
        this.getAnswer();
      } else if (this.groups && this.selectedGroup > 0) {
        this.selectedGroup -= 1;
        this.selectedQuestion = 0;
        this.getAnswer();
      }
    },
  },

  async mounted() {
    try {
      const response = await fetch("http://localhost:3001/suitability", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      this.groups = json.groups;
    } catch (e) {
      console.log("ERROR happened while fetching config", e);
    }
  },
};
</script>

<style>
.group-list-container {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
}
</style>