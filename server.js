const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
mongoose.Promise = global.Promise;
mongoose.connection.on("open", () => {
	console.log("Connected to the Students Database");
});

app.use(cors());
app.use(express.json());
app.use("/api", require("./router/api"));
app.use(function (err, req, res, next) {
	res.status(422).send({ error: err.message });
});

app.listen(PORT, () => {
	console.log("[Running]... ", PORT);
});
