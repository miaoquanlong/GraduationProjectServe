/**
 * Created by M.C on 2017/9/15.
 */
var jwtUtil = require('../utils/setToken');
module.exports = app => {
  "use strict";
  /**
   * @api {get} / API Status
   * @apiGroup Status
   * @apiSuccess {String} status API Status' message
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {"status": "NTask API"}
   */
  app.get("/", (req, res) => {
    res.json({ status: 200 });
  });
  app.get('/getPassKey', (req, res) => {
    let id = req.query.username.toString();
    let jwt = new jwtUtil(id)
    let token = jwt.generateToken();
    res.json({
      success: true,
      data: token
    })
  })
};