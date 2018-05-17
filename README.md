# DailySpecial
## Easily Find Out What's on Special Near You!

### The Sales Pitch
This web application allows a representative of a restaurant to post their regular specials for each day of the week. Want to let potetntial customers know you have the best Taco Tuesday special? Want to boost business on a Monday by letting locals know you have $2 beers? Post your specials here!

Users can enter their city and what day of the week they plan to go out and find what the daily specials near them are ahead of time without having to search each restaurant and clicking through each one. The best specials are now in one place in an easily searchable format.

### Technical Overview
Daily Special is a web application built on the MERN Stack. A Mongo database with two collections are utilized to track restaurant owners accounts and a separate database for their specials. Mongoose is the ORM which sets up the schema. Express and NodeJS handle the server requests which consist of a location either by city, state or zip and a day of the week. Requests are then forwarded to the MongoDB accordingly and returned to REACT to be rendered into the DOM. 

### Author
Kent Prettman 
* [LinkedIn](https://www.linkedin.com/in/kenneth-prettman/)

