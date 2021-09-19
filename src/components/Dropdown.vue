<template>
  <div class="select-component">
    <label>{{label}}</label>
    <select :name=[[name]] :placeholder=[[placeholder]] :value=value @change="handleChange" @blur="handleBlur">
        <option v-for="item in data" :key=item.id :value=item.id>{{item.name}}</option>
    </select>
  </div>
</template>

<script>
import {useField} from 'vee-validate';
export default {
    name: 'Dropdown',
    props: ['name', 'placeholder', 'subject', 'label'],
    setup(props) {
        const {value, handleChange, handleBlur, errorMessage} = useField(props.name);
        return {
            handleChange,
            handleBlur,
            errorMessage,
            data: props.subject,
            value
        }
    }
}
</script>

<style scoped>
    .select-component {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 10px;
    }
</style>