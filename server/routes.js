var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

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
      res.json(rows);
    }
  });
};

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
  
  // TODO: (3) - Edit query below
  var query = `
    SELECT *
    FROM Cuisine c JOIN Restaurant r ON r.restaurant_id = c.restaurant_id
    WHERE c.cuisine = "${inputCuisine}";
  `;
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
    HAVING distance < 5 
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
    HAVING distance < 5
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
    HAVING distance < 5
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
    HAVING distance < 5
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
    HAVING distance < 5
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
    HAVING distance < 5
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
    SELECT r.*
    ( 3959 * acos( cos( radians(${inputLat}) ) * cos( radians( lat ) ) 
       * cos( radians(lon) - radians(${inputLong})) + sin(radians(${inputLat})) 
       * sin( radians(lat)))) AS distance
       
    FROM Restaurant r
    WHERE price_range = "${inputPrice}" AND borough = "${inputBorough}"
    HAVING distance < 5
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
    HAVING distance < 5
    ORDER BY distance;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
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



  dummySearch : dummySearch,
  getName : getName,
  getFoodItems : getFoodItems,
  getTF : getTF,
  foodPics : getFoodPics,
  getDeal : getItemDeal,

}