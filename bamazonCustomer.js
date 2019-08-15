var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",

    port: 3307,

    user: "root",

    password: "root",

    database: "bamazon"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as user ID " + connection.threadId + "\n");
    console.log("Welcome to \n=============\n Bamazon \n=============\n");
    displayItems();
});


function displayItems() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\nCurrent items in stock: \n")

        //Displays all the items in a nice format, using a for loop
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
            message: "Please type the ID of the item you wish to purchase:",
            //Checks that if the input is not a number, it'll return the message. If not it continues.
            validate: function(value) {
                var invalid = isNaN(parseFloat(value));
                if (invalid || parseInt(value) > results.length) {
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
        console.log("\nCurrent Stock: " + results[itemIndex].stock_quantity);
        secondQuestion(results, itemIndex);
    });
}

function secondQuestion(results, itemIndex) {
    inquirer.prompt([

        {
            name: "quantityQuery",
            type: "input",
            message: "How many units would you like to buy?",
            //Another validation rule. This checks that the number is a number and also if the stock level is available
            validate: function(value) {
                var units = parseInt(value);
                if (isNaN(units)) {
                    return "Please enter a number";
                } else if (units > results[itemIndex].stock_quantity) {
                    return ("Oops! Looks like that's more than we have. Current stock: " + results[itemIndex].stock_quantity);
                }
                return true;
            }
        }

    ]).then(function(secondResponse) {
        console.log("\n*==========================*")
        console.log("      Items purchased!");
        console.log("*==========================*\n")
        
        //Sets the remaining stock to equal the current stock minus the user's input
        var remainingStock = parseInt(results[itemIndex].stock_quantity) -  parseInt(secondResponse.quantityQuery);
        var totalCost = parseFloat(results[itemIndex].price) * parseInt(secondResponse.quantityQuery);

        //Lets the user know how much is left afterwards, and also how much it cost overall
        console.log("Remaining stock after purchase: " + remainingStock + "\n");
        console.log("Total cost: $" + totalCost + "\n");

        //Updating the database
        connection.query(
            "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
            [
                remainingStock,
                results[itemIndex].item_id
            ],
            function(error) {
                if (error) throw err;
            }
        );
        
        userContinue();

    });
}


function userContinue() {
    //Asking the user if they'd like to continue or quit
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "\nWould you like to purchase another item?",
            choices: ["Yes", "No"]
        }
    ]).then(function(continueResponse) {
        //Switch case to evaluate whether the user said yes or no
        switch (continueResponse.continue) {

            case "Yes":
                displayItems();
                break;

            case "No":
                console.log("\n====================================\n");
                console.log("Thank you for shopping with Bamazon.");
                console.log("\n====================================\n");
                console.log("We hope to see you soon!\n");
                connection.end();
                break;
        }
    });
}