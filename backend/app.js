const express = require('express');
const appRoutes = require('./routes/appRoutes.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db/conn');  // Make sure to import the connection here


const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", appRoutes);

app.listen(PORT,"0.0.0.0",() => {
  console.log(`Server is listening on port ${PORT}`);
});

