<template>
    <nav class="nav-bar">
        <router-link class="nav-bar-link" to="/exam-question">Quiz</router-link>
        <router-link class="nav-bar-link" to="/quiz">Test</router-link>
        <p class="btn-logout" @click="handleLogout">Logout</p>
    </nav>
    <Suspense>
    <router-view></router-view>
    </Suspense>
</template>

<script>
import {TOKEN} from '../common/constant';
import {useRouter} from 'vue-router';
export default {
    name: 'NavBar',
    setup() {
      const router = useRouter();
      const handleLogout = () => {
        localStorage.removeItem(TOKEN);
        router.push({path: '/login'});
      }

      return {
        handleLogout,
      }
    }
}
</script>

<style scoped>
    .nav-bar {
    background: gray;
    width: 100%;
    height: 35px;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  .nav-bar-link {
    margin-right: 10px;
    padding: 5px;
    background: green;
    border-radius: 4px;
  }
  .btn-logout {
    justify-self: center;
    align-self: center;
    height: 70%;
    cursor: pointer;
  }
</style>