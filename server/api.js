// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
//"use strict";
const express = require('express');
const router = express.Router();
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
router.post('/api/createAccount',(req,res) => {
    var sn=req.body.account;
    var name=req.body.name;
    var pwd=req.body.password;
    var isexist={sn:sn}
    var insert={sn:sn,name:name,pwd:pwd};
    //使用mongodb插件直连
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/fskdb";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        //console.log("数据库已创建并连接!!!");
        var dbo=db.db("fskdb");
        dbo.collection("login").find(isexist).toArray(function(err,result){
            if(err) throw err;
            if(result.length==0){
                //console.log('查无id，可创建')
                dbo.collection("login").insert(insert)
                var ap={"status":2,"dec":"register success","account":sn}
                res.send(ap);
            }else{
                var ap={"status":3,"dec":"account exist","account":sn}
                res.send(ap);
            }
            db.close();
        })  
    })
});
router.get('/api/loginAccount',(req,res) => {
    //get方式用   var name=req.query.name;
    //post方式用  var sn=req.body.account;
    //express deprecated req.param(name): Use req.params, 
    //req.body, or req.query instead api.js:51:40
    var sn=req.query.account;
    var pwd=req.query.password;
    //var isexist={sn:sn}
    var whereStr={sn:sn,pwd:pwd};
    var ap;
    //使用mongodb插件直连
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/fskdb";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        //console.log("数据库已创建并连接!!!");
        var dbo=db.db("fskdb");
        dbo.collection("login").find(whereStr).toArray(function(err,result){
            if(err) throw err;
            //console.log(whereStr)
            if(result.length==0){
                //console.log('查无此人')
                var ap={"status":0,"dec":"login fail","account":sn}
                res.send(ap);
            }else{
                result.forEach(function(item,index,arr){
                    //console.log(item.name+index);
                    var ap={"status":1,"dec":"login success","account":sn}
                    res.send(ap);
                });
            }
            db.close();
        })  
    })
});
module.exports = router;