<template>
  <div>
    <div>Footer</div>
    <div style="display: inline-block">
      剩余{{ notDone }}/共{{ list.length }}
    </div>
      <button @click="isShow = 1">已完成</button>
      <!-- <router-link to='/finish'>已完成</router-link> -->
      <button @click="isShow = 2">未完成</button>
      <button @click="isShow = 0">全部</button>
    <button @click="clearFin">清除已完成</button>
    <button v-if="chooseNum > 0" @click="clearCho">删除选中</button>
  </div>
</template>

<script>
import { defineComponent, ref,computed,watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ListFooter",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    let store = useStore();
    let notDone = computed(
      //判断未完成事件
      () => {
        let arr = props.list.filter((item) => {
          if (item.status == "not") {
            return true;
          }
        });
        return arr.length;
      }
    );
    // let all = ref();

    // console.log(notFinishArr);
    let clearFin= function () {
      //未完成的事件数组
      let notFinishArr = props.list.filter(item => {
        return item.status === "not";
      });
    //   console.log(notFinishArr);
    //   console.log(props.list);
      store.commit("clearFinish", notFinishArr);
    };
    let clearCho = function () {
        let notChooseArr = props.list.filter(
            item=>{
                return item.choose === false
            }
        )
    //   console.log(notChooseArr);
      store.commit("clearChoose", notChooseArr);
    };
    let chooseNum = computed(() => {
      let arr = props.list.filter((item) => {
        if (item.choose) {
          return true;
        }
      });
      return arr.length;
    });
    // console.log(chooseNum);
    //isShow用于判断显示那种类型事件：0全部、1已完成、2未完成
    let isShow = ref();
    watch(isShow, ()=>{
        //必须深拷贝，取消listnew和pros.list的响应性
        // console.log(props.list);
        // console.log(isShow);
        let listnew = JSON.parse(JSON.stringify(props.list));
        if (isShow.value == 1){
            // console.log(isShow);
            listnew.map(
                item => {
                    if(item.status=="done"){
                        item.show = true;
                    }else{
                        item.show = false;
                    }
                }
            )
        }else if(isShow.value == 2){
            // console.log(isShow);
            listnew.map(
                item=>{
                    if(item.status == 'not'){
                        item.show = true;
                    }else{
                        item.show = false;
                    }
                }
            )
        }else{
            // console.log(isShow);
            listnew.map(item=>{item.show=true})
        }
        // console.log(props.list);
        // console.log(listnew);
        store.commit('showWay',listnew);
    });
    return {
      store,
      notDone,
      // all,
      clearFin,
      isShow,
      chooseNum,
      clearCho,
    };
  },
});
</script>

<style lang="scss" scoped></style>
