<template>
<div class="forum">
  <h1>{{account}}!欢迎登录!</h1>
  <button @click="exitLogin">退出登录</button>
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
</style>


