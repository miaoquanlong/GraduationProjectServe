/**
 * Created by M.C on 2017/9/19.
 */
import setToken from '../utils/setToken';
import bcrypt from "bcrypt-nodejs"

module.exports = app => {
  'use strict';
  const cfg = app.libs.config;
  const Users = app.db.models.Users;
  app.route("/token")
  app.post('/user/login', (req, res) => {
    Users.findOne({ where: { username: req.body.username } }).then(result => {
      const salt = bcrypt.genSaltSync();
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      if (!result) {
        res.status(400).json({ msg: '用户名不正确', isPrompt: true, success: false });
      } else if (Users.isPassword(req.body.password,result.dataValues.password)) {
        res.status(400).json({ msg: '用户密码不正确', isPrompt: true, success: false });
        return
      } else {
        return res.json({
          success: true,
          data: result
        })
      }
    }).catch(error => {
      res.status(412).json({ msg: error.message });
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