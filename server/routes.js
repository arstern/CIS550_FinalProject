var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function getFromCuisine(req, res) {
  var inputCuisine = req.params.cuisine;
  
  // TODO: (3) - Edit query below
  var query = `
    SELECT restaurant_name
    FROM Cuisine c JOIN Restaurant r ON r.restaurant_id = c.restaurant_id
    WHERE c.cuisine = "${inputCuisine}"
    LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function dummySearch(req, res) {  
  // TODO: (3) - Edit query below
  var query = `
    SELECT restaurant_name
    FROM Restaurant r
    LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  cuisineSearch: getFromCuisine,
  dummySearch : dummySearch
}