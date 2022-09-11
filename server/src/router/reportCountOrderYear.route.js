const express = require("express");

const Router = express.Router();

const { find_count_order_month } = require("../models/reportCountOrderYear");

const verifyToken = require("../../Middleware/Auth");

Router.get("/countMonth", verifyToken, async (req, res) => {
    try {
        const month1 = await find_count_order_month(1);
        const month2 = await find_count_order_month(2);
        const month3 = await find_count_order_month(3);
        const month4 = await find_count_order_month(4);
        const month5 = await find_count_order_month(5);
        const month6 = await find_count_order_month(6);
        const month7 = await find_count_order_month(7);
        const month8 = await find_count_order_month(8);
        const month9 = await find_count_order_month(9);
        const month10 = await find_count_order_month(10);
        const month11 = await find_count_order_month(11);
        const month12 = await find_count_order_month(12);

        const datamonth = [
            month1,
            month2,
            month3,
            month4,
            month5,
            month6,
            month7,
            month8,
            month9,
            month10,
            month11,
            month12,
        ];

        return res.status(200).json({ success: true, datamonth });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

module.exports = Router;
