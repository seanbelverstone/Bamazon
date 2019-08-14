var mysql = require("mysql");
var inquirer = require("inquirer");
var results = [];

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
        //Displays all the items in a nice format
        for (var i = 0; i < results.length; i++) {
            console.log("\n======================\n");
            console.log("Item " + results[i].item_id + ". " + results[i].product_name);
            console.log("Price: " + results[i].price);
            console.log("Number in Stock: " + results[i].stock_quantity);
        }
    firstQuestion(results);
    });
}

function firstQuestion(results) {
    inquirer.prompt ([

        {
            name: "selectID",
            type: "input",
            message: "Please type the ID of the number you wish to purchase:",
            //Checks that if the input is not a number, it'll return the message. If not it continues.
            validate: function(value) {
                var valid = isNaN(parseFloat(value));
                if (valid === true) {
                return "Please enter a valid ID number";
                }
            return true;
            }
        }

    ]).then(function(response) {
        //This stores the user input into a variable, and then minuses 1 so it can translate to array positions
        var itemIndex = (response.selectID) -1;
        console.log("\nYou have selected item " + results[itemIndex].item_id + ": " + results[itemIndex].product_name);
        console.log("\nPrice: $" + results[itemIndex].price);
        secondQuestion();
    })
}