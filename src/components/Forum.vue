<template>
<div class="forum">
  <h1>{{account}}</h1>
  <h1>欢迎登录!</h1>
  <button class="exit" @click="exitLogin">退出登录</button>
</div>
</template>

<script>
export default {
  props:["account"],
  methods:{
    exitLogin:function(){
      this.$emit('switchingPage',"exit")
    }
  }
}
</script>

<style>
.forum h1{
  color: red;
}
.forum .exit{
  margin-top: 200px;
  padding: 4px 15px;
  font-size: 20px;
  border-radius: 20px;
  background-color: #fff;
  color: black;
}
</style>


