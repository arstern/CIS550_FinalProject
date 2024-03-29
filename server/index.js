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
app.get('/getName/:rid', routes.getName);
app.get('/get_food_items/:rid', routes.getFoodItems);
app.get('/name_search/:name', routes.nameSearch);
app.get('/cheapest_chain/:name', routes.cheapest_chain);

app.get('/random', routes.getRand);

app.get('/get_tf', routes.getTF);
app.get('/foodpics', routes.foodPics);
app.get('/get_deal/:food/:category', routes.getDeal);

app.get('/c_search/:cuisine', routes.cSearch);
app.get('/l_search/:lat/:long', routes.lSearch);
app.get('/b_search/:borough', routes.bSearch);
app.get('/p_search/:price', routes.pSearch);

app.get('/cl_search/:cuisine/:lat/:long', routes.clSearch);
app.get('/cb_search/:cuisine/:borough', routes.cbSearch);
app.get('/cp_search/:cuisine/:price', routes.cpSearch);
app.get('/lb_search/:lat/:long/:borough', routes.lbSearch);
app.get('/lp_search/:lat/:long/:price', routes.lpSearch);
app.get('/bp_search/:borough/:price', routes.bpSearch);

app.get('/clb_search/:cuisine/:lat/:long/:borough', routes.clbSearch);
app.get('/clp_search/:cuisine/:lat/:long/:price', routes.clpSearch);
app.get('/cbp_search/:cuisine/:borough/:price', routes.cbpSearch);
app.get('/lbp_search/:lat/:long/:borough/:price', routes.lbpSearch);

app.get('/clbp_search/:cuisine/:lat/:long/:borough/:price', routes.clbpSearch);

// add in the complex query 
app.get('/complex_query/:cuisine/:borough/:price/', routes.complex_query)

app.listen(8082, () => {
	console.log(`Server listening on PORT 8082`);
});