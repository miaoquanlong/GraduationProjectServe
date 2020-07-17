/**
 * Created by M.C on 2017/9/15.
 */
import https from 'https';
import fs from 'fs';

module.exports = app => {
    'use strict';
    if (process.env.NODE_ENV !== 'test') {
        // 证书配置https   目前网址http://www.selfsignedcertificate.com
        const credentials = {
            key: fs.readFileSync('60872316_www.localhost.com.key', 'utf8'),
            cert: fs.readFileSync('60872316_www.localhost.com.cert', 'utf8')
        };

        app.db.sequelize.sync().done(() => {
            // https
            // https.createServer(credentials, app).listen(app.get('port'), () => {
            //     console.log(`NTask API - Port ${app.get('port')}`);
            // });
            app.listen(app.get('port'), () => {
                // console.log(`NTask API - Port ${app.get('port')}`);
            });
        });
    }
};