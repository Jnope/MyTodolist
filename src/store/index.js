import { createStore } from "vuex";

export default createStore({
  state: {//定义所需要的状态-即变量
    list:[
    // {
    //     title: 1, 
    //     status: "done",
    //     choose: false,
    //     show: true
    // },
    // {
    //     title: 2,
    //     status: 'not',
    //     choose: false,
    //     show: false
    // },
    // {
    //   title: 3, 
    //   status: "done",
    //   choose: true,
    //   show: true
    // },
    // {
    //   title: 4, 
    //   status: "not",
    //   choose: true,
    //   show: true
    // },
    ]
  },
  getters:{//通过getters使组件获取state状态; 也可以使用computed直接获取
    getList: (state) => {
      return state.list
    }
  },
  mutations: {//同步修改state，方法
    initialization(state){
      state.list = JSON.parse(localStorage.getItem('oldList'))
    },
    addThing(state, payload){//添加事件
      //将添加的事件payload即header内的thing放入list列表
      let thing={
        title: payload,
        status: 'not',
        choose: false,
        show: true
      };
      let judge = 0;
      let list = state.list;
      for (let i in list){
        //console.log(i);
        if(list[i].title == payload){
          judge =1;
        }
      };
      if(judge == 0){state.list.push(thing)};
      let listJson = JSON.parse(JSON.stringify(state.list));
      let Json = JSON.stringify(listJson);
      localStorage.setItem("oldList", Json);
    },
    chooseAll(state){
      //将list元素的choose改为true
      for (let i in state.list){
        state.list[i].choose = true
      };
      let listJson = JSON.parse(JSON.stringify(state.list));
      let Json = JSON.stringify(listJson);
      localStorage.setItem("oldList", Json);
    },
    chooseNone(state){
      //将list元素的choose改为true
      for (let i in state.list){
        state.list[i].choose = false
      };
      let listJson = JSON.parse(JSON.stringify(state.list));
      let Json = JSON.stringify(listJson);
      localStorage.setItem("oldList", Json);
    },
    delThing(state, payload){
      //payload为需要删除的事件在list中的下标
      state.list.splice(payload,1);
      let listJson = JSON.parse(JSON.stringify(state.list));
      let Json = JSON.stringify(listJson);
      localStorage.setItem("oldList", Json);
    },
    showWay(state, payload){
      //根据不同选择显示不同的事件，payload为更改show之后的数组
      // console.log(payload);
      state.list = payload;
      let listJson = JSON.parse(JSON.stringify(state.list));
      let Json = JSON.stringify(listJson);
      localStorage.setItem("oldList", Json);
    },
    clearFinish(state, payload){
      //清除已完成，payload为过滤后的未完成的数组
      console.log(payload);
      state.list = payload
    },
    clearChoose(state, payload){
      //清除已完成，payload为过滤后的未选中的数组
      console.log(payload);
      state.list = payload;
      let listJson = JSON.parse(JSON.stringify(state.list));
      let Json = JSON.stringify(listJson);
      localStorage.setItem("oldList", Json);
    }
  },
  actions: {//异步提交mutations

  },
  modules: {//模块化

  },
});
