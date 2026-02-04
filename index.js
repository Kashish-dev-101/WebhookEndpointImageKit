const express = require("express");

const app = express();
const PORT = 8001;

// Middleware to parse JSON data (Content-Type: application/json)
app.use(express.json({ limit: "2mb" }));

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Hello from Webhook Endpoint");
});

// Shared webhook handler
function handleWebhook(req, res) {
  const receivedData = req.body;
  const receivedAt = new Date().toISOString();

  console.log("--- Webhook Received ---");
  console.log("Endpoint:", req.originalUrl);
  console.log("Received at:", receivedAt);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Data:", JSON.stringify(receivedData, null, 2));
  console.log("------------------------");

  res.status(200).json({
    status: "success",
    message: "Webhook received successfully",
    receivedAt: receivedAt,
    endpoint: req.originalUrl,
    data: receivedData,
  });
}

// Webhook endpoints
app.post("/webhook/Videos/ImageKit", handleWebhook);
app.post("/webhook/Pre-Post/ImageKit", handleWebhook);

// Start server
app.listen(PORT, () => {
  console.log(`Webhook server started at http://localhost:${PORT}`);
});
