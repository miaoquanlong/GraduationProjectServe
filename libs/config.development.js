/**
 * Created by M.C on 2017/9/15.
 */
import logger from './logger.js';

module.exports = {
    database: 'fan-user-database',
    username: 'root',
    password: 'root123',
    params: {
        dialect: 'mysql',
        logging: sql => {
            'use strict';
            logger.info(`${new Date()} ${sql}`);
        },
        define: {
            underscored: true
        }
    },
    jwtSecret: '1',
    jwtSession: { session: false }
};