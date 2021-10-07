
//Create express APP
const EXPRESS = require('express')
const APP = EXPRESS()
var db = require("./database.js")

//Server PORT
const HTTP_PORT = 8080

//Start server
APP.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
})

//ENDPOINTS
APP.get("/api/flights", (req, res, next) => {
    var sql = "select * from Flight"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"succes",
            "data":rows
        })
    })
})

APP.get("/api/flight:num", (req, res, next) => {
    var sql = "select * from Flight WHERE num = ?"
    var params = [req.params.num]

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    })
})

//Default response for any other request
APP.use(function(req, res){
    res.status(404);
})

