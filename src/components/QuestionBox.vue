<template>
  <div class="question-box-container">
    <b-jumbotron>
      <template v-slot:lead>
        Some question here?
      </template>

      <hr class="my-4" />
      {{ currentQuestion.question }}
      <b-list-group>
        <b-list-group-item
          v-for="(answer, index) in answers"
          :key="index"
          @click="selectAnswer(index)"
          :class="answerClass(index)"
        >
          {{ answer }}
        </b-list-group-item>
      </b-list-group>

      <b-button
        variant="primary"
        @click="submitAnswer"
        :disabled="selectIndex === null || answersed"
        >Submit</b-button
      >
      <b-button @click="next" variant="success">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function,
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectIndex = null;
        this.answersed = false;
        this.shuffleAnswers();
      },
    },
  },
  methods: {
    selectAnswer(index) {
      this.selectIndex = index;
      //   console.log(index);
    },
    shuffleAnswers() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ];
      this.shuffledAnswers = _.shuffle(answers);
      this.correctIndex = this.shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );
    },
    submitAnswer() {
      let isCorrect = false;
      if (this.selectIndex === this.correctIndex) {
        isCorrect = true;
      }
      this.answersed = true;
      this.increment(isCorrect);
    },
    answerClass(index) {
      let answerClass = '';
      if (!this.answersed && this.selectIndex === index) {
        answerClass = 'selected';
      } else if (this.answersed && this.correctIndex === index) {
        answerClass = 'correct';
      } else if (
        this.answersed &&
        this.selectIndex === index &&
        this.correctIndex !== index
      ) {
        answerClass = 'incorrect';
      }
      return answerClass;
    },
  },
  mounted() {
    this.shuffleAnswers();
  },
  data() {
    return {
      selectIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answersed: false,
    };
  },
  computed: {
    answers() {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      return answers;
    },
  },
};
</script>

<style scoped>
.list-group {
  margin-bottom: 15px;
}
.list-group-item:hover {
  background: #eee;
  cursor: pointer;
}
.btn {
  margin: 0px 5px;
}
.selected {
  background-color: lightblue;
}
.correct {
  background-color: lightgreen;
}
.incorrect {
  background-color: red;
}
</style>
