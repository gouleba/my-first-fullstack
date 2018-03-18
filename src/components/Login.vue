<template>
<div class="login">
  <div class="top-login">
			<span><img src="../../static/img/group.png" alt=""/></span>
	</div>
	<h1 v-text="title"></h1>
  <p class="rutrueInfo">{{rutrueInfo}}</p>
  <div class="login-top">
      <div class="login-ic">
        <i></i>
        <!-- <input type="text"  value="用户" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'User name';}"/> -->
        <input type="text" placeholder="请输入账号" v-model="account">
        <div class="clear"></div>
      </div>
      <div class="login-ic" v-if="showName">
        <i></i>
        <!-- <input type="text"  value="用户" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'User name';}"/> -->
        <input type="text" placeholder="请输入姓名" v-model="name">
        <div class="clear"></div>
      </div>
      <div class="login-ic">
        <i class="icon"></i>
        <!-- <input type="password"  value="密码" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'password';}"/> -->
        <input type="password" placeholder="请输入密码" v-model="password">
        <div class="clear"></div>
      </div>
      <div class="log-bwn">
        <!-- <input type="submit"  value="Login" > -->
        <input class="mr20" type="submit" @click="reg" v-model="regOrSub" >
        <input type="submit" @click="login" v-model="LogOrSub" v-bind:disabled="loginLock">
      </div>
  </div>
  <p class="copy"><a>© 2018 XXXXXX</a></p>
  <p class="des">由于github无法挂载动态网站，数据请求会失败，详见<a href="https://github.com/wwilll/my-first-fullstack/blob/master/README.md" style="color:yellow">演示截图</a><br>本登录测试demo使用技术为：<br>vuejs+axios+node+express+mongodb
  主要展示了一个B/S结构的系统运行的大致流程<br>具体思路为：登录模块基础逻辑检测并向后台请求数据，收到响应数据后存储至localstorage，
  刷新不丢失数据，退出可清除本地用户数据</p>
</div>
</template>

<script>
export default {
  data(){
    return {
      title:'登录',
      account : '',
      name:'',
      password : '',
      type:'log',
      showName:false,
      regOrSub:'注册',
      LogOrSub:'登录',
      rutrueInfo:'',
      loginLock:false
    }
  },
  mounted(){
  },
  watch:{
    showName:{
      handler:function(showName){
        if(showName){
          this.regOrSub="提交并登录"
          this.title='注册'
          //this.loginLock='true'
          this.LogOrSub='登录(已锁定)'
        }else{
          this.regOrSub="注册"
          this.title='登录'
          this.LogOrSub='登录'
        }
      },
      deep:true
    }
  },
  methods:{
    reg(){
      
      this.rutrueInfo=''
      if(!this.showName){
        this.showName=true;
      }else{
        //判断输入是否为空
        var ac=this.account&&!/^\s+$/.test(this.account)
        var na=this.name&&!/^\s+$/.test(this.name)
        var pa=this.password&&!/^\s+$/.test(this.password)
        if(ac&&na&&pa){
          //console.log("all no kong")
          var url='/api/createAccount';
          this.$ajax.post(url,{account:this.account,name:this.name,password:this.password}).then((response) => {
            //响应成功回调response.data.status的值为2或3
            if(response.data.status==2){
              this.rutrueInfo='注册成功:'
              alert('注册成功')
              this.$emit('switchingPage',response.data.account)
            }else if(response.data.status==3){
              this.rutrueInfo='注册失败:该用户已存在'
              this.account=''
            }else{}
          }).catch((error) => {
            alert('找不到服务器或服务器未启动');
            console.log(error);
          });
        }else{
          this.rutrueInfo='请将信息填写完整'
        }
      }
    },
    login(){
      if(this.showName){
        var r=confirm('您正在注册，确认已有账号返回登录吗？');
        if(r){
          this.showName=false;
          this.title='登录'
          this.rutrueInfo=''
          this.account=''
          this.password=''
          return
        }else{
          return
        }
      }
      var ac=this.account&&!/^\s+$/.test(this.account);
      var pa=this.password&&!/^\s+$/.test(this.password);
      if(ac&&pa){
        var url='/api/loginAccount';
        //get请求能用以下方式，post不能
        //{account:this.account,password : this.password}
        let params = {
          account : this.account,
          password : this.password
        };
        // 获取已有账号密码
        this.$ajax.get(url,{params}).then((response) => {
          //响应成功回调response.data.status的值为0或1
          if(response.data.status==1){
            //this.rutrueInfo='login success:'+response.data.dec
            this.rutrueInfo='登录成功'
            this.account=''
            this.name=''
            this.password=''
            this.$emit('switchingPage',response.data.account)
          }else if(response.data.status==0){
            // this.rutrueInfo='login fail:'+response.data.dec
            this.rutrueInfo='用户名或密码错误或无此人'
          }else{}
        }).catch((error) => {
          alert('找不到服务器或服务器未启动');
          this.account=''
          this.password=''
          console.log(error);
        });
      }else{
        this.rutrueInfo="用户名或密码不能为空"
      }
    }
  }
}
</script>

