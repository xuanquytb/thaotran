//hàm xử lý dữ liệu api lấy từ cơ sở dữ liệu
const express = require("express");

const Router = express.Router();
const {
    UpdateCardDetail,
    InsertCard,
    UpdateCard,
    find_by_name_row_card,
    delete_By_Id,
    find_by_idCard_and_IdCus,
    InsertCardDetail,
    find_card_by_userid,
    delete_Card_Detail_By_Id,
    find_card_Detail_by_Id,
    check_card_Detail_by_Id,
    cal_sum_order_by_id_card,
    GetCard_byUserId,
    find_cardDetail_showOrder,
    Card,
} = require("../models/card");

const { find_by_name_row } = require("../models/user");

const { find_by_id_role, find_by_name_row_role } = require("../models/role");

const verifyToken = require("../../Middleware/Auth");

Router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await find_by_name_row_card("id", req.userId);
        if (!user) {
            return res
                .status(202)
                .json({ success: false, message: "User not found" });
        } else {
            return res
                .status(200)
                .json({ success: true, user, role: req.role });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.get("/get", verifyToken, async (req, res) => {
    try {
        const user = await find_cardDetail_showOrder("id", req.userId);
        if (!user) {
            return res
                .status(202)
                .json({ success: false, message: "User not found" });
        } else {
            return res
                .status(200)
                .json({ success: true, user, role: req.role });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.delete("/:id", verifyToken, async (req, res) => {
    const result = await find_by_idCard_and_IdCus(req.userId, req.params.id);

    try {
        if (result) {
            const result = await delete_By_Id(req.params.id);
            if (result != 1) {
                return res
                    .status(202)
                    .json({ success: false, message: "Xóa thất bại" });
            } else {
                return res
                    .status(200)
                    .json({ success: true, message: "Xóa thành công" });
            }
        } else {
            return res.status(405).json({
                success: false,
                message: "Lỗi cơ sở dữ liệu",
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.delete("/cardDetail/:id", verifyToken, async (req, res) => {
    try {
        const result = await find_card_Detail_by_Id(req.params.id);
        if (result.userid === req.userId) {
            const result = await delete_Card_Detail_By_Id(req.params.id);
            if (result != 1) {
                return res
                    .status(202)
                    .json({ success: false, message: "Xóa thất bại" });
            } else {
                return res
                    .status(200)
                    .json({ success: true, message: "Xóa thành công" });
            }
        } else {
            return res.status(405).json({
                success: false,
                message: "Tài khoản không được cấp phép",
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.get("/allCard", verifyToken, async (req, res) => {
    try {
        const card = await find_card_by_userid(req.userId);
        if (card.length <= 0) {
            return res
                .status(202)
                .json({ success: true, message: "Giỏ hàng trống", card });
        } else {
            return res.status(200).json({ success: true, card });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});
Router.post("/allItemCardOrder", verifyToken, async (req, res) => {
    const { idCard, idPayOrder } = req.body;
    try {
        const orderPayment = await find_cardDetail_showOrder(
            idCard,
            idPayOrder
        );
        if (orderPayment.length <= 0) {
            return res.status(202).json({
                success: true,
                message: "Đơn hàng không có sản phẩm",
                orderPayment,
            });
        } else {
            return res.status(200).json({ success: true, orderPayment });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});
Router.get("/sumMoneycard", verifyToken, async (req, res) => {
    try {
        const card = await GetCard_byUserId(req.userId);
        if (card) {
            const reslut = await cal_sum_order_by_id_card(card.id);

            return res
                .status(200)
                .json({ success: true, sum: reslut.tongthanhtoan });
        } else {
            return res
                .status(200)
                .json({ success: true, message: "Giỏ hàng không tồn tại" });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.post("/addCard", async (req, res) => {
    const { idCustomer, idMGG, stateCard } = req.body;

    if (!idCustomer || !idMGG || !stateCard) {
        res.status(400).json({
            success: true,
            message: "Nhập thiếu thông tin",
        });
    } else {
        const user = await find_by_name_row("id", idCustomer);
        if (user.length <= 0) {
            res.status(400).json({
                success: false,
                message: "Tài khoản không tồn tại",
            });
        } else {
            const newCard = new Card({
                idCustomer,
                idMGG,
                stateCard,
            });
            try {
                const result = await InsertCard(newCard);

                if (result) {
                    const cardNew = await find_by_name_row_card(
                        "idCustomer",
                        idCustomer
                    );
                    res.status(200).json({
                        success: true,
                        message: "Thêm sản phẩm thành công",
                        card: cardNew,
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Thêm sản phẩm thất bại",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: "Xảy ra lỗi : " + error,
                });
            }
        }
    }
});
Router.put("/update", verifyToken, async (req, res) => {
    const { idMGG } = req.body;
    if (!idMGG) {
        res.status(400).json({
            success: true,
            message: "Mã giảm giá không tồn tại",
        });
    } else {
        const user = await find_by_name_row("id", req.userId);
        if (user.length <= 0) {
            res.status(400).json({
                success: false,
                message: "Tài khoản không tồn tại",
            });
        } else {
            const updateCard = new Card({
                idMGG,
            });
            try {
                const result = await UpdateCard(updateCard, req.userId);
                if (result) {
                    const cardUpdate = await find_by_name_row_card(
                        "idCustomer",
                        req.userId
                    );
                    res.status(200).json({
                        success: true,
                        message: "Cập nhật thành công",
                        card: cardUpdate,
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Cập nhật thất bại",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: "Xảy ra lỗi : " + error,
                });
            }
        }
    }
});

Router.put("/updateCardDetail", verifyToken, async (req, res) => {
    const { quantity, dongia, id } = req.body;
    if (!quantity || !id) {
        res.status(400).json({
            success: true,
            message: "Thiếu thông tin",
        });
    } else {
        const user = await find_by_name_row("id", req.userId);
        if (user.length <= 0) {
            res.status(400).json({
                success: false,
                message: "Tài khoản không tồn tại",
            });
        } else {
            try {
                const result = await UpdateCardDetail(quantity, dongia, id);
                if (result) {
                    res.status(200).json({
                        success: true,
                        message: "Cập nhật thành công",
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Cập nhật thất bại",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: "Xảy ra lỗi : " + error,
                });
            }
        }
    }
});

Router.post("/addCardItem", verifyToken, async (req, res) => {
    const { idCard, idProduct, dongia, quantity } = req.body;

    const check = await check_card_Detail_by_Id(idCard, idProduct);
    if (check) {
        let quantityIncre = check.quantity + 1;
        const resultUpdate = await UpdateCardDetail(
            quantityIncre,
            dongia * quantityIncre,
            check.id
        );
        if (resultUpdate) {
            console.log(dongia * quantityIncre);
            res.status(200).json({
                success: true,
                message: "Cập nhật số lượng thành công",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Cập nhật số lượng thất bại",
            });
        }
    } else {
        const card = await find_by_name_row_card("id", idCard);
        if (card.length <= 0) {
            res.status(400).json({
                success: false,
                message: "Giỏ hàng không tồn tại",
            });
        } else {
            const newCard = {
                idCard,
                idProduct,
                dongia,
                quantity,
                sumMoney: dongia * quantity,
            };

            try {
                const result = await InsertCardDetail(newCard);

                if (result) {
                    const cardNew = await find_card_by_userid(req.userId);
                    res.status(200).json({
                        success: true,
                        message: "Thêm vào giỏ hàng thành công",
                        card: cardNew,
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Thêm vào giỏ hàng thất bại",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: "Xảy ra lỗi : " + error,
                });
            }
        }
    }
});

module.exports = Router;
