<template>
    <div class="title"><b>Edit Quiz</b></div>
    <Dropdown class="select" name="subject" placeholder="Select a subject" :subject=subject label="Subject" />
    <Input class="input" label="Question" placeholder="Question" name="question" />
    <Input class="input" label="Answer" placeholder="Answer" name="answer" />
    <MultiInput label="Incorrect answer" :count="count" />
    <button @click="handleConfirm">Confirm</button>
</template>

<script>
import Input from '../../components/Input.vue';
import MultiInput from '../../components/MultiInput.vue';
import Dropdown from '../../components/Dropdown.vue';
import {useForm} from 'vee-validate';
import {useStore} from 'vuex';
import {computed, ref, onUnmounted} from 'vue';
import {useRouter} from 'vue-router';
import * as yup from 'yup';
export default {
    name: 'EditQuiz',
    components: {Input, MultiInput, Dropdown},
    async setup() {
      const store = useStore();
      const router = useRouter();
      const {id: quizId} = router.currentRoute.value.params;
      const subjects = computed(() => store.state.subject.data);
      const quiz = computed(() => store.state.quiz.dataItem);

      const {handleSubmit, setValues} = useForm({
        validationSchema: {
          question: yup.string().required(),
        },
      });
      onUnmounted(() => {
        store.dispatch('quiz/resetQuiz');
      });
      await Promise.all([store.dispatch('subject/getSubjects'), store.dispatch('quiz/getQuiz', quizId)]);
      const count = ref(Object.keys(quiz.value.incorrect_answer));
      setValues({
        subject: quiz.value.subjectId,
        question: quiz.value.question,
        answer: quiz.value.correct_answer,
        ...(quiz.value.incorrect_answer),
      })
          
      const handleConfirm = handleSubmit(async (value) => {
        const {subject, question, answer, ...nest} = value;
        const data = {
          subjectId: subject,
          question: question,
          correct_answer: answer,
          incorrect_answer: nest
        }
        await store.dispatch('quiz/updateQuiz', {id: quizId, data});
        router.push({path: '/quiz'});
      });
      return {
        handleConfirm,
        subject: subjects,
        count,
      }
    }
}
</script>

<style>
  .title {
    margin: 10px 0px;
  }
  .input {
    width: 30%;
  }
  .select {
    width: 30%;
  }
</style>