<template>
  <div>
    <table>
      <tr>
        <th v-for="column in columns" :key="column">
          {{column}}
        </th>
        <th>
            Action
        </th>
      </tr>
      <tr v-for="item in data" :key="item.id">
        <td v-for="key in Object.keys(item)" :key="key">
          {{item[key]}}
        </td>
        <td>
            <span @click="handleEdit(item.id)">Edit</span> / <span class="btn-delete" @click="handleDelete(item.id)">Delete</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {
    name: 'Table',
    props: ['columns', 'data'],
    setup() {
      const router = useRouter();
      const store = useStore();

      const handleEdit = (id) => {
        router.push({path: `/quiz/${id}`})
      }
      const handleDelete = async (id) => {
        await store.dispatch('quiz/deleteQuiz', id);
        await store.dispatch('quiz/getAllQuiz', {page: 1, limit: 10});
      }

      return {
        handleEdit,
        handleDelete,
      }
    }
}
</script>

<style>
    table, th, td {
        /* border: 1px solid black; */
        border-collapse: collapse;
        border-bottom: 0.2px solid #ddd;
        padding: 8px;
    }
    table {
        width: 100%;
    }
    table td {
        text-align: center;
    }
    tr:hover {
        background-color: #ddd;
    }
    span {
      cursor: pointer;
    }
    .btn-delete {
      color: red;
    }
</style>