import express from "express";

const PORT = 4000;
const app = express();


app.use(require('./endpoints'));



app.listen(PORT, function () {


  console.log(`Server listening at http://localhost:${PORT} 🚀`)

});