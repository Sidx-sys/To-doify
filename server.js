const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const path = require("path");

const items = require("./routes/api/items");
const register = require("./routes/api/register");
const login = require("./routes/api/login");

const app = express();
app.use(express.json());
app.use(cors());

const db = config.get("mongoURI");

// connect to mongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

app.use("/api/items", items);
app.use("/api/register", register);
app.use("/api/login", login);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set a static folder
    app.use(express.static("client/build"));
    // app.get("*", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
