/// <reference path="Scripts/typings/node/node.d.ts" />
/// <reference path="Scripts/typings/express/express.d.ts" />
/// <reference path="Scripts/typings/mongodb/mongodb.d.ts" />

/// <reference path="./client/ts/AllDefs.ts" />

import express = module("express");
import mongodb = module("mongodb");

var Data = <Data> require("./client/ts/data/guestbookEntry");

class GuestBookDb extends mongodb.Db {
    public entries: mongodb.Collection;
}


var server = express();

//__dirname is the directory server.js is in.
server.use("/client", express.static(__dirname + "/client"));
server.use("/Scripts", express.static(__dirname + "/Scripts"));
server.use("/Content", express.static(__dirname + "/Content"));

//This is needed to use the body of a post request.
server.use(express.bodyParser());

var mongoServer: mongodb.Server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
var db = <GuestBookDb> new mongodb.Db('devdaysdb', mongoServer, { safe: true });

db.open( (err, openedDb) => {
    if (!err) {
        console.log("Connected to 'devdaysdb' database.");

        db.collection('entries', (err, collection) => {
            db.entries = collection;
        });
    }
    else {
        console.log("Could not connect to 'devdaysdb' database.");
    }
});


server.get('/', (req, res) => {
    res.sendfile("index.html");
});


server.get('/api/entries', (req, res) => {
    //Stop IE from caching this response.
    res.header("Cache-Control", "max-age=0,no-cache,no-store");

    console.log("Recieved get request to /api/entries.");
    
    db.entries.find().toArray((err, items) => {
        res.send(items);
    });
});

server.post('/api/entries', (req, res) => {
    var entry = req.body;

    db.entries.insert(entry, { safe: true }, (err, result) => {
        if (err) {
            res.send({ error: 'An error has occurred inserting an entry' });
        } else {
            res.send(result[0]);
        }
    });
});

server.post('/api/entries/delete', (req, res) => {
    console.log("Recieved post request to /api/entries/delete.");

    var entry = <Data.GuestbookEntry> req.body;

    db.entries.remove(mongoHelper.createQueryID(entry._id), (err, result) => {
        console.log(result + " entries deleted from the entries collection.");
        res.send({entriesDeleted: result});
    });

});

module mongoHelper {
    export function createQueryID(id: string) {
        return { _id: new mongodb.ObjectID(id) };
    }
}

server.listen(3000);
console.log('Listening on port 3000...');