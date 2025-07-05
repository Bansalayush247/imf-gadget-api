require("dotenv").config();
const express = require("express");
const app = express();

const gadgetsRouter = require("./routes/gadgets");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


app.use(express.json());

// Public login route
app.use("/", authRouter);

// Protected routes
app.use("/gadgets", authMiddleware, gadgetsRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
