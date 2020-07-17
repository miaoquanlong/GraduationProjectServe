/**
 * Created by M.C on 2017/9/19.
 */
import setToken from '../utils/setToken';
import bcrypt from "bcrypt-nodejs"
module.exports = app => {
  'use strict';
  const cfg = app.libs.config;
  const Users = app.db.models.Users;
  // app.route("*").all(app.auth.authenticate()) 对所有接口进行鉴权
  // app.route("/tasks/:id")
    // .all(app.auth.authenticate()) //对单个接口使用鉴权
  app.post('/user/login', (req, res) => {
    Users.findOne({ where: { username: req.body.username } }).then(result => {
      if (!result) {
        res.status(400).json({ msg: '用户名不正确', isPrompt: true, success: false });
      } else if (!Users.isPassword(result.password,req.body.password)) {
        res.status(400).json({ msg: '用户密码不正确', isPrompt: true, success: false });
        return
      } else {
        const payload = { id: result.id };
        return res.json({
          token: setToken(payload, cfg.jwtSecret),
          success: true,
          data: result
        })
      }
    }).catch(error => {
      res.status(400).json({ msg: error.message });
    })
  });
  app.post('/user/register', (req, res) => {
    const { username, password, email } = req.body
    Users.findOne({ where: { username: username } }).then(result => {
      if (result) {
        return res.status(400).json({ msg: '用户已存在', success: false, status: 400 })
      } else {
        Users.create(req.body).then(results => {
          return res.json({
            success: true,
            data: results,
            msg: '注册成功'
          })
        })
      }
    }).catch(err => {

    })
  })
};