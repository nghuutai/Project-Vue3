<template>
  <div class="quiz-wrapper">
    Welcome to the quiz
    <div class="subject-component" v-if="questions.length <= 0">
      <Dropdown label="Choose a subject" name="subject" :subject="subjects" />
      <button class="btn-start" @click="handleStart">Start</button>
    </div>
    <div v-if="questions.length > 0" class="question-component">
      <label>Question {{indexQuiz + 1}}: {{question.question}}</label>
      <RadioButton name="answer" v-for="(item, index) in question.answers" :key="index" :value="item" :label="item" />
      <div class="group-btn">
        <button @click="handlePre" v-show="indexQuiz > 0">Pre</button>
        <button @click="handleNext" v-show="indexQuiz + 1 < questions.length">Next</button>
        <button @click="handleExecute">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../../components/Dropdown.vue';
import RadioButton from '../../components/RadioButton.vue';
import {computed} from 'vue';
import {useForm} from 'vee-validate';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
export default {
  name: 'Quiz',
  components: {Dropdown, RadioButton},
  async setup() {
    const {handleSubmit, handleReset} = useForm();
    const store = useStore();
    const router = useRouter();
    const subjects = computed(() => store.state.subject.data);
    const questions = computed(() => store.state.quiz.data);
    const question = computed(() => store.getters['quiz/getQuiz'])
    const indexQuiz = computed(() => store.state.quiz.indexQuiz);
    const answers = computed(() => store.state.quiz.answers);
    await store.dispatch('subject/getSubjects');
    const handleStart = handleSubmit(async (value) => {
      console.log(value);
      store.dispatch('quiz/getAllQuiz', {subjectId: value.subject});
    });

    const handleNext = handleSubmit((value) => {
      console.log(value);
      store.dispatch('quiz/nextQuestion', {id: question.value.id, answer: value.answer});
      handleReset()
    })

    const handlePre = handleSubmit((value) => {
      console.log(value);
      store.dispatch('quiz/preQuestion', {id: question.value.id, answer: value.answer});
      handleReset()
    })

    const handleExecute = handleSubmit(async (value) => {
      await store.dispatch('quiz/preQuestion', {id: question.value.id, answer: value.answer});
      const result = questions.value.filter(question => answers.value.find(answer => answer.id === question.id && answer.answer === question.correct_answer));
      handleReset();
      alert(`successgful ${result.length}/${questions.value.length}`);
      store.dispatch('quiz/resetQuiz');
      router.push({path: '/exam-completed'})
    });
    console.log(answers);
    return {
      questions,
      handleStart,
      handleNext,
      handlePre,
      handleExecute,
      subjects,
      question,
      indexQuiz,
    }
  }
}
</script>

<style scoped>
  .quiz-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
  }
  .subject-component {
    display: flex;
    gap: 10px;
  }
  .btn-start {
    height: 60%;
    align-self: center;
    margin-top: 13px;
  }
  .question-component {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: flex-start
  }
  .group-btn {
    display: flex;
    gap: 8px;
    justify-content: start;
  }
</style>