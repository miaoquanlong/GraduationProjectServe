// import jwt from 'jsonwebtoken';

// module.exports = (payload, jwtSecret, expiresIn) => {
//     return 'Bearer ' + jwt.sign(payload, jwtSecret, { expiresIn: expiresIn || 3600 });
// };



// 引入模块依赖
const jwt = require('jsonwebtoken');
// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data;
  }
  //生成token
  generateToken() {
    let data = this.data;
    let created = Math.floor(Date.now() / 1000);
    let token = 'Bearer ' + jwt.sign('admin', '10000');
    // let cert = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem'));//私钥 可以自己生成
    // let token = jwt.sign(data, '123456', {
    //   data,
    //   expiresIn: created + 60 * 30,
    // }, { algorithm: 'RS256' });
    // console.log(token,"???token是什么");

    return token;
  }

  // 校验token
  verifyToken() {
    let token = this.data;
    // let cert = fs.readFileSync(path.join(__dirname, '../pem/public_key.pem'));//公钥 可以自己生成
    let res;
    try {
      let result = jwt.verify(token, { algorithms: ['RS256'] }) || {};
      let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      res = 'err';
    }
    return res;
  }
}

module.exports = Jwt;