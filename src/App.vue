<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <login @switchingPage="switchingPage" v-if="loginOrNot"></login>
    <forum @switchingPage="switchingPage" v-bind:account="items.userAcconut" v-if="!loginOrNot"></forum>
  </div>
</template>

<script>
//import Store from '../static/js/store.js'
import login from './components/Login'
import forum from './components/Forum'
export default {
  name: 'App',
  data(){
    return{
      //userInfo:Store.fetch(),
      //Switching:'login',
      loginOrNot:true,
      userAcconut:'',
      items:[
        {userAcconut:'',loginOrNot:true}
      ]
    }
  },
  components:{
    login,
    forum
  },
  watch:{
    // userInfo:{
    //   handler:function(userInfo){
    //     //console.log(val,oldVal)
    //     Store.save(userInfo)
    //   },
    //   deep:true
    // }
    // Switching:{
    //   handler:function(switching){
    //     console.log(switching)
    //     // if(showName){
    //     //   this.regOrSub="提交"
    //     // }else{
    //     //   this.regOrSub="注册"
    //     // }
    //   },
    //   deep:true
    // }
  },
  mounted(){
    //Store.initinfo();
    if(!window.localStorage){
      alert("浏览器不支持localstorage");
      return false;
    }else{
      if(this.storage.getItem("account")){
        //console.log("store"+this.storage.getItem("account"))
        this.items.userAcconut=this.storage.getItem("account")
        if(this.storage.getItem("loginOrNot")=="true"){
          this.loginOrNot=true
        }else{
          this.loginOrNot=false
        }
        //console.log("store"+this.loginOrNot+"--"+this.items.userAcconut)
      }else{
        //console.log('this.storage.getItem("account")为空')
        this.loginOrNot=true
      }
    }
  },
  watch:{
  },
  methods:{
    switchingPage(msg){
      //直接修改属性data数据变，但视图不会刷新
      //this.userAccount=msg
      //将要传的变量放入数组中
      //this.items.userAcconut=msg;
      //console.log(this.items.reverse())
      //this.loginOrNot=false;
      // this.userInfo.push({
      //   userAcconut:msg,
      //   loginOrNot:false
      // });
      if(msg==="exit"){
        //this.storage.clear();
        this.storage.removeItem("account");
        this.storage.removeItem("loginOrNot");
        this.loginOrNot=true
      }else{
        this.storage.setItem("account",msg);
        this.storage.setItem("loginOrNot",false);
        this.loginOrNot=false
        this.items.userAcconut=msg
      }
    }
  }
}
</script>

<style>
*{margin: 0;padding: 0;}
html,body{width: 100%;min-height:100%;}
body{
  font-family: 'Montserrat', sans-serif;
  font-size: 100%;
  background: url('../static/img/bbb.jpg') center center/100% 100% no-repeat;
}
body:before{
  content: '';
  display: table;
}
#app {
  width: 100%;
  min-height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
