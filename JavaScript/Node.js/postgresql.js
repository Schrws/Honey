var promise = require('bluebird');
var pgp = require('pg-promise')({promiseLib: promise});

var conString = "postgres://user:password@host:port/name";
var db = pgp(conString);
module.exports = db;