# Node-shoping
my first node project Version 1.0.2

This application is created using Node, nodemon ,express, bcrypt ,bodyParser,MYSQL and json web token

To start the server type "nodemon server" in your terminal 

server.js -> Creates the server by specifying the connection method(http) and specifying a port in which the server would run on the local machine.

app.js -> This is the main server application. Contains the various routes(product, orders, user)
    --> ensure your postman is sending Json and not text.
    --> Note: Json web tokens Last for 1hour.


*************************************************************** USERS ROUTES*****************************************************************************************************
    to SIGNUp : send a post request on postman to this address : http://localhost:3000/users/signup
          with a body {
                        "email": "example@gmail.com", //@ required
                        "password": "password" // @ required
                        }
                        
    to LOGIN : send a post request on postman to this address and save your token : http://localhost:3000/users/signup
          with a body {
                        "email": "example@gmail.com", // @ required
                        "password": "password"// @required
                        } 
               
 ******************************************************************PRODUCT ROUTES **********************************************************************************************
 
 
    to View all product{this simulated Authenticated resource access }: Login first and copy your token
                          then Send a get request on postman to this address : http://localhost:3000/products/
                           {
                              "token": "your token" //@ required
                           }
                           
   to View specific product {this simulated controlled resource access }: Login first and copy your token
                          then Send a get request on postman to this address : http://localhost:3000/products/:id
                           {
                              "token": "your token" //@ requried
                           } 
    
    to add a product  : Login first and save token
                        send a post request on postman to this address : http://localhost:3000/products/
                         with a body {
                                      "name": "example@gmail.com", //@required //Type: String
                                      "price": "price", // @required// Type: Number
                                      "token" : "your token" //@required
                                      }
                                      
     To Update a product(here you can change the product name, price) : Login first and save token
                           send a patch request on postman to this address: http://localhost:3000/products/:id
                           with a body {
                                          "token" : "Your token",//@requried
                                          "update" : [
                                                        {"propName":"name" , "value": "new name"}, //This field is optional
                                                        {"propName":"price", "value": "new price"}// This field is optional
                                                        
                                                      ]
                                          
                                      }
                                      
      To delete a product  : Login first and save token
                        send a delete request on postman to this address : http://localhost:3000/products/id
                        
                                      
    ***************************************************************ORDERS ROUTES***********************************************************************************************
     
 
 
    to View all ORDERS  
                          then Send a get request on postman to this address : http://localhost:3000/orders/
                          {
                            "token" : "YOUR TOKEN"
                          }
                       
                           
   to View specific  ORDER
                          then Send a get request on postman to this address : http://localhost:3000/orders/:id
                           {
                            "token" : "YOUR TOKEN"
                          }
                       
    
    to add an ORDER  :
                        send a post request on postman to this address : http://localhost:3000/orders/
                         with a body {
                                     "product" : "id of the product",
                                     "quantity" : "default = 1" // Type : String,
                                     "token" : "YOUR TOKEN" 
                                      }
                                      
    To delete an ORDER  : Login first and save token
                        send a delete request on postman to this address : http://localhost:3000/orders/id
                        
    To Update an ORDER (here you can change the Quantity of the order) : Login first and save token
                           send a patch request on postman to this address: http://localhost:3000/products/:id
                           with a body {
                                          "token" : "Your token",//@requried
                                          "update" : [
                                                        {"propName":"quantity" , "value": "new quantity"}, //This field is optional
                                                       
                                                      ]
                                          
                                      }
    
                                      
        
