<template>
    <div>
        <!-- enter键或提交按钮实现事件添加 -->
        <input  v-model="thing" placeholder="输入事件" @keydown.enter="toFather"/>
        <button @click="toFather">添加</button>
    </div>
</template>

<script>
import { defineComponent,ref } from 'vue';

export default defineComponent({
    name: 'ListHeader',
    setup(props, ctx) {
        let thing = ref('');
        // let addThing = function(){

        // };
        // let chooseAll = () => {};

        //将事件值传给父组件
        let toFather = () => {ctx.emit('newThing', thing.value);};

        return {
            thing,
            // addThing,
            // chooseAll,
            toFather
        }
    },
})
</script>

<style lang="scss" scoped>

</style>