
//Create express APP
const express = require('express')
const app = express()
var db = require("./database.js")

//Server PORT
const HTTP_PORT = 8080

//Allow CORS
const cors = require('cors')
app.use(cors())
//Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
})

//ENDPOINTS
app.get("/api/flights", (req, res) => {
    var sql = "select * from Flight"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({"data":rows})
    })
})

app.get("/api/flights/:num", (req, res) => {
    var sql = "select * from Flight WHERE num = " + "\'" + req.params.num.replace(":","") + "\'"
    console.log(sql)
    db.get(sql, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({"data":row})
    })
})

//Default response for any other request
app.use(function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   
    res.header("Content-Type", "application/json");
    res.status(404);
})

