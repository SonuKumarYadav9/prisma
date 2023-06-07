const express = require("express");
const multer = require("multer");
const routes = require('./routes/routes');
const cors = require('cors');



const app = express();
const port = 5000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());
app.use(cors());
app.use('/', routes);



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });