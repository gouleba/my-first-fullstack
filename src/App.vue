<template>
  <div id="app">
    <!-- <img src="../static/logo.png"> -->
    <!-- <router-view/> -->
    <login @switchingPage="switchingPage" v-if="loginOrNot"></login>
    <forum @switchingPage="switchingPage" v-bind:account="items.userAcconut" v-if="!loginOrNot"></forum>
  </div>
</template>

<script>
import login from './components/Login'
import forum from './components/Forum'
export default {
  name: 'App',
  data(){
    return{
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
  },
  mounted(){
    if(!window.localStorage){
      alert("浏览器不支持localstorage");
      return false;
    }else{
      if(this.storage.getItem("account")){
        this.items.userAcconut=this.storage.getItem("account")
        if(this.storage.getItem("loginOrNot")=="true"){
          this.loginOrNot=true
        }else{
          this.loginOrNot=false
        }
      }else{
        this.loginOrNot=true
      }
    }
  },
  watch:{
  },
  methods:{
    switchingPage(msg){
      if(msg==="exit"){
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
  background: url('../static/img/bg.jpg') center center/100% 100% no-repeat;
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
  margin-top: 20px;
}
</style>
