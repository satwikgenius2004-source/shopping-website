const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Public folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes

app.get("/", (req, res) => {
    res.render("shop");
});

app.get("/shop", (req, res) => {
    res.render("shop");
});

app.get("/product", (req, res) => {
    res.render("product");
});

app.get("/cart", (req, res) => {
    res.render("cart");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});