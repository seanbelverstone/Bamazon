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