/**
 * Created by M.C on 2017/9/14.
 */

import express from "express"
import consign from "consign"
// var express = require('express')
// var consign = require('consign')


const app = express();
app.all("*", function(req, res, next) {
  // //设置允许跨域的域名，*代表允许任意域名跨域
  // res.header("Access-Control-Allow-Origin", "*");
  // //允许的header类型
  // res.header("Access-Control-Allow-Headers", "content-type");
  // // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

  // // content-type
  // res.header("Content-Type", "application/json;charset=utf-8")
  // //跨域允许的请求方式 
  // res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");

  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
}),
  /// 在使用include或者then的时候，是有顺序的，如果传入的参数是一个文件夹
  /// 那么他会按照文件夹中文件的顺序进行加载

  consign({ verbose: false })
    .include("libs/config.js")
    .then("db.js")
    .then("auth.js")
    .then("libs/middlewares.js")
    .then("routers")
    .then("libs/boot.js")
    .into(app);

module.exports = app;