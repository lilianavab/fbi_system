import express from "express";
import exphbs from 'express-handlebars';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from "./routes/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const hbs = exphbs.create({
  defaultLayout: 'main', 
  layoutsDir: path.join(__dirname, 'views', 'layouts')
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, 'views')); 

app.listen(PORT, () => {
  console.log(`El servidor está arriba en el puerto ${PORT}`);
});
