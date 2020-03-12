// Requerir express
const express = require("express");
// Express server encabezado de peticiones.(crea la app)
//bodyparser
const bodyParser = require("body-parser");
const app = express();
// Requerir modulo path
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
const hbs = require("hbs");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(myFakeMiddleware);
function myFakeMiddleware(req, _, next){
    console.log("myFakeMiddleware was called!");
    req.secretValue = "swordfish";
    next();
  }
// Ruta home:
//__dirname hace referencia a la ruta principal de proyecto
app.get("/get-user-info", (req, res) => {
  res.render("user-info-form");
});

app.get("/display-user-info", (req, res) => {
  let name = req.query.name;
  let age = req.query.age;
  let superhero = req.query.superhero;

  res.send(`
      Your name is ${name}
      Your age is ${age}
      Your favorite superhero is ${superhero}
    `);
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  res.send(`Email: ${email}, Password: ${password}`);
});

app.get('/test', (req, res) => {
    let mySecret = req.secretValue;
    res.send(mySecret);
  });

// Puerto del servidor  (localhost:3000)
app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
