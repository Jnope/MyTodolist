<template>
  <div>
    <div>Todolist</div>
    <!-- 接收 -->
    <!-- 设置localStroage -->
    <div style='display: inline-block'>Header</div>
    <button @click="unset">重置localStorage</button><br/>
    <!-- <button @click="localSave">保存项目</button><br/> -->
    <list-header @newThing="newThing"></list-header>
    <!-- 将list传递给main -->
    <list-main :list="list"></list-main>
    <list-footer :list="list"></list-footer>
    <!-- <div>{{list}}</div> -->
    <router-link to="/about">转至介绍</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
//引入子组件
import ListHeader from "@/components/ListHeader.vue";
import ListMain from "@/components/ListMain.vue";
import ListFooter from "@/components/ListFooter.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
// import { onBeforeUnmount, onBeforeUpdate } from "vue";

export default defineComponent({
  name: "Todolist",
  //引入自定义子组件
  components: {
    ListHeader,
    ListMain,
    ListFooter,
  },
  setup() {
    let store = useStore();
    store.commit('initialization');
    //console.log(store);
    //获取事件列表-vuex的state内
    // let list = store.getters.getList;
    //getter在store.commit()改变list后不更新
    let list = computed(() => {
      return store.state.list;
    });
    // console.log(list);
    let newThing = function (item) {
      //获取header提交的事件并提交至vuex
      store.commit("addThing", item);
    };
    // onBeforeUnmount(() => {
    //   // console.log("启用");
    //   let listJson = JSON.parse(JSON.stringify(list.value));
    //   let Json = JSON.stringify(listJson);
    //   localStorage.setItem("oldList", Json);
    // });
    // onBeforeUpdate(() => {
    //   //在切换显示类型时触发
    //   let listJson = JSON.parse(JSON.stringify(list.value));
    //   let Json = JSON.stringify(listJson);
    //   localStorage.setItem("oldList", Json);
    //   // console.log(JSON.parse(localStorage.getItem('oldList')));
    // });
    let unset = () => {
      let begin = [
        {
          title: 1,
          status: "done",
          choose: false,
          show: true,
        },
        {
          title: 2,
          status: "not",
          choose: false,
          show: false,
        },
        {
          title: 3,
          status: "done",
          choose: true,
          show: true,
        },
        {
          title: 4,
          status: "not",
          choose: true,
          show: true,
        },
      ];
      localStorage.setItem("oldList", JSON.stringify(begin));
      store.commit('initialization');
    };
    // console.log(JSON.parse(localStorage.getItem('oldList')));
    return {
      store,
      list,
      newThing,
      unset,
    };
  },
});
</script>

<style lang="scss" scoped></style>
