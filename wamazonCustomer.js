var mysql = require("mysql");;
var inquirer = require("inquirer");
var table = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "your mysql password",
    database: "wamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n\n==================================================================");
    console.log("Welcome to WAMazon! Check out our products for sale below!");
    console.log("==================================================================");

    allProducts();
});

function allProducts() {
    // query the database for all items for sale
    connection.query("SELECT * from products;", function(err, results, fields) {
        if (err) throw err;
        else {
        console.table("\n");
        // console log all products
        console.table(results);
        
      }
      pickProduct();
     
    }
    
)}

function pickProduct() {
    inquirer
        .prompt([
        {
          name: "product",
          type: "input",
          message: "What is the item number of the product you would like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
        ])
        .then(function(answer) {
            
            
            var product = answer.product;
            var quantity = answer.quantity;
            
            var queryProducts = "SELECT * FROM products WHERE ?";
            var cost 
            connection.query(queryProducts, {item: product}, function(err, res) {
                var productInfo = res[0];
                if (err) throw err;
                if (quantity > productInfo.stock) {
                    console.log("\n==================================================================");
                    console.log("Not enough in inventory, please choose a smaller quantity.");
                    console.log("==================================================================\n"); 
                    allProducts()
                    
                }
                
                 else {
                   
                    if (quantity <= productInfo.stock) {
                        console.log("\n==================================================================");
                        console.log("Success, there are " + quantity + " " + productInfo.product + "s in stock!");
                        console.log("==================================================================\n");
                        console.log("=================================================================="); 
                        console.log("Thank you for your order! Processing cost...");
                        console.log("\n");
                    } 
                    if (cost = quantity * productInfo.price) {
                        console.log("The total cost of your order = $" + cost + ".00");
                        console.log("Please pay your invoice as soon as possible.");
                        console.log("==================================================================\n"); 
                    }
                    
            var queryUpdate = "UPDATE products SET ? WHERE ?";
            var newQuantity = productInfo.stock - answer.quantity;
            connection.query(queryUpdate, [{stock: newQuantity},{item: product}], function(err, res) {
                 if (err) throw err;
                 else  {   
                    console.log("==================================================================");  
                    console.log("Inventory items have been updated!");
                    console.log("==================================================================\n"); 
                                   
                  
                   inquirer
                   .prompt({
                    name: 'next',
                    type: "input",
                    message: 'Would you like to place another order (Yes/No)?',
                    })
                  .then(function(answer) {
                      if (answer.next === "Yes") {
                          allProducts();
                      } else {
                        connection.end()
                        console.log("\n==================================================================");
                        console.log("Thank you for shopping with WAMazon! Please come again soon!")
                        console.log("==================================================================\n");
                      }
                    
                  });
                   
                    
                      }
                })
                    }

                
            })
         
        })

        
        }