<style>
.mr20{margin-right: 20px}
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #999;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #999;
}
.clear{clear:both;}/* clear float */
.login .top-login{
    width: 130px;
    height: 130px;
    display: block;
    position: relative;
    margin: 0 auto;
    text-align: center;
}
.top-login span{
    border: 2px solid #F36;
    width: 105px;
    height: 105px;
    display: block;
    margin: 0px auto;
    position: absolute;
    top: 11px;
    left: 11px;
    border-radius: 50%;
}
.top-login span img{
  display: block;
  width: 64px;
  height: 64px;
  /* -webkit-transform: rotate(-45deg) translate3d(0, 0, 0);
  -moz-transform: rotate(-45deg) translate3d(0, 0, 0);
  -ms-transform: rotate(-45deg) translate3d(0, 0, 0);
  -o-transform: rotate(-45deg) translate3d(0, 0, 0);
  transform: rotate(-45deg) translate3d(0, 0, 0); */
  margin: 20.5px; 
}
.login h1{
  margin: 10px 0;
  color: white;
}
.login-top{
	width: 80%;
  display: block;
  margin: 5px auto;
}
.login-ic {
  background: rgba(255, 255, 255, 0.32); 
	margin-bottom:0.7em;
  padding: 4px 8px;	
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-wrap: nowrap;
  border-radius: 10px;
}
.login-ic i {
    background: url('../../static/img/m.png')no-repeat 6px 6px;
    width: 38px;
    height: 38px;
    display: inline-block;
}
.login-ic i.icon {
    background: url('../../static/img/l.png')no-repeat 6px 6px;  
}
.login-ic input[type="text"],.login-ic  input[type="password"] {
    background: none;
    outline: none;
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-left: 1px solid #fff;
    width: auto;
    display: inline-block;
    margin-left: 7px;
}
.log-bwn {
  width: 100%;
  text-align: center;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-wrap: nowrap;
  justify-content:space-between;
}
.log-bwn input[type="submit"] {
  font-size: 15px;
  font-weight: 700;
  border-radius: 10px;
  color: #fff;
  padding: 8px 0;
  background: #ff3366;
  display: inline-block;
  flex-grow:1;
  width: 100%;
	outline:none;
	border:2px solid #ff3366;
	cursor:pointer;
	text-transform:uppercase;
}
.log-bwn input[type="submit"]:hover{
	transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
	border:2px solid #fff;
}
.login p{
  color: white;
}
.login p.copy{
  font-size: 20px;
  margin-top: 20px;
}
.login p.copy a{
  margin-top: 20px;
	color:#fff;
	text-decoration:none;
}
.login p.copy a:hover{
	text-decoration:underline;
}
.login .rutrueInfo{
  color: red;
  font-size: 25px;
}
.login p.des{
  padding: 0 10%;
  text-align: left;
  font-style: italic;
  line-height: 25px;
}
</style>
