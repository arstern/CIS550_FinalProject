var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 1;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */
function getRand(req, res){
  var query = `
  SELECT * FROM Restaurant r
  ORDER BY RAND()
  LIMIT 1
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}
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
      res.json(rows);
    }
  });
};

function getRFromName(req, res){
  var inputName = req.params.name;
  
  var query = `
    SELECT *
    FROM Restaurant r 
    WHERE r.restaurant_name LIKE "%${inputName}%";
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function getFoodItems(req, res){
  var inputId = req.params.rid;

  var query = `
    SELECT *
    FROM FoodItem f
    WHERE f.rest_id = "${inputId}";
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getFoodPics(req, res){
  var query = `SELECT * FROM FoodPictures`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getTF(req, res){
  var query = `SELECT * FROM foodword_tf`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getItemDeal(req, res){
  var foodName = req.params.food;
  var cat = req.params.category;

  var query = `
    SELECT name, AVG(price) as price, "${cat}" as category
    FROM average_price_by_name_cuisine
    WHERE name = "${foodName}"
    GROUP BY name;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};
function getRFromC(req, res) {
  var inputCuisine = req.params.cuisine;
  
  var query = `SELECT distinct restaurant_name, restaurant_website, price_range, price_range_num, restaurant_id, formatted, lat, lon, borough
               FROM rest_cuisine_food r
               WHERE r.cuisine = "${inputCuisine}" OR r.name = "${inputCuisine}";`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};
function getRFromL(req, res) {
  var inputLat = req.params.lat;
  var inputLong = req.params.long;
  
  var query = `
   SELECT r.*,
    ( 3959 * acos( cos( radians(${inputLat}) ) * cos( radians( lat ) ) 
       * cos( radians(lon) - radians(${inputLong})) + sin(radians(${inputLat})) 
       * sin( radians(lat)))) AS distance
       
    FROM Restaurant r
    HAVING distance < 1 
    ORDER BY distance;

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromB(req, res) {
  var inputBorough = req.params.borough;
  
  var query = `
    SELECT *
    FROM Restaurant r
    WHERE r.borough = "${inputBorough}"
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromP(req, res) {
  var inputPrice = req.params.price;
  
  var query = `
    SELECT *
    FROM Restaurant r
    WHERE r.price_range = "${inputPrice}"
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromBP(req, res) {
  var inputPrice = req.params.price;
  var inputBorough = req.params.borough;
  

  var query = `
    SELECT *
    FROM Restaurant r
    WHERE r.price_range = "${inputPrice}" AND r.borough = "${inputBorough}"
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromLB(req, res) {
  var inputLat = req.params.lat;
  var inputLong = req.params.long;
  var inputBorough = req.params.borough;

  var query = `
    SELECT r.*,
    ( 3959 * acos( cos( radians(${inputLat}) ) * cos( radians( lat ) ) 
       * cos( radians(lon) - radians(${inputLong})) + sin(radians(${inputLat})) 
       * sin( radians(lat)))) AS distance
      
    FROM Restaurant r
    WHERE borough = "${inputBorough}"
    HAVING distance < 1
    ORDER BY distance;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromLP(req, res) {
  var inputLat = req.params.lat;
  var inputLong = req.params.long;
  var inputPrice = req.params.price;

  var query = `
    SELECT r.*,
    ( 3959 * acos( cos( radians(${inputLat}) ) * cos( radians( lat ) ) 
       * cos( radians(lon) - radians(${inputLong})) + sin(radians(${inputLat})) 
       * sin( radians(lat)))) AS distance
       
    FROM Restaurant r
    WHERE price_range = "${inputPrice}"
    HAVING distance < 1
    ORDER BY distance;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromCP(req, res) {
  var inputPrice = req.params.price;
  var inputCuisine = req.params.cuisine;
  

  var query = `    
    SELECT *
    FROM Cuisine c JOIN Restaurant r ON r.restaurant_id = c.restaurant_id
    WHERE c.cuisine = "${inputCuisine}" AND r.price_range = "${inputPrice}"
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromCB(req, res) {
  var inputBorough = req.params.borough;
  var inputCuisine = req.params.cuisine;
  

  var query = `    
    SELECT *
    FROM Cuisine c JOIN Restaurant r ON r.restaurant_id = c.restaurant_id
    WHERE c.cuisine = "${inputCuisine}" AND r.borough = "${inputBorough}"
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromCL(req, res) {
  var inputLat = req.params.lat;
  var inputLong = req.params.long;
  var inputCuisine = req.params.cuisine;

  var query = `
    SELECT r.*,
    ( 3959 * acos( cos( radians(${inputLat}) ) * cos( radians( lat ) ) 
       * cos( radians(lon) - radians(${inputLong})) + sin(radians(${inputLat})) 
       * sin( radians(lat)))) AS distance
       
    FROM Cuisine c JOIN Restaurant r ON r.restaurant_id = c.restaurant_id
    WHERE c.cuisine = "${inputCuisine}"
    HAVING distance < 1
    ORDER BY distance;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromCLB(req, res) {
  var inputLat = req.params.lat;
  var inputLong = req.params.long;
  var inputCuisine = req.params.cuisine;
  var inputBorough = req.params.borough;

  var query = `
    SELECT r.*,
    ( 3959 * acos( cos( radians(${inputLat}) ) * cos( radians( lat ) ) 
       * cos( radians(lon) - radians(${inputLong})) + sin(radians(${inputLat})) 
       * sin( radians(lat)))) AS distance
       
    FROM Cuisine c JOIN Restaurant r ON r.restaurant_id = c.restaurant_id
    WHERE c.cuisine = "${inputCuisine}" AND r.borough = "${inputBorough}"
    HAVING distance < 1
    ORDER BY distance;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromCLP(req, res) {
  var inputLat = req.params.lat;
  var inputLong = req.params.long;
  var inputCuisine = req.params.cuisine;
  var inputPrice = req.params.price;

  var query = `
    SELECT r.*,
    ( 3959 * acos( cos( radians(${inputLat}) ) * cos( radians( lat ) ) 
       * cos( radians(lon) - radians(${inputLong})) + sin(radians(${inputLat})) 
       * sin( radians(lat)))) AS distance
       
    FROM Cuisine c JOIN Restaurant r ON r.restaurant_id = c.restaurant_id
    WHERE c.cuisine = "${inputCuisine}" AND r.price_range = "${inputPrice}"
    HAVING distance < 1
    ORDER BY distance;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromCBP(req, res) {
  var inputBorough = req.params.borough;
  var inputCuisine = req.params.cuisine;
  var inputPrice = req.params.price;
  

  var query = `    
    SELECT *
    FROM Cuisine c JOIN Restaurant r ON r.restaurant_id = c.restaurant_id
    WHERE c.cuisine = "${inputCuisine}" AND r.borough = "${inputBorough}" AND r.price_range = "${inputPrice}" 
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromLBP(req, res) {
  var inputLat = req.params.lat;
  var inputLong = req.params.long;
  var inputPrice = req.params.price;
  var inputBorough = req.params.borough;

  var query = `
    SELECT r.*,
    ( 3959 * acos( cos( radians(${inputLat}) ) * cos( radians( lat ) ) 
       * cos( radians(lon) - radians(${inputLong})) + sin(radians(${inputLat})) 
       * sin( radians(lat)))) AS distance
       
    FROM Restaurant r
    WHERE price_range = "${inputPrice}" AND borough = "${inputBorough}"
    HAVING distance < 1
    ORDER BY distance;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRFromCLBP(req, res) {
  var inputLat = req.params.lat;
  var inputLong = req.params.long;
  var inputCuisine = req.params.cuisine;
  var inputPrice = req.params.price;
  var inputBorough = req.params.borough;

  var query = `
    SELECT r.*,
    ( 3959 * acos( cos( radians(${inputLat}) ) * cos( radians( lat ) ) 
       * cos( radians(lon) - radians(${inputLong})) + sin(radians(${inputLat})) 
       * sin( radians(lat)))) AS distance
       
    FROM Cuisine c JOIN Restaurant r ON r.restaurant_id = c.restaurant_id
    WHERE c.cuisine = "${inputCuisine}" AND r.price_range = "${inputPrice}" AND r.borough = "${inputBorough}"
    HAVING distance < 1
    ORDER BY distance;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

//add in complex query function
function complex_query (req,res){
  var inputCuisine = req.params.cuisine;
  var inputPrice = req.params.price;
  var inputBorough = req.params.borough;

  var query = ` 
  WITH rests AS (
  SELECT *
  FROM Restaurant
  WHERE price_range<= '${inputPrice}' AND borough LIKE '%${inputBorough}%' AND LENGTH(restaurant_website) >0

  ),
  cuisines AS(
  SELECT * FROM Cuisine
  WHERE Cuisine LIKE '%${inputCuisine}%'
  ),
  joined AS (
  SELECT rests.*, cuisines.cuisine
  FROM rests 
  JOIN cuisines ON rests.restaurant_id = cuisines.restaurant_id
  ),
  rest_ids AS (
  SELECT restaurant_id FROM joined),
  num_dishes AS (
  SELECT COUNT(name) AS num_dishes, FoodItem.rest_id 
  FROM FoodItem 
  JOIN rest_ids ON FoodItem.rest_id = rest_ids.restaurant_id
  GROUP BY FoodItem.rest_id 
  ) 
  SELECT joined.*, num_dishes FROM num_dishes
  JOIN joined ON num_dishes.rest_id = joined.restaurant_id
  ORDER BY num_dishes DESC LIMIT 1;`
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getCheapestChain(req, res) {
  var inputRest = req.params.name;
  
  var query = `
	SELECT * 
	FROM cheapest_chain 
	WHERE restaurant_name LIKE "%${inputRest}%";
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function dummySearch() {

};

// The exported functions, which can be accessed in index.js.
module.exports = {
  cSearch: getRFromC,
  lSearch: getRFromL,
  bSearch: getRFromB,
  pSearch: getRFromP,

  bpSearch: getRFromBP,
  lbSearch: getRFromLB,
  lpSearch: getRFromLP,
  cpSearch: getRFromCP,
  cbSearch: getRFromCB,
  clSearch: getRFromCL,

  clbSearch: getRFromCLB,
  clpSearch: getRFromCLP,
  cbpSearch: getRFromCBP,
  lbpSearch: getRFromLBP,
  clbpSearch: getRFromCLBP,

  complex_query :complex_query,

  dummySearch : dummySearch,
  getName : getName,
  nameSearch: getRFromName,
  cheapest_chain: getCheapestChain,
  getFoodItems : getFoodItems,
  getTF : getTF,
  foodPics : getFoodPics,
  getDeal : getItemDeal,
  getRand : getRand

}
