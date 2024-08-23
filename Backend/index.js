const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./router/user.router");
const ecomerceRouter = require("./router/ecomerce.router");
const cartApi = require("./router/cart.router");

const PORT = 3000;



// CORS configuration
app.use(cors({ origin: "http://localhost:5173" }));

// Middleware to parse JSON
app.use(express.json());

// Static file serving for uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/ecomerce", ecomerceRouter);
app.use("/auth", userRouter.router);
app.use("/cart", cartApi);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});