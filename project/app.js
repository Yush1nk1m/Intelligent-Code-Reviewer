const express = require("express");
const path = require("path");

const router = express.Router();

const app = express();
app.set("port", process.env.PORT || 8080);

app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).sendFile("/");
});

app.listen(app.get("port"), () => {
    console.log(`${app.get("port")}번 포트에서 대기 중`);
});