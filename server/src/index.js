require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const RouterRole = require("./router/role");
const RouterAuth = require("./router/auth");
const RouterCard = require("./router/card");
const RouterCategory = require("./router/category");
const RouterOrder = require("./router/OrderDetail.route");
const RouterCountOrMonth = require("./router/reportCountOrderYear.route");
const RouterUnit = require("./router/unit");
const RouterOrigin = require("./router/origin");
const RouterImageProduct = require("./router/ImageProduct");
const RouterManufacturer = require("./router/manufacturer");
const RouterProduct = require("./router/Product");
const RouterNewsCategory = require("./router/newsCategory");
const RouterPayment = require("./router/payment");
const RouterUpload = require("../Middleware/upload");
const Routernews = require("./router/news.route");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/role", RouterRole);
app.use("/api/auth", RouterAuth);
app.use("/api/category", RouterCategory);
app.use("/api/unit", RouterUnit);
app.use("/api/origin", RouterOrigin);
app.use("/api/ImageProduct", RouterImageProduct);
app.use("/api/manufacturer", RouterManufacturer);
app.use("/api/product", RouterProduct);
app.use("/api/upload", RouterUpload);
app.use("/api/newsCategory", RouterNewsCategory);
app.use("/api/card", RouterCard);
app.use("/api/payment", RouterPayment);
app.use("/api/Order", RouterOrder);
app.use("/api/news", Routernews);
app.use("/api/countOrMonth", RouterCountOrMonth);

app.get("/image/:id", (req, res) => {
    res.sendFile(path.join(__dirname, `/public/upload/${req.params.id}`));
});
app.get("/image/procuct/:id", (req, res) => {
    res.sendFile(
        path.join(__dirname, `/public/upload/Product/${req.params.id}`)
    );
});
app.get("/image/news/:id", (req, res) => {
    res.sendFile(path.join(__dirname, `/public/upload/news/${req.params.id}`));
});

app.listen(process.env.PORT, () =>
    console.log("Máy chủ đã chạy tại công 8080")
);
