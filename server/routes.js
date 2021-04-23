var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- (Dashboard) ---- */
function getAllPeople(req, res) {
  var query = `
    SELECT login, name, birthyear
    FROM Person;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getFriends(req, res) {
  var inputLogin = req.params.login;
  
  // TODO: (3) - Edit query below
  var query = `
    SELECT name, login  FROM Person p JOIN  (SELECT friend FROM Person p JOIN Friends f ON p.login = f.login WHERE p.login = ${inputLogin}) f ON p.login = f.friend;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getResults(req, res){
  var query = `
    SELECT * FROM Restaurant WHERE restaurant_phone is not null AND LENGTH(restaurant_phone) > 0 LIMIT 10;
  `
  connection.query(function(err, rows, fields){
    if (err) console.log(err);
    else{
      console.log(rows);
      res.json(rows);
    }
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllPeople: getAllPeople,
  getFriends: getFriends,
  getResults: getResults
}