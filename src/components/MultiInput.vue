<template>
    <div class="multi-input-wrapper">
        <span>{{label}}</span>
        <div class="input-btn-wrapper">
            <div class="input-answer">
                <Input v-for="item in quantity" :key="item" :name="item"/>
            </div>
            <button class="btn-increase" @click="handleIncrease">+</button>
        </div>
    </div>
</template>

<script>
import Input from './Input.vue';
import {toRefs} from 'vue';
export default {
    name: 'MultiInput',
    props: ['label', 'count'],
    components: {Input},
    setup(props) {
        const {count: quantity} = toRefs(props);
        const handleIncrease = () => {
            const value = quantity.value.length + 1;
            quantity.value.push(value.toString());
        }
        return  {
            handleIncrease,
            quantity,
        }
    }
}
</script>

<style>
    .input-answer {
        display: flex;
        gap: 10px;
        flex-direction: column;
        width: 30%;
    }
    .multi-input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .btn-increase {
        align-self: start;
        margin: 8px 0px;
    }
    .input-btn-wrapper {
        display: flex;
        gap: 8px;
    }
</style>