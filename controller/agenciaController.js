import path from "path";
const __dirname = import.meta.dirname;
import dotenv from 'dotenv';
dotenv.config();
import { agentes } from "../data/agentes.js";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

export const home = async (req, res) => {
  res.render("home", {
    layout: "main",
  });
};

export const generarToken = (req, res) => {
  try {
    const token = jwt.sign(agentes, secretKey, { expiresIn: "2m" });
    res.send(token).status(200);
  } catch (error) {
    res.status(401).json({ error: "401 Unauthorized", message: error.message });
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const user = agentes.find((agente) => agente.email === email && agente.password === password);
    if (user) {
      const token = jwt.sign(user, secretKey, { expiresIn: "2m" });
      res.send(`
        <script>
          sessionStorage.setItem('token', '${token}');
          setTimeout(() => {
            sessionStorage.removeItem('token');
          }, 120000);
          window.location.href = "/dashboard?token=${token}";
        </script>
        <p>Bienvenido, ${email}.</p>
      `);
    } else {
      res.status(401).send(`<h2>Usuario o contraseña invalido</h2>`);
    }
  } catch (error) {
    res.status(500).json({ error: "500 error interno del servidor", message: error.message });
  }
};

export const verificarAgente = (req, res) => {
  let { token } = req.query;
  try {
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email;
    res.send(`Bienvenido a la plataforma, agente ${email}`);
  } catch (error) {
    res.status(401).json({ error: '401 Unauthorized', message: error.message });
  }
};


