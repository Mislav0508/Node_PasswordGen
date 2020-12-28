# Password Generator.

This is a basic showcase of using Nodejs with Express to build a user log in system. 
First I connected my application to MongoDB. Then I created a mongoose Schema to structure the data I would be storing in the DB. In my case it was a user with an email,user name and password.
I set up the routes with the views which were using the EJS format and organized the structure of my folders and files using the MVC approach. 
Further logic had to be applied to set up possible error messages which would be visible to the user.
Using the json web tokens I was able to validate each individual route by sending a cookie
that contained a jwt inside. Using middleware functions that I created, I was able to condition each route.


NPM packages used:

    "bcrypt": "^5.0.0",
    "cookie-parser": "^1.4.5",
    "ejs": "^3.1.5",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.8",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.6",
    "validator": "^13.5.2"
  
Front end: vanilla JS

