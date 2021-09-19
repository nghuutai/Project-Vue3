<template>
  <div>
    <div>
        <input type="radio" :value="value" v-model="radioValue" :name="name" @change="handleChange" @blur="handleBlur" />
        <label>{{label}}</label>
      </div>
  </div>
</template>

<script>
import {useField} from 'vee-validate';
export default {
    name: 'RadioButton',
    props: ['value', 'name', 'label'],
    setup(props) {
      const {value: radioValue, handleChange, handleBlur} = useField(props.name);

      return {
        handleChange,
        handleBlur,
        radioValue
      }
    }
}
</script>

<style>

</style>