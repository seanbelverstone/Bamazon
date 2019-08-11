var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",

    database: "bamazon"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as user ID " + connection.threadId + "\n");
    start();
});

function start() {
    console.log("Welcome to \n ========== \n Bamazon \n ========== \n");
    displayItems();
}

function displayItems() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\nCurrent items in stock: \n")
        results.forEach {
            //For each to loop through the database array and print out in a nice, readable format

        }
    });
}