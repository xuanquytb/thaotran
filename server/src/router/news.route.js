const express = require("express");

const Router = express.Router();

const jwt = require("jsonwebtoken");

const argon2 = require("argon2");

const {
    find_by_name_row_news,
    find_all_News,
    find_by_Id,
    delete_By_Id,
    InsertNews,
    UpdateNews,
    News,
} = require("../models/news");
const { find_Emp_by_name_row } = require("../models/Employee");

const verifyToken = require("../../Middleware/Auth");

Router.get("/getNews/:id", async (req, res) => {
    try {
        const news = await find_by_name_row_news("id", req.params.id);
        if (!news) {
            return res
                .status(202)
                .json({ success: false, message: "news not found" });
        } else {
            return res.status(200).json({ success: true, news });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.delete("/:id", verifyToken, async (req, res) => {
    const result = await find_Emp_by_name_row("id", req.userId);
    if (result) {
        try {
            if (req.role.nameRole === "Administrators") {
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
                    message: "Tài khoản không được cấp phép",
                });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Server Error" });
        }
    } else {
        return res.status(405).json({
            success: false,
            message: "Tài khoản không tồn tại",
        });
    }
});

Router.get("/allNews", async (req, res) => {
    const result = await find_Emp_by_name_row("id", req.userId);
    console.log(result);
    if (result) {
        try {
            const news = await find_all_News();
            if (!news) {
                return res
                    .status(202)
                    .json({ success: false, message: "User not found" });
            } else {
                return res.status(200).json({ success: true, news });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Server Error" });
        }
    } else {
        return res.status(405).json({
            success: false,
            message: "Tài khoản không tồn tại",
        });
    }
});

Router.get("/findNews/:id", async (req, res) => {
    try {
        const news = await find_by_Id(req.params.id);
        if (!news) {
            return res
                .status(202)
                .json({ success: false, message: "News not found" });
        } else {
            return res.status(200).json({ success: true, news });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.post("/addNews", verifyToken, async (req, res) => {
    if (req.role.id === 1 || req.role.id === 3) {
        const {
            nameNews,
            brief,
            content,
            nameImage,
            author,
            state,
            idNewsCategory,
            idUser,
        } = req.body;

        if (
            !nameNews ||
            !brief ||
            !content ||
            !nameImage ||
            !author ||
            !state ||
            !idNewsCategory ||
            !idUser
        ) {
            res.status(400).json({
                success: true,
                message: "Nhập thiếu thông tin",
            });
        } else {
            const nameNewsResult = await find_by_name_row_news(
                "nameNews",
                nameNews
            );

            if (nameNewsResult.length > 0) {
                res.status(400).json({
                    success: false,
                    message: "Tin tức đã tồn tại",
                });
            } else {
                try {
                    const newNewsItem = {
                        nameNews,
                        brief,
                        content,
                        nameImage,
                        author,
                        state,
                        idNewsCategory,
                        idUser,
                    };
                    const newNewsRe = await InsertNews(newNewsItem);
                    if (newNewsRe) {
                        res.status(200).json({
                            success: true,
                            message: "Thêm thành công",
                            nameNews: nameNews,
                        });
                    } else {
                        res.status(400).json({
                            success: false,
                            message: "Thêm thất bại",
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
    } else {
        return res.status(405).json({
            success: false,
            message: "Tài khoản không được cấp phép",
        });
    }
});

Router.put("/updateNews/:id", verifyToken, async (req, res) => {
    if (req.role.id === 1 || req.role.id === 3) {
        const { brief, content, id, nameNews, state, title } = req.body;
        if (!brief || !content || !id || !nameNews || !state || !title) {
            res.status(400).json({
                success: true,
                message: "Nhập thiếu thông tin",
            });
        } else {
            const nameNewsRe = await find_by_name_row_news(
                "nameNews",
                req.params.id
            );
            if (nameNewsRe.length > 0) {
                res.status(400).json({
                    success: false,
                    message: "Tin tức đã tồn tại",
                });
            } else {
                try {
                    const newNewsItem = {
                        brief,
                        content,
                        id,
                        nameNews,
                        state,
                        title,
                    };
                    const newNewsRe = await UpdateNews(
                        newNewsItem,
                        req.params.id
                    );
                    if (newNewsRe) {
                        res.status(200).json({
                            success: true,
                            message: "Cập nhật thành công",
                            nameNews: nameNews,
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
    } else {
        return res.status(405).json({
            success: false,
            message: "Tài khoản không được cấp phép",
        });
    }
});

module.exports = Router;
