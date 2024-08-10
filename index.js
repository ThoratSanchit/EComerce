const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/ecomerce.router");
const PORT = 3000;
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static('uploads')); 
app.use("/ecomerce", router);


  

app.listen(PORT, () => {
  console.log("Server is  start");
});
