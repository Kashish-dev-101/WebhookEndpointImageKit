const express = require("express");

const app = express();
const PORT = 8000;

// middle ware to parse JSON data (Content-Type: application/json)
app.use(express.json({ limit: "2mb" }));

// Simple Health check endpoint
app.get("/", (req, res) => {
  res.send("Hello from Webhook Endpoint");
});

// The Webhook endpoint
app.post("/webhook/ImageKit", (req, res) => {
  const receivedData = req.body;
  console.log("Received data:", receivedData);
  const receivedAT = new Date().toISOString();
  console.log("received at:", receivedAT);
  console.log("request headers:", JSON.stringify(req.headers, null, 2));

  res.status(200).json({
    status: "success",
    message: "Webhook received successfully",
    receivedAt: receivedAT,
    data: receivedData,
  });
});

// listen on the specified port
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
