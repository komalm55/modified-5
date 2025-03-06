const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5002; // Change port to 5002

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
