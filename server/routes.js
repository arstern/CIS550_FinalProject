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
    SELECT restaurant_name, c.restaurant_id as rid
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

function getName(req, res) {
  var inputId = req.params.rid;
  
  var query = `
    SELECT restaurant_name
    FROM Restaurant r 
    WHERE r.restaurant_id = "${inputId}";
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
    SELECT restaurant_name, restaurant_id AS rid
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

function getFoodItems(req, res){
  var inputId = req.params.rid;

  var query = `
    SELECT name, price
    FROM FoodItem f
    WHERE f.rest_id = "${inputId}";
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });

}

// The exported functions, which can be accessed in index.js.
module.exports = {
  cuisineSearch: getFromCuisine,
  dummySearch : dummySearch,
  getName : getName,
  getFoodItems, getFoodItems
}