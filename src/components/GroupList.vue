<template>
  <div class="group-list-container p-8 pb-2 h-full">
    <h1 class="text-4xl text-blue-900 font-bold">Suitability Test</h1>

    <ProgressMultibar
      :groups="groups"
      :groupId="question.groupId || 0"
      :groupProgress="groupProgress"
      :progress="progress"
      :title="question.group"
      :showDetails="!overview"
    />

    <Overview v-if="overview" :groupAnswers="groupAnswers" />

    <div v-else style="display: contents">
      <GroupQuestion
        :title="question.title || ''"
        :answers="question.answers || []"
        :value="answer"
        @change="setAnswer"
      />

      <Error :error="error"> Please provide answer </Error>

      <Button v-on:click="nextQuestion"> Next question </Button>
      <LinkButton v-on:click="prevQuestion"> Previous question </LinkButton>
    </div>
  </div>
</template>

<script>
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
      groups: [],
      groupAnswers: [],
      answer: "",
      questions: [],
      questionIdx: 0,
      error: false,
      overview: false,
    };
  },

  computed: {
    question: function () {
      return this.questions[this.questionIdx] || {};
    },

    progress: function () {
      const size = this.questions.length;
      const answered = this.questions.filter((a) => a.answer).length;

      return size ? Math.round((answered * 100) / size) : 0;
    },

    groupProgress: function () {
      if (
        this.question.groupId !== undefined &&
        this.groups[this.question.groupId]
      ) {
        const answered = this.questions.filter(
          (a) => a.groupId === this.question.groupId && a.answer
        ).length;
        const total = this.groups[this.question.groupId].questions.length;

        return Math.round((answered * 100) / total);
      }

      return 0;
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

    nextQuestion: function () {
      if (!this.answer) {
        this.error = true;
        return;
      }

      this.question["answer"] = this.answer;
      this.answer = "";

      if (this.questions.length > this.questionIdx + 1) {
        this.questionIdx += 1;
      } else {
        this.groupAnswers = this.prepareAnswers();
        this.overview = true;
      }

      if (this.question.answer) this.answer = this.question["answer"];
    },

    prepareAnswers: function () {
      const arr = [];
      for (let group of this.groups) {
        let questions = this.questions.filter((a) => a.group === group.title);

        arr.push({
          title: group.title,
          questions,
        });
      }
      return arr;
    },

    prevQuestion: function () {
      this.error = false;
      if (this.questionIdx > 0) {
        this.questionIdx -= 1;
      }
      if (this.question.answer) this.answer = this.question["answer"];
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
      const questions = [];
      let groupId = 0;

      for (let group of json.groups) {
        for (let question of group.questions) {
          questions.push({
            groupId,
            group: group.title,
            question: question.question,
            answers: question.answers,
            answer: "",
          });
        }
        groupId++;
      }
      this.questions = questions;
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