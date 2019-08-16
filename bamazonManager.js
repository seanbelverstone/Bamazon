/*PSUEDOCODE
==============

This app lets the manager do many different processes.
On load, the manager is greeted with a list that offers the following:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

View Products for Sale shows all of the items from the list.
View Low Inventory shows all items with a stock_quantity lower than 5.
Add to Inventory lets the manager select an item, and increase the stock_quantity.
Add New Product initiates a prompt where the manager can create a new item. It will ask for:
    - Name (product_name)
    - Department (department_name)
    - Price (price)
    - Stock Quantity (stock_quantity) */

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
    console.log("\nConnected as user ID " + connection.threadId + "\n");
    console.log("Welcome to the Bamazon Manager Screen");
    initialList();
});

function initialList() {
    inquirer.prompt([
        {
            name: "choices",
            type: "list",
            message: "\nMain Menu\nWhat would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }
    ]).then(function(response) {
        switch (response.choices) {

            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInventory();
                break;

            case "Add to Inventory":
                addStock();
                break;

            case "Add New Product":
                addNewProduct();
                break;

            case "Quit":
                connection.end();
                break;
        }
    });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\nAll items currently for sale: \n");

        //Displays all the items in a nice format, using a for loop
        displayItems();

        continueToMenu();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
        if (err) throw err;
        console.log("All items with less than 5 units: \n");
        if (results.length > 0) {

            displayItems();

        } else {
            console.log("\n======================");
            console.log("  No items to display.");
            console.log("======================\n");

        }
        continueToMenu();

    });
}

//ADD INVENTORY/STOCK SECTION
function addStock() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter the ID of the product you wish to add more stock for:"
        },
        {
            name: "stockAmount",
            type: "input",
            message: "Please enter the amount of stock you'd like to add:"
        }
    ]).then(function(addStockResponse) {
        //Grabbing the item chosen by the user, using the id as a selector.
        connection.query("SELECT * FROM products WHERE ?", {item_id: addStockResponse.id}, function(err, response) {

            //Storing the new stock value as a variable, so we can update the database easier
            var newStockAmount = response[0].stock_quantity + parseInt(addStockResponse.stockAmount);

            //Query to update the database
            connection.query("UPDATE products SET ? WHERE ?", 
                [{

                    stock_quantity: newStockAmount

                },{
                    
                    item_id: addStockResponse.id

                }], function(err, results) {
                    if (err) throw err;
                });

            //Redisplaying the updated product
            connection.query("SELECT * FROM products WHERE ?", {item_id: addStockResponse.id}, function(err, response) {
                console.log("Stock updated! See below:\n");
                console.log(response[0].item_id + ": " + response[0].product_name);
                console.log("Updated stock level: " + response[0].stock_quantity);
            });

        });


    });
}

function addNewProduct() {
    console.log("This allows the manager to add an entirely new product");
    inquirer.prompt([
        {
            name: "productName",
            type: "input",
            message: "Enter a product name",
        },
        {
            name: "departmentName",
            type: "input",
            message: "Enter a department"
        },
        {
            name: "price",
            type: "input",
            message: "Enter a price for item"
        },
        {
            name: "stockQuantity",
            type: "input",
            message: "Enter the initial stock amount"
        }
    ]).then(function(results) {
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?", {
            product_name: results.productName,
            department_name: results.departmentName,
            price: results.price,
            stock_quantity: results.stockQuantity
        }, function(err, results) {
            if (err) throw err;
            displayItems();
            continueToMenu();
    });
    });
}


//This is a function for going back to the main menu.
function continueToMenu() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "\nWould you like to continue?",
            choices: ["Back to Main Menu", "Quit"]
        }
    ]).then(function(menuResponse) {
        switch (menuResponse.continue) {
            case "Back to Main Menu":
                initialList();
                break;

            case "Quit":
                connection.end();
                break;
        }
    })
}

function displayItems() {
    for (var i = 0; i < results.length; i++) {
        console.log("\n======================\n");
        console.log("Item " + results[i].item_id + ". " + results[i].product_name);
        console.log("Price: " + results[i].price);
        console.log("Number in Stock: " + results[i].stock_quantity);
    }
}