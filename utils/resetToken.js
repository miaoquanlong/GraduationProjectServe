// refreshToken
import setToken from './setToken';
import cfg from '../libs/config';
module.exports = token => {
  let optionKeys = ['iat', 'exp', 'iss', 'sub'];
  let newToken;
  let obj = {};

  let now = Math.floor(Date.now() / 1000);
  let timeToExpire = token['exp'] - now;

  if (timeToExpire < 60 * 60) {
    //1h
    for (let key in token) {
      if (optionKeys.indexOf(key) === -1) {
        obj[key] = token[key];
      }
    }
    JWT.sign(obj, Config.get('/jwtSecret'), options);
    newToken = setToken(obj, cfg.jwtSecret);
  } else {
    newToken = ''; //no need to refresh, do what you want here.
  }

  return newToken;
};
