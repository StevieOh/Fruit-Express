const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const Fruits = require("./models/fruits") 
//intialized fome middleware
//bodyParser allows us to read the contents of a form, 
//or the body of a request
//the app.use sets up what middleware you are using
app.use(bodyParser.urlencoded({extended:false}))

app.use((req, res, next) => {
 console.log("i run on every route");
 //this sends the request to the next piece in the call stack
 //aka the next middleware piece or final route
 next()
});

//creating the index route
//index route should show ALL the fruits
app.get('/fruits', (req, res) => {
 res.send(Fruits)
});

//this is the route that the form is sending its info to
//aka create the route

app.post("/fruits", (req, res) => {
  //the contents of the form will be in req.body
  console.log(req.body, "this is req.body, should be form info")
  // if(req.body.readyToEat === 'on'){
  //   req.body.readyToEat = true;
  // } else {
  //   req.body.readyToEat = false;
  // }
// Fruits.push(req.body);
// console.log(Fruits)

  let ready = false
  if(req.body.readyToEat === 'on'){
    ready = true
  }
  const newFruit = {
    name: req.body.name,
    color: req.body.color,
    readyToEat: ready
  }
  //redirects to /fruits
  Fruits.push(newFruit);
  console.log(Fruits)

  //now we can add the info from the form to our model
  //update our model
  //res.redirect("/fruits");
  res.send("POST worked")
});

app.get("/fruits/new", (req, res) => {
  //this is where we are showing the form
  res.render("new.ejs");
});

//what we're tryig to do
//localhost:3000/fruits/0 --> apple

//we are going to use query paameters to act like a cariable which can be sent over by the client

//The show route --> this route always shows one item from the model
app.get("/fruits/:index", (req, res) => {
  //render is when youw ant to send an ejs template to the client  
  res.render("show.ejs", {
    fruit: Fruits[req.params.index]
  })
})











app.listen(3000, () => {
  console.log("I am listening on port 3000");
})











