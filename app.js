const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/authMiddleware.js");
const billsRouter = require("./models/Bill.js");
const secretKey = 'k:DU9f&dKW8Fka2cT54zvM2L$dR7VJ!';
const mobileProviderRoutes = require("./routes/mobileProviderRoutes.js");
const bankingAppRoutes = require("./routes/bankingAppRoutes.js");
const webSiteRoutes = require("./routes/webSiteRoutes.js");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

app.use(express.json());

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description: 'This is a simple API application made with Express and documented with Swagger',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/bills", mobileProviderRoutes);

app.use("/bank", bankingAppRoutes);

app.use("/auth", authRouter);

app.use("/web", webSiteRoutes);


app.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token provided." });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err)
      return res.status(500).json({ error: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
});

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://oguzhaninstaacc:xc8qYxIEo3Jp4teX@cluster1.fsqhbm7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
    );
    console.log("MongoDB'ye Giriş Yapıldı");
  } catch (error) {
    console.error("MongoDB'ye Giriş Yapılamadı", error);
    throw error;
  }
};

app.listen(PORT, () => {
  connect();
  console.log(`Server started on port ${PORT}`);
});