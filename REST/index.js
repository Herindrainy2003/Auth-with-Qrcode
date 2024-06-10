const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const Routes = require("./Routes/Routes");
 const cors = require("cors");
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/qrcode")
  .then(() => console.log("Connecter"))
  .catch((e) => console.log("erreur de connexion" + e));

app.use("/api/", Routes);



app.listen(8000, () => {
  console.log("Serveur lance sur le port", PORT);
});
