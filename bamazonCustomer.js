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
    console.log("Welcome to \n=============\n Bamazon \n=============\n");
    displayItems();
}

function displayItems() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\nCurrent items in stock: \n")
        for (var i = 0; i < results.length; i++) {
            console.log("\n======================\n");
            console.log("Item " + results[i].item_id + ". " + results[i].product_name);
            console.log("Price: " + results[i].price);
            console.log("Number in Stock: " + results[i].stock_quantity);
        }
        inquirer.prompt ([

            {
                name: "selectID",
                type: "list",
                
            }

        ])
    });
}