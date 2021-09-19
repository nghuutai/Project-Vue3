<template>
  <div class="sign-up-wrapper">
    <div class="sign-up-box">
      <div>Sign Up Page</div>
      <input name="username" type="text" placeholder="Username" v-model="username" autocomplete="off" />
      <span class="error-message">{{usernameError}}</span>
      <input name="password" type="text" placeholder="Password" v-model="password" />
      <span class="error-message">{{passwordError}}</span>
      <select name="role" v-model="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <span class="error-message">{{roleError}}</span>
      <button @click="register">Register</button>
      <span class="sign-in-return" @click="signIn">Already have an account? Sign in ->>></span>
      <span class="success-message">{{noti}}</span>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router';
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import {createUser} from '../../service/index';

export default {
    name: 'SignUp',
    setup() {
      let noti = ref('');
      const schema = yup.object({
        username: yup.string().required().email(),
        password: yup.string().required().min(6),
        role: yup.string().required(),
      })
      const router = useRouter();
      const {handleSubmit, resetForm} = useForm({
        username: '',
        password: '',
        role: '',
        validationSchema: schema,
      })
      const {value: username, errorMessage: usernameError} = useField('username', '', {validateOnValueUpdate: false});
      const {value: password, errorMessage: passwordError} = useField('password', '', {validateOnValueUpdate: false});
      const {value: role, errorMessage: roleError} = useField('role')
      const signIn = () => {
        router.push({path: '/login'});
      }
      const register = handleSubmit(async (value) => {
        const user = await createUser(value);
        if (user.data.title === 'Success') {
          noti.value = `Create account ${user.data.data.username} successfull`;
        }
        resetForm()
      })

      return {
        signIn,
        register,
        username,
        password,
        role,
        usernameError,
        passwordError,
        roleError,
        noti
      }
    }
}
</script>

<style scoped>
  .sign-up-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sign-up-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    gap: 10px;
  }
  input {
    width: 100%;
  }
  select {
    width: 100%;
  }
  .sign-in-return {
    cursor: pointer;
  }
  .error-message {
    color: red;
    align-self: start;
    font-size: 12px;
  }
  .success-message {
    color: chartreuse;
    align-self: start;
    font-size: 15px;
  }
</style>