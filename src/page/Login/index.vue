<template>
  <div class="login-wrapper">
    <div class="base">Page Login</div>
    <div class="login-box base">
      <input type="text" name="username" placeholder="Username" v-model="username" />
      <input type="text" name="passworf" placeholder="Password" v-model="password" />
      <div class="signin-signup">
        <button @click="login" class="btn-login">Login</button>
        <span @click="signUp">Sign up?</span>
      </div>
    </div>
  </div>
  <div class="base"><span v-if="error" class="error-login">Login failed</span></div>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {useField, useForm} from 'vee-validate';
import {TOKEN} from '../../common/constant';

export default {
    name: 'Login',
    setup() {
      const {resetForm} = useForm();
      const {value: username} = useField('username');
      const {value: password} = useField('password');
      const store = useStore();
      const router = useRouter();
      const error = computed(() => store.state.auth.error);
      const authenticate = computed(() => store.state.auth.authenticate);

      if (localStorage.getItem(TOKEN)) router.push('/');

      const login = async (e) => {
        e.preventDefault();
        const info = {
          username: username.value,
          password: password.value,
        }
        await store.dispatch('auth/login', info)
        if (authenticate.value) {
          router.push({path: '/'});
        }
        resetForm();
      }

      const signUp = () => {
        router.push({path: '/sign-up'});
      }

      return {
        username,
        password,
        login,
        error,
        signUp
      }
    }
}
</script>

<style scoped>
  .base {
    margin: 10px;
  }
  .login-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 300px;
  }
  .error-login {
    color: red;
    margin: 10px 10px;
  }
  .btn-login {
    margin-right: 10%;
  }
  input {
    width: 100%;
  }
  .signin-signup {
    width: 40%;
  }
  span {
    cursor: pointer;
  }
</style>