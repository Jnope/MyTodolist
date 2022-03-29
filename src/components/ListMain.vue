<template>
  <div v-if="list.length > 0">
    <div style="display: inline-block">Main</div>
    <button @click="All">选择所有</button>
    <button @click="None">取消选择</button>
    <ul v-for="(item, index) in list" :key="index" type="none">
      <li v-show="item.show">
        <!-- 根据复选框决定事件是否被选中 -->
        <input type="checkbox" v-model="item.choose" />
        {{ item.title }}
        <select v-model="item.status" @change="fresh">
          <!-- 根据下拉列表决定事件完成状态 -->
          <option value="not">未完成</option>
          <option value="done">已完成</option>
        </select>
        <!-- 点击删除 -->
        <button @click="del(index)">删除</button>
      </li>
    </ul>
  </div>
  <div v-else>暂无任务</div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ListMain",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    let store = useStore();
    let All = () => {
      store.commit("chooseAll");
    };
    let None = () => {
      store.commit("chooseNone");
    };
    let del = function (index) {
      // console.log(index);
      store.commit("delThing", index);
    };
    let fresh = () => {
    //   console.log("1");
      let listJson = JSON.parse(JSON.stringify(props.list));
      let Json = JSON.stringify(listJson);
      localStorage.setItem("oldList", Json);
    };
    // let showway = () => {};
    return {
      store,
      // list,
      All,
      None,
      del,
      fresh,
      // showway
    };
  },
});
</script>

<style lang="scss" scoped></style>
