const express = require("express");

const { insert_Role, find_by_name_row, RoleModel } = require("../models/role");

const Router = express.Router();

const VerifyToken = require("../../Middleware/Auth");

Router.post("/", VerifyToken, async (req, res) => {
    const { nameRole, description } = req.body;

    if (!nameRole || !description) {
        res.status(400).json({
            success: false,
            message: "Vui lòng nhập đầy đủ thông tin",
        });
    } else {
        try {
            const Role = await find_by_name_row("nameRole", nameRole);
            if (Role.length === 0) {
                const newRole = new RoleModel({
                    nameRole,
                    description,
                });
                const result = await insert_Role(newRole);
                if (result) {
                    res.status(200).json({
                        success: true,
                        message: "Thêm Role thành công",
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        message: "Thêm Role không thành công",
                    });
                }
            } else {
                res.status(200).json({
                    success: false,
                    message: "Quyền đã tồn tại",
                });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Xảy ra lỗi cơ sở dữ liệu ${error}`,
            });
        }
    }
});

module.exports = Router;
