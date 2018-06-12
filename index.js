const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dbConfig = require('./config.json');

const app = express();
const port = 8080; 


// app settings
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// longitude=-77.036133&latitude=40.513799
app.get('/', (req, res) => {
    res.send('Try posting lat long co ordinates to /');
})


app.post('/', (req, res) => {
    // sanity check of params
    if(req.body && req.body['latitude'] && req.body['longitude']) {

        let {latitude, longitude} = req.body;
        let query_str = `SELECT STATE FROM GEOM where ST_CONTAINS(geom.shape, POINT(${longitude}, ${latitude}))` 

        connection.query(query_str, (err, results, fields) => {
            if(err) {
                res.status(400).json({error: err})
            }
            if(!results || results.length == 0) {
                res.status(200).json({error: "Lat/Long combination not found."})
            }else {
                res.status(200).json(results[0]['STATE']);
            }
            
        })
    }else {
        res.status(400).send('Pass parameters lat long parameters to the end point.');    
    }    
})



app.listen(port, () => {
    console.log('Started server..');
})

const connection = mysql.createConnection(dbConfig);
  
connection.connect(err => {
    if(err) {
        console.log(err);
    }else{
        console.log('Connection Successful');
    }
});