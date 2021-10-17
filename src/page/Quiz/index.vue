<template>
  <p class="title">Quiz Management</p>
  <div class="search-component">
    <button @click="handleCreate">Create</button>
    <Input placeholder="Search" name="search" />
  </div>
  <div>
    <Table :data="quizs" :columns="columns" />
  </div>
</template>

<script>
import {ref, computed, onUnmounted} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import Input from '../../components/Input.vue';
import Table from '../../components/Table.vue';

export default {
  name: 'Quiz',
  components: {Input, Table},
  async setup() {
    const router = useRouter();
    const store = useStore();
    onUnmounted(() => {
      store.dispatch('quiz/resetQuiz');
    });
    await store.dispatch('quiz/getAllQuiz', {page: 1, limit: 10});

    const quizs = computed(() => store.getters['quiz/getAll1Quiz']);
    const columns = ref(['Id', 'Question', 'Subject']);

    const handleCreate = () => {
      router.push({path: '/create-quiz'});
    }
    return {
        quizs,
        columns,
        handleCreate,
    }
  }
}
</script>

<style csoped>
  .title {
    text-align: center;
  }
  .search-component {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  table, th, td {
    /* border: 1px solid black; */
    border-collapse: collapse;
    border-bottom: 0.2px solid #ddd;
    padding: 8px;
  }
  table {
      /* border-collapse: collapse; */
    width: 100%;
  }
  table td {
    text-align: center;
  }
  tr:hover {
    background-color: #ddd;
  }
</style>