const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Dashboard) ---- */
// The route localhost:8081/people is registered to the function
// routes.getAllPeople, specified in routes.js.
app.get('/dummy_search', routes.dummySearch);
app.get('/cuisine_search/:cuisine', routes.cuisineSearch);
app.get('/getName/:rid', routes.getName);
app.get('/get_food_items/:rid', routes.getFoodItems);
/* ---- Part 2 (FindFriends) ---- */
// TODO: (2) - Add route '/friends/:login' for the functionality of FindFriends page 
//app.get('/friends/:login', routes.FindFriends); // Hint: Replace () => {} with the appropriate route handler in routes.js.


app.listen(8082, () => {
	console.log(`Server listening on PORT 8082`);
});