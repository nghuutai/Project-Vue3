<template>
    <div class="input-component">
        <label>{{label}}</label>
        <input type="text" @blur="handleBlur" @input="changeAction" @change="handleChange" :name=[[name]] :placeholder=[[placeholder]] :value=[[value]] />
        <span>{{errorMessage}}</span>
    </div>
</template>

<script>
import {useField} from 'vee-validate';
export default {
    name: 'Input',
    props: ['label', 'placeholder', 'name'],
    setup(props) {
        const {value, handleChange, handleBlur, errorMessage} = useField(props.name);
        return {
            value,
            handleChange,
            handleBlur,
            errorMessage,
        }
    }
}
</script>

<style scoped>
    .input-component {
        display: flex;
        gap: 8px;
        flex-direction: column;
        margin-bottom: 10px;
    }
    span {
        margin-left: 4px;
        color: red;
        font-size: 12px;
    }
</style>