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

app.get('/dummy_search', routes.dummySearch);
app.get('/cuisine_search/:cuisine', routes.cuisineSearch);
app.get('/getName/:rid', routes.getName);
app.get('/get_food_items/:rid', routes.getFoodItems);

app.listen(8082, () => {
	console.log(`Server listening on PORT 8082`);
});