require('dotenv').config()
const db = require('./db/database');
const fs = require('fs');

let args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Please specify input file");
    return;
}

const filename = args[0];


fs.readFile(filename, {"encoding": "utf8"}, (err, data) => {

    if (err) throw err;

    let lines = data.split("\n").filter(l => l.length > 0);

    let result = [];
    lines.forEach(l => {
        let values = l.split(/\s+/);
        let score = Number(values[2]);
        if (Number.isNaN(score)) {
            score = 0;
        }
        result.push({
            username1: values[0],
            username2: values[1],
            score: score,
        });
    });

    db.saveAdsorptionResult(result, (err, _) => {
        if (err) throw err;
        console.log("Imported data!");
    })

});

