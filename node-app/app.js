//var Couchbase = require("couchbase");
var BodyParser = require("body-parser");
//var Uuid = require("uuid");
var Cors = require("cors");
var Express = require("express");

var app = Express();
app.use(BodyParser.json());
app.use(Cors())

// TODO: uncomment this if you have a local couchbase, until then dummy responses
// var cluster = new Couchbase.Cluster('http://127.0.0.1:8091', {username: 'Administrator', password: 'password'});
// var N1qlQuery = Couchbase.N1qlQuery;
// var bucket = cluster.openBucket("restful-sample");
//tryOpenBucket();

// app.get("/movies", function (req, res) {
//     var query = N1qlQuery.fromString("SELECT * FROM restful-sample").consistency(N1qlQuery.Consistency.REQUEST_PLUS);
//     bucket.query(query, function (error, result) {
//         if (error) {
//             return res.status(400).send({ "message": error });
//         }
//         res.send(result);
//     });
// });
let movies = [];
movies = [{
    "name": "Lord of the Rings",
    "genre": "Action, Adventure, Draman, Fantasy",
    "formats": {
        "digital": true,
        "bluray": false,
        "dvd": true
    }
},
{
    "name": "Joker",
    "genre": "Crime, Drama, Thriller",
    "formats": {
        "digital": false,
        "bluray": true,
        "dvd": false
    }
}];
app.get("/movies", function (req, res) {
    res.send(movies);
});

// app.get("/movies/:title", function (req, res) {
//     if (!req.params.title) {
//         return res.status(400).send({ "message": "Missing `title` parameter" });
//     }
//     var query = N1qlQuery.fromString("SELECT example.* FROM example WHERE LOWER(name) LIKE '%' || $1 || '%'").consistency(N1qlQuery.Consistency.REQUEST_PLUS);
//     bucket.query(query, [req.params.title.toLowerCase()], function (error, result) {
//         if (error) {
//             return res.status(400).send({ "message": error });
//         }
//         res.send(result);
//     });
// });
app.get("/movies/:title", function (req, res) {
    if (!req.params.title) {
        //return res.status(400).send({ "message": "Missing `title` parameter" });
        res.send(movies);
    }
    let mName = req.params.title.toLowerCase();
    let filtered = movies.filter(m => m.name.toLowerCase().substr(0, m.length).search(mName) !== -1);
    res.send(filtered);
});

// app.post("/movies", function (req, res) {
//     if (!req.body.name) {
//         return res.status(400).send({ "message": "Missing `name` property" });
//     } else if (!req.body.genre) {
//         return res.status(400).send({ "message": "Missing `genre` property" });
//     }
//     bucket.insert(Uuid.v4(), req.body, function (error, result) {
//         if (error) {
//             return res.status(400).send({ "message": error });
//         }
//         res.send(req.body);
//     });
// });
app.post("/movies", function (req, res) {
    if (!req.body.name) {
        return res.status(400).send({ "message": "Missing `name` property" });
    } else if (!req.body.genre) {
        return res.status(400).send({ "message": "Missing `genre` property" });
    }
    movies.push(req.body);
    res.send(req.body);
});

// var beerBucket = cluster.openBucket("beer-sample");
// app.get("/beers", function (req, res) {
//     var query = N1qlQuery.fromString("SELECT * FROM beer-sample").consistency(N1qlQuery.Consistency.REQUEST_PLUS);
//     beerBucket.query(query, function (error, result) {
//         if (error) {
//             return res.status(400).send({ "message": error });
//         }
//         res.send(result);
//     });
// });
/**
 * tests to open bucket and print console log accordingly
 */
function tryOpenBucket() {
    bucket= cluster.openBucket('default');
    bucket.on('error', function (err) {
        couchbaseConnected = false;
        console.log('CONNECT ERROR:', err);
    });
    bucket.on('connect', function () {
        couchbaseConnected = true;
        console.log('connected couchbase');
    });
}

app.listen(3000, function () {
    console.log("Starting server on port 3000...");
});