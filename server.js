const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: "pg",
    connection: {
        host: "postgresql-angular-02242",
        user: "postgres",
        password: "test",
        database: "smart-brain",
    },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server and app are up and running");
});

app.post("/signin", (req, res) => {
    signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
    profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
    image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
    image.handleApiCall(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});
