const express = require('express');
const app = express();
const path = require('path');
const route1 = require('./routes/route');
const val = require('./mongoconnection/mongos.js');
const cors = require('cors');
val();

app.use(express.json());
// app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(cors());

app.get("/",(req,res)=>{
  res.json("server started...")
})


// routes
app.use(route1);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server is running....');
})