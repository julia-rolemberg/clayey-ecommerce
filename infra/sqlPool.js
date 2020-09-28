"use strict";
var _a;
const mysql = require("mysql");
const appsettings = require("../appsettings");
module.exports = (_a = class SqlPool {
    },
    // https://www.npmjs.com/package/mysql
    _a.pool = mysql.createPool(appsettings.sqlPool),
    _a);
//# sourceMappingURL=sqlPool.js.map