<template>
    <div class="title"><b>Create Quiz</b></div>
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
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import * as yup from 'yup';
export default {
    name: 'CreateQuiz',
    components: {Input, MultiInput, Dropdown},
    async setup() {
      const count = ref(['1']);
      const store = useStore();
      const router = useRouter();
      const {handleSubmit} = useForm({
        validationSchema: {
          question: yup.string().required(),
        }
      });
      const subjects = computed(() => store.state.subject.data);

      await store.dispatch('subject/getSubjects');
      
      const handleConfirm = handleSubmit(async (value) => {
        const {subject, question, answer, ...nest} = value;
        const data = {
          subjectId: subject,
          question: question,
          correct_answer: answer,
          incorrect_answer: nest
        }
        await store.dispatch('quiz/addQuiz', data);
        router.push({path: '/quiz'});
      });
      return {
        handleConfirm,
        subject: subjects.value,
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