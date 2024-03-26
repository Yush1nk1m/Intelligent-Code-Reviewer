const express = require("express");
const path = require("path");
const morgan = require('morgan')

const indexRouter = require("./routers/index");
const codeRouter = require("./routers/code");

const app = express();
app.set("port", process.env.PORT || 8080);

app.use("/", express.static(path.join(__dirname, "views")));
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(app.get("port"), () => {
    console.log(`${app.get("port")}번 포트에서 대기 중`);
});